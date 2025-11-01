from pydantic_settings import BaseSettings
from twilio.rest import Client

class Settings(BaseSettings):
    TWILIO_ACCOUNT_SID: str
    TWILIO_AUTH_TOKEN: str
    TWILIO_SYNC_SERVICE_SID: str
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
sync_service = twilio_client.sync.v1.services(settings.TWILIO_SYNC_SERVICE_SID)
