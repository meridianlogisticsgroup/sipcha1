# Single-service Admin (FastAPI + Refine + Ant Design)

**One container**: FastAPI serves the built SPA and `/api/*`.

## Dev
```bash
# Backend (dev)
uvicorn app.backend.main:app --reload --port 8000

# Frontend (dev)
cd app/frontend
npm i
echo "VITE_API_BASE=http://localhost:8000/api" > .env
npm run dev
```

## Docker (Dokploy/Traefik-friendly)
```bash
cp .env.example .env  # fill TWILIO_* values
docker compose up --build -d
# container listens on 8080; Traefik routes externally
```
