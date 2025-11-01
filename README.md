# SIPCHA Admin — FastAPI + Refine + Ant Design (Modern Theme)

Single container: FastAPI serves `/api/*` and the built SPA (Vite).
Ant Design v5 with modern tokens (Inter font, rounded radius, larger sider icons).

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
# Fill TWILIO_* and leave PORT=8080
docker compose up --build -d
```
