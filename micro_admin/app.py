import os
from dataclasses import dataclass
from typing import List, Dict
from flask import (
    Flask, render_template, request, redirect, url_for,
    session, flash, jsonify
)
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change-me")

# --- Demo users (replace with DB later) -------------------------------------
# store hashed passwords for demo
USERS: Dict[str, dict] = {
    "admin@sipcha.io": {
        "name": "Sipcha Admin",
        "password_hash": generate_password_hash(os.getenv("DEMO_PASSWORD", "admin123")),
        "role": "superadmin",
        "avatar": "SA"
    }
}

def current_user():
    email = session.get("user")
    return USERS.get(email)

def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("user"):
            return redirect(url_for("login", next=request.path))
        return view(*args, **kwargs)
    return wrapped

# ---- Domain (replace with DB later) ---------------------------------------
@dataclass
class Admin:
    id: int
    email: str
    name: str
    active: bool = True

ADMINS: List[Admin] = [
    Admin(1, "alice@example.com", "Alice"),
    Admin(2, "bob@example.com", "Bob", active=False),
]

def _next_id(seq):
    return (max(x.id for x in seq) + 1) if seq else 1

# ---- Health ---------------------------------------------------------------
@app.get("/healthz")
def healthz():
    return {"status": "ok"}

# ---- Auth -----------------------------------------------------------------
@app.get("/login")
def login():
    if session.get("user"):
        return redirect(url_for("dashboard"))
    return render_template("auth/login.html", title="Sign in")

@app.post("/login")
def login_post():
    email = (request.form.get("email") or "").strip().lower()
    password = (request.form.get("password") or "").strip()
    user = USERS.get(email)
    if not user or not check_password_hash(user["password_hash"], password):
        flash("Invalid email or password.", "error")
        return render_template("auth/login.html", title="Sign in", email=email), 401
    session["user"] = email
    flash("Welcome back!", "success")
    return redirect(request.args.get("next") or url_for("dashboard"))

@app.post("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

# ---- Pages ----------------------------------------------------------------
@app.get("/")
@login_required
def dashboard():
    return render_template("dashboard/index.html", title="Dashboard", user=current_user())

@app.get("/admins/")
@login_required
def admins_index():
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/index.html", data=data, q=q, title="Admins", user=current_user())

@app.post("/admins/create")
@login_required
def admins_create():
    name = (request.form.get("name") or "").strip()
    email = (request.form.get("email") or "").strip()
    if name and email:
        ADMINS.append(Admin(_next_id(ADMINS), email=email, name=name, active=True))
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/_table.html", data=data)

@app.post("/admins/<int:admin_id>/toggle")
@login_required
def admins_toggle(admin_id):
    for a in ADMINS:
        if a.id == admin_id:
            a.active = not a.active
            break
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/_table.html", data=data)

@app.post("/admins/<int:admin_id>/delete")
@login_required
def admins_delete(admin_id):
    global ADMINS
    ADMINS = [a for a in ADMINS if a.id != admin_id]
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/_table.html", data=data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
