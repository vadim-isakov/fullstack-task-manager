from fastapi import FastAPI, Depends
import logging
# from .engine import engine
from .session import db_session, engine
from .base import Base
from .models import User
from app.config import Config
from app import crud

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def seed_superuser():
    if not crud.user.get_by_email(db_session, email=Config.Superuser.EMAIL):
        logger.info("Creating superuser")
        crud.user.create(
            db_session,
            username=Config.Superuser.USERNAME,
            email=Config.Superuser.EMAIL,
            password=Config.Superuser.PASSWORD,
            is_superuser=True,
            is_active=True
        )
    

def init_db():
    Base.metadata.create_all(bind=engine)
    seed_superuser()
