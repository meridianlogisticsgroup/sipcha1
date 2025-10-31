from flask import Flask, render_template, request
from dataclasses import dataclass
from typing import List

app = Flask(__name__)

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

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.get("/")
def dashboard():
    return render_template("dashboard/index.html", title="Dashboard")

@app.get("/admins/")
def admins_index():
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/index.html", data=data, q=q, title="Admins")

@app.post("/admins/create")
def admins_create():
    name = (request.form.get("name") or "").strip()
    email = (request.form.get("email") or "").strip()
    if name and email:
        ADMINS.append(Admin(_next_id(ADMINS), email=email, name=name, active=True))
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/_table.html", data=data)

@app.post("/admins/<int:admin_id>/toggle")
def admins_toggle(admin_id):
    for a in ADMINS:
        if a.id == admin_id:
            a.active = not a.active
            break
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/_table.html", data=data)

@app.post("/admins/<int:admin_id>/delete")
def admins_delete(admin_id):
    global ADMINS
    ADMINS = [a for a in ADMINS if a.id != admin_id]
    q = (request.args.get("q") or "").strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template("admins/_table.html", data=data)

if __name__ == "__main__":
    # For local debugging only
    app.run(host="0.0.0.0", port=8000, debug=True)
