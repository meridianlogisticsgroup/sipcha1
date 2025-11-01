# SIPCHA Admin — Branded (Logo + Green Theme), Dark Default, Auto Twilio Sync

- Single container (FastAPI serves API + built SPA)
- **Dark theme by default**, matching sipcha.io green palette
- **Light theme** available via toggle
- **Auto Twilio Sync Service** by friendly name (hardcoded), plus auto-create maps
- **JSON-safe errors** + `/api/_health`

## Configure
Create `.env`:
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
