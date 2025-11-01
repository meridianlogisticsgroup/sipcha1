# SIPCHA Admin — Modern Theme (FastAPI + Refine + Ant Design)

- Single service: FastAPI serves `/api/*` and the built SPA
- Refine + Ant Design with modern tokens (Inter font, larger icons, smooth radius)

## Dev
```bash
uvicorn app.backend.main:app --reload --port 8000

cd app/frontend
npm i
echo "VITE_API_BASE=http://localhost:8000/api" > .env
npm run dev
```

## Docker
```bash
cp .env.example .env
docker compose up --build -d
```

## Environment
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SYNC_SERVICE_SID`
- `PORT=8080` (container)
