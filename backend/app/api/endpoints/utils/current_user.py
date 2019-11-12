from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.models import User
from app.config import Config
from app import crud
from . import access_token
from .db import get_db

def current_user(
        db_session: Session = Depends(get_db),
        token: str = Depends(OAuth2PasswordBearer(tokenUrl="/auth/token"))
    ):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
    )
    try:
        user_id = access_token.decode(token)
        if user_id is None:
            raise credentials_exception
        user = crud.user.get_by_id(db_session, id=user_id)
        if user is None:
            raise credentials_exception
        return user
    except:
        raise credentials_exception

def current_active_user(current_user: User = Depends(current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

