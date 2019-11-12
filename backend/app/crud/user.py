from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db.models import User
from . import user as user_crud


def create(
    db_session: Session,
    *,
    username: str,
    email: str,
    password: str,
    is_superuser: bool = False,
    is_active: bool = False
):
    user = User(
        username=username,
        email=email,
        password=password,
        is_superuser=is_superuser,
        is_active=is_active
    )

    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

def get_by_username(db_session: Session, *, username: str):
    return db_session.query(User).filter(User.username == username).first()


def get_by_email(db_session: Session, *, email: str):
    return db_session.query(User).filter(User.email == email).first()


def get_by_id(db_session: Session, *, id: int):
    return db_session.query(User).filter(User.id == id).first()

def get_by_ids(db_session: Session, *, users_ids: List[int]):
    users = []
    for user_id in users_ids:
        user = get_by_id(db_session, id=user_id)
        if not user:
            raise HTTPException(
                status_code=400,
                detail='User with id %i doesn\'t exist' % user_id,
            )
        users.append(user)
    return users


def get_active(db_session: Session):
    users = db_session.query(User).all()
    pretty_users = []
    for user in users:
        if user.is_active:
            pretty_users.append({
                'id': user.id,
                'name': user.username,
                'email': user.email
            })
    return pretty_users



def activate(db_session: Session, *, user: User):
    user.is_active = True
    db_session.commit()
    db_session.refresh(user)



def authenticate(db_session: Session, *, username: str, password: str):
    user = get_by_username(db_session, username=username)
    if not user:
        return None
    if not user.is_active:
        return None
    if not user.check_password(password):
        return None
    return user


def delete(db_session: Session, *, user: User):
    db_session.delete(user)
    db_session.commit()

def delete_non_active(db_session: Session, *, email: str, username: str):
    user = get_by_email(db_session, email=email)
    if user:
        if user.is_active:
            raise HTTPException(
                status_code=409,
                detail="User with such email already exists!",
            )
        user_crud.delete(db_session, user=user)
    user = get_by_username(db_session, username=username)
    if user:
        if user.is_active:
            raise HTTPException(
                status_code=409,
                detail="User with such username already exists!",
            )
        user_crud.delete(db_session, user=user)
