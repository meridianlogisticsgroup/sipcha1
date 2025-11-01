from pydantic_settings import BaseSettings
from twilio.rest import Client

# Hardcoded Sync Service friendly name (edit intentionally for prod)
SYNC_SERVICE_FRIENDLY_NAME = "sipcha-admin-sync"

class Settings(BaseSettings):
    TWILIO_ACCOUNT_SID: str
    TWILIO_AUTH_TOKEN: str
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

def get_or_create_sync_service(client: Client, friendly_name: str):
    # List & match by friendly_name; if not found, create.
    for svc in client.sync.v1.services.list(limit=50):
        if getattr(svc, "friendly_name", None) == friendly_name:
            return client.sync.v1.services(svc.sid)
    created = client.sync.v1.services.create(friendly_name=friendly_name)
    return client.sync.v1.services(created.sid)

sync_service = get_or_create_sync_service(twilio_client, SYNC_SERVICE_FRIENDLY_NAME)
