import os
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse, Response
from starlette.staticfiles import StaticFiles
from .routers import admins, agents, numbers, settings

app = FastAPI(title="MLG Admin API (Single Service)")
app.include_router(admins.router, prefix="/api")
app.include_router(agents.router, prefix="/api")
app.include_router(numbers.router, prefix="/api")
app.include_router(settings.router, prefix="/api")

DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
ASSETS_DIR = os.path.join(DIST_DIR, "assets")
INDEX_FILE = os.path.join(DIST_DIR, "index.html")

if os.path.isdir(ASSETS_DIR):
    app.mount("/assets", StaticFiles(directory=ASSETS_DIR), name="assets")

@app.middleware("http")
async def add_cache_headers(request: Request, call_next):
    response: Response = await call_next(request)
    p = request.url.path
    if p.startswith("/assets/"):
        response.headers["Cache-Control"] = "public, max-age=2592000, immutable"
    elif p == "/":
        response.headers["Cache-Control"] = "no-cache"
    return response

@app.get("/")
def serve_root():
    if not os.path.exists(INDEX_FILE):
        return Response("Frontend not built yet. Run: cd app/frontend && npm i && npm run build", media_type="text/plain")
    return FileResponse(INDEX_FILE)

@app.get("/{full_path:path}")
def spa_fallback(full_path: str):
    if full_path.startswith("api/"):
        return Response(status_code=404)
    if not os.path.exists(INDEX_FILE):
        return Response("Frontend not built yet. Run: cd app/frontend && npm i && npm run build", media_type="text/plain")
    return FileResponse(INDEX_FILE)
