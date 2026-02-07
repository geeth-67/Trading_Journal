from passlib.context import CryptContext


# Start the "Scrambler" using bcrypt (a strong hashing algorithm)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # Turns "secret123" into "$2b$12$..."
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Checks if "secret123" matches the scrambled version
    return pwd_context.verify(plain_password, hashed_password)
