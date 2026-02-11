from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # <--- Import this
from backend.app.database import Base, engine
from backend.app.routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- ADD THIS BLOCK ---
# This is the "VIP List". We allow everyone ("*") for now to make it easy.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (POST, GET, etc.)
    allow_headers=["*"],  # Allows all headers
)
# ----------------------

app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def home():
    return {"message": "Welcome to Trading Journal API"}
