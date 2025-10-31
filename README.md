# Sipcha Admin — No‑build Design System

This adds a **mini design system** on top of Tabler via a single `static/ui.css` and a set of Jinja macros in `templates/_components.html` so every page looks consistent.

## Run
```bash
docker compose up --build
# http://localhost:8000
# login: admin@sipcha.io / admin123
```

## What’s included
- **Design tokens** (`:root` CSS variables) + dark theme overrides
- **Unified components**: buttons, inputs, selects, textarea, switches, chips, badges, toolbar, card, table (w/ empty state), modals, tabs, pagination, alert, toast
- **Jinja macros** so templates are uniform
- **Examples** wired into Admins + Dashboard
