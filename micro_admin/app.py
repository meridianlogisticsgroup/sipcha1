import os
from dataclasses import dataclass
from typing import List, Dict
from flask import Flask, render_template, request, redirect, url_for, session, flash, make_response
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'change-me')

USERS: Dict[str, dict] = {
    'admin@sipcha.io': {
        'name': 'Sipcha Admin',
        'password_hash': generate_password_hash(os.getenv('DEMO_PASSWORD', 'admin123')),
        'role': 'superadmin',
        'avatar': 'SA'
    }
}

def is_htmx():
    return request.headers.get('HX-Request') == 'true'

def hx_redirect(to):
    r = make_response(('', 204))
    r.headers['HX-Redirect'] = to
    return r

def current_user():
    email = session.get('user')
    return USERS.get(email)

def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('user'):
            dest = url_for('login', next=request.path)
            if is_htmx():
                res = make_response(('', 401))
                res.headers['HX-Redirect'] = dest
                return res
            return redirect(dest)
        return view(*args, **kwargs)
    return wrapped

@dataclass
class Admin:
    id: int
    email: str
    name: str
    active: bool = True
    status: str = 'Ready'  # Ready, On the way, Delivered, Cancelled

ADMINS: List[Admin] = [
    Admin(1, '200913@example.com', 'Order 200913', True, 'Cancelled'),
    Admin(2, '977771@example.com', 'Order 977771', True, 'On the way'),
    Admin(3, '227579@example.com', 'Order 227579', False, 'Cancelled'),
    Admin(4, '708225@example.com', 'Order 708225', True, 'Delivered'),
    Admin(5, '476983@example.com', 'Order 476983', True, 'Ready'),
]

def _next_id(seq):
    return (max(x.id for x in seq) + 1) if seq else 1

@app.get('/healthz')
def healthz():
    return {'status': 'ok'}

@app.get('/login')
def login():
    if session.get('user'):
        return redirect(url_for('dashboard'))
    return render_template('auth/login.html', title='Sign in')

@app.post('/login')
def login_post():
    email = (request.form.get('email') or '').strip().lower()
    password = (request.form.get('password') or '').strip()
    user = USERS.get(email)
    if not user or not check_password_hash(user['password_hash'], password):
        flash('Invalid email or password.', 'error')
        return render_template('auth/login.html', title='Sign in', email=email), 401
    session['user'] = email
    flash('Welcome back!', 'success')
    dest = request.args.get('next') or url_for('dashboard')
    if is_htmx(): return hx_redirect(dest)
    return redirect(dest)

@app.post('/logout')
def logout():
    session.clear()
    if is_htmx(): return hx_redirect(url_for('login'))
    return redirect(url_for('login'))

def render_page(content_template, **ctx):
    ctx.setdefault('user', current_user())
    if is_htmx():
        return render_template(content_template, **ctx)
    return render_template('_frame.html', content_template=content_template, **ctx)

@app.get('/')
@login_required
def dashboard():
    return render_page('dashboard/_page.html', title='Dashboard')

@app.get('/admins/')
@login_required
def admins_index():
    q = (request.args.get('q') or '').strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_page('admins/_page.html', data=data, q=q, title='Posts')

@app.post('/admins/<int:admin_id>/toggle')
@login_required
def admins_toggle(admin_id):
    for a in ADMINS:
        if a.id == admin_id:
            a.active = not a.active
            a.status = 'Ready' if a.active else 'Cancelled'
            break
    q = (request.args.get('q') or '').strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template('admins/_table.html', data=data)

@app.post('/admins/<int:admin_id>/delete')
@login_required
def admins_delete(admin_id):
    global ADMINS
    ADMINS = [a for a in ADMINS if a.id != admin_id]
    q = (request.args.get('q') or '').strip().lower()
    data = [a for a in ADMINS if q in a.email.lower() or q in a.name.lower()] if q else ADMINS
    return render_template('admins/_table.html', data=data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
