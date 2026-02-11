from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    BREVO_API_KEY: str
    SENDER_EMAIL: str

    class Config:
        env_file = "backend/.env"

settings = Settings()
