# Micro Admin — Docker + Compose (Dokploy-friendly)

## Quick start (local)
```bash
docker compose up --build
# open http://localhost:8000
```

## Dokploy notes
- Point your Dokploy app to this repo folder.
- Use the **web** service as your main app.
- If using Traefik via Dokploy, add router/service labels in the UI or uncomment labels in `docker-compose.yml`.
- Health check: `/healthz`.

## Image details
- Python 3.12 slim
- Gunicorn (gthread) with sensible defaults in `gunicorn.conf.py`
- Non-root user
- Exposes port 8000

## Environment
Copy `.env.example` to `.env` under `micro_admin/` and adjust as needed.
