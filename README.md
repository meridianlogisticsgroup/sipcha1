# Sipcha Admin — Sleek UI + Login (Docker/Dokploy)

### Local
```bash
docker compose up --build
# http://localhost:8000
# Login: admin@sipcha.io / admin123  (or set DEMO_PASSWORD)
```

### Dokploy
- Service: `web` (port 8000)
- Health: `GET /healthz`
- Set env vars in Dokploy UI:
  - `SECRET_KEY` (required)
  - `DEMO_PASSWORD` (optional; default `admin123`)

### Notes
- No-build frontend, Tabler UI, glassmorphism, dark mode.
- Minimal auth demo using Flask session + hashed password.
- Replace the in-memory data with Postgres/Redis when ready.
