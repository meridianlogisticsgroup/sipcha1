from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from ..sync_repo import SyncMapRepo

router = APIRouter(prefix="/numbers", tags=["numbers"])
repo = SyncMapRepo("numbers")

@router.get("")
def list_items(limit: int = 50, cursor: Optional[str] = Query(None)):
    page = repo.list(page_token=cursor, page_size=limit)
    return {
        "items": page["items"],
        "total": None,
        "pageInfo": {"nextCursor": page["nextPageToken"]},
    }

@router.get("/{item_id}")
def get_item(item_id: str):
    try:
        return repo.get(item_id)
    except Exception:
        raise HTTPException(status_code=404, detail="Not found")

@router.post("")
def create_item(payload: dict):
    key = payload.get("id") or payload.get("email") or payload.get("name")
    if not key:
        raise HTTPException(status_code=400, detail="Missing 'id'/'email'/'name' for key")
    return repo.upsert(key, payload)

@router.patch("/{item_id}")
def update_item(item_id: str, payload: dict):
    return repo.upsert(item_id, payload)

@router.delete("/{item_id}")
def delete_item(item_id: str):
    return repo.delete(item_id)
