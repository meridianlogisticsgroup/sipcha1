from typing import Dict, Any, Optional
from twilio.base.page import Page
from .deps import sync_service

class SyncMapRepo:
    def __init__(self, map_name: str):
        self.map = sync_service.sync_maps(map_name)

    def list(self, page_token: Optional[str] = None, page_size: int = 50):
        page: Page = self.map.sync_map_items.page(page_size=page_size, page_token=page_token)
        items = [ {"id": i.key, **(i.data or {})} for i in page ]
        next_token = None
        if getattr(page, "next_page_url", None):
            parts = page.next_page_url.split("PageToken=")
            if len(parts) > 1:
                next_token = parts[-1]
        return {"items": items, "nextPageToken": next_token}

    def get(self, key: str):
        i = self.map.sync_map_items(key).fetch()
        return {"id": i.key, **(i.data or {})}

    def upsert(self, key: str, data: Dict[str, Any]):
        try:
            self.map.sync_map_items(key).update(data=data)
        except Exception:
            self.map.sync_map_items.create(key=key, data=data)
        return self.get(key)

    def delete(self, key: str):
        self.map.sync_map_items(key).delete()
        return {"id": key, "deleted": True}
