# Sipcha Admin (Docker-ready, no-build frontend)

## Run locally
```bash
docker compose up --build
# open http://localhost:8000
# login with: admin@sipcha.io / admin123  (override with DEMO_PASSWORD env)
```

## Dokploy
- App service: `web` (port 8000)
- Healthcheck: `GET /healthz`
- Set environment vars in Dokploy UI:
  - `SECRET_KEY` (required)
  - `DEMO_PASSWORD` (optional)
  - `FLASK_ENV=production`
- If fronted by Traefik, add router/service labels (see `docker-compose.yml` comments).

## Stack
- Flask + HTMX + Alpine + Hyperscript
- Tabler (CDN) for admin UI
- Gunicorn (gthread) in Python 3.12-slim
