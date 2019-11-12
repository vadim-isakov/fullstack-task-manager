from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.models import User
from app import crud
from . import utils

from pydantic import BaseModel


router = APIRouter()

#####  Get current user  #####
class GetCurrentUserOutput(BaseModel):
    id: int
    email: str
    is_superuser: bool


@router.get("/current", response_model=GetCurrentUserOutput)
def get_current_user(
    *,
    db_session: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user)
):
    return {
        'id': current_user.id,
        'email': current_user.email,
        'is_superuser': current_user.is_superuser
    }
##############################


#####    Get users    #####
class GetUsersOutput(BaseModel):
    id: int
    name: str
    email: str


@router.get("/", response_model=List[GetUsersOutput])
def get_users(
    *,
    db_session: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user)
):

    users = crud.user.get_active(db_session)
    return users
###########################