from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from datetime import datetime
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from app.db.models import User
from app import crud
from . import utils

router = APIRouter()

#####  Get task comments  #####
class GetTaskCommentsOutput(BaseModel):
    id: int
    text: str
    date: str
    created_by: str


@router.get("/{task_id}", response_model=List[GetTaskCommentsOutput])
def get_task_comments(
    *,
    db_session: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_user),
    task_id: int
):
    task = crud.task.get(db_session, task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return crud.comment.get_by_task(db_session, task=task)
###############################


#####  Get comment  #####
class CreateCommentInput(BaseModel):
    task_id: int
    text: str
    task_url: str = ''


class CreateCommentOutput(BaseModel):
    id: int


@router.post("/", status_code=201, response_model=CreateCommentOutput)
def create_comment(
    *,
    input: CreateCommentInput,
    db_session: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_user),
    background_tasks: BackgroundTasks
):
    if not input.text:
        raise HTTPException(status_code=400, detail="Text is empty")

    task = crud.task.get(db_session, task_id=input.task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    comment_id = crud.comment.create(db_session,
        text=input.text,
        current_user=current_user,
        task=task
    )

    assigned_users_emails = [user.email for user in task.assigned_users if user.id != current_user.id]
    subject = 'New comment!'
    message = 'User %s wrote a new comment for the task. ' % current_user.email

    if input.task_url:
        message += utils.email_content.render_task_link_html(input.task_url, task.id)
    else:
        message += utils.email_content.render_task_id_html(task.id)

    background_tasks.add_task(utils.send_mails, assigned_users_emails, subject, message)
    return {'id': comment_id}
##########################


@router.delete("/{id}")
def delete_comment(
    *,
    id: int,
    db_session: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=401, detail="Not enough permissions")

    comment = crud.comment.get(db_session, id=id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    crud.comment.delete(db_session, comment=comment)
    return {}
