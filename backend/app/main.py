from fastapi import FastAPI
from app.db.init_db import init_db
from app.db.session import Session
from starlette.requests import Request
from app.api.router import api_router
from app import salt
import bcrypt


app = FastAPI(title='Task manager')
init_db()


@app.on_event("startup")
async def startup_event():
    salt.confirm_salt = bcrypt.gensalt()

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    request.state.db = Session()
    response = await call_next(request)
    request.state.db.close()
    return response


app.include_router(api_router)
