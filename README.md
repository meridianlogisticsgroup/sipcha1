# Single-service Admin (FastAPI + Refine + Ant Design)

FastAPI serves:
- `/api/*` — your REST API (Twilio Sync repo in `sync_repo.py`)
- `/` and static assets — the built SPA from `app/frontend/dist`

## Dev
```bash
# Terminal 1: FastAPI
uvicorn app.backend.main:app --reload --port 8000

# Terminal 2: Frontend (Vite dev server)
cd app/frontend
npm i
npm run dev
# Visit http://localhost:5173
```

Set `VITE_API_BASE="http://localhost:8000/api"` in `.env` for dev.

## Build frontend for prod & run FastAPI locally
```bash
cd app/frontend && npm i && npm run build
cd ../../
uvicorn app.backend.main:app --port 8000
# Visit http://localhost:8000
```

## Docker
```bash
cp .env.example .env  # fill values
docker compose up --build -d
# Visit http://localhost:8080
```
