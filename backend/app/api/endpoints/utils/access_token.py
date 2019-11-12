import jwt
from datetime import datetime, timedelta
from app.config import Config


def encode(user_id: int):
    expires_delta = timedelta(minutes=Config.Auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": user_id}
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, Config.Auth.SECRET_KEY, algorithm=Config.Auth.ALGORITHM)
    return encoded_jwt

def decode(token):
    payload = jwt.decode(token, Config.Auth.SECRET_KEY, algorithms=[Config.Auth.ALGORITHM])
    return payload.get("sub")