# SIPCHA Admin — FastAPI + Refine + Ant Design (Dark Default, Auto Twilio Sync)

- Single container: FastAPI serves `/api/*` and the built SPA.
- **Dark theme by default** with Ant Design v5 tokens.
- **No TWILIO_SYNC_SERVICE_SID env var.** Backend will **get-or-create** a Twilio Sync Service by a **hardcoded friendly name**.

## Configure
Create `.env` with:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=8080
```

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
