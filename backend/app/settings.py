import os
from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    LOG_LEVEL: str
    DEBUG: bool

    class Config:
        env = os.environ.get("APP_CONFIG_FILE", "dev")
        env_file = Path(__file__).parent / f"config/{env}.env"
        case_sensitive = True
