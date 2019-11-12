from fastapi import Depends, HTTPException, Form, APIRouter
from sqlalchemy.orm import Session
from pydantic import BaseModel
from email_validator import validate_email
from app import crud
from app.db.models import User
from . import utils
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()



class AccessToken(BaseModel):
    access_token: str
    token_type: str

@router.post("/token", response_model=AccessToken)
def make_access_token(db_session: Session = Depends(utils.get_db), *, username: str = Form(...), password: str = Form(...)):
    user = crud.user.authenticate(db_session, username=username, password=password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
        )
    token = utils.access_token.encode(user.id)
    return {"access_token": token, "token_type": "bearer"}




class IsTokenValid(BaseModel):
    is_token_valid: bool

@router.get("/check", response_model=IsTokenValid)
def check_token(
    db_session: Session = Depends(utils.get_db),
    token: str = Depends(OAuth2PasswordBearer(tokenUrl="/auth/token"))
):
    try:
        user_id = utils.access_token.decode(token)
        user = crud.user.get_by_id(db_session, id=user_id)
        is_token_valid = (user != None)
        return { 'is_token_valid': is_token_valid }
    except:
        return { 'is_token_valid': False }



#####  Init confirmation  #####
class InitConfirmationInput(BaseModel):
    email: str
    password: str
    username: str
    confirm_url: str = None

@router.post("/init-confirmation")
async def init_confirmation(input: InitConfirmationInput, db_session: Session = Depends(utils.get_db)):
    try:
        validate_email(input.email)
    except:
        raise HTTPException(
            status_code=422,
            detail="Invalid email!",
        )
    crud.user.delete_non_active(db_session, email=input.email, username=input.username)
    crud.user.create(
        db_session,
        username=input.username,
        email=input.email,
        password=input.password
    )
    token = utils.confirm_token.encode(input.email)

    message = ''
    if input.confirm_url:
        message = utils.email_content.render_confirm_link_html(input.confirm_url, token)
    else:
        message = utils.email_content.render_confirm_token_html(token)

    await utils.send_mail(input.email, 'User confirmation', message)
    return {"msg": "Email for confirmation sent to " + input.email}
###########################



class ConfirmToken(BaseModel):
    confirm_token: str


@router.put("/confirm", response_model=AccessToken)
def confirmation(input: ConfirmToken, db_session: Session = Depends(utils.get_db)):
    email = utils.confirm_token.decode(input.confirm_token)
    if not email:
        raise HTTPException(status_code=401, detail="Incorrect token")
    user = crud.user.get_by_email(db_session, email=email)
    if user.is_active:
        raise HTTPException(status_code=401, detail="User is already activated")
    crud.user.activate(db_session, user=user)

    
    token = utils.access_token.encode(user.id)
    return {"access_token": token, "token_type": "bearer"}



