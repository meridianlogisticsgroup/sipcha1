# ---- Frontend build ----
FROM node:20-alpine AS frontend
WORKDIR /frontend
COPY app/frontend/package.json app/frontend/package-lock.json* ./
RUN npm i --no-audit --no-fund
COPY app/frontend ./
RUN npm run build

# ---- Backend image ----
FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends     ca-certificates curl     && rm -rf /var/lib/apt/lists/*

COPY app/backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY app/backend ./app/backend
COPY --from=frontend /frontend/dist ./app/frontend/dist

ENV PORT=8080
EXPOSE 8080
CMD ["uvicorn", "app.backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
