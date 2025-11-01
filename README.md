# SIPCHA Admin — Branded + HashRouter (SPA), Dark Default, Auto Twilio Sync

- React + Refine + Ant Design
- **HashRouter** (URLs like `/#/admins`) to guarantee SPA navigation without server rewrites
- Dark theme by default with sipcha green, light toggle included
- FastAPI serves `/api/*` + built SPA
- Twilio Sync **auto get-or-create** by hardcoded friendly name
- JSON-safe API errors + `/api/_health`

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

## Replace the logo
Swap in your logo file at:
```
app/frontend/src/assets/sipcha-logo-text-right.webp
```
(or update the import path in `LogoTitle.jsx`). Replace `app/frontend/public/brand-favicon.png` for the favicon.
