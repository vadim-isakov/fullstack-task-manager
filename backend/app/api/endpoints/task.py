from typing import List, Dict
from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app import crud
from app.db.models import User
from app.data import TASK_STATUSES
from . import utils



router = APIRouter()



#####  Get statuses  #####
class GetStatusesOutput(BaseModel):
    name: str
    color: str
    allowed: bool

@router.get("/statuses", response_model=Dict[int, GetStatusesOutput])
def get_statuses(current_user: User = Depends(utils.current_active_user)):
    statuses = {}
    for status_id, data in TASK_STATUSES.items():
        statuses[status_id] = {
            'name': data['name'],
            'color': data['color'],
            'allowed': (not data['superuser_required']) or current_user.is_superuser
        }
    return statuses
##########################



class BaseGetTaskOutput(BaseModel):
    id: int
    date: str
    status_id: int
    title: str
    description: str = ''

class GetTasksOutput(BaseGetTaskOutput):
    comments_count: int

class AssignedUser(BaseModel):
    id: int
    username: str
    email: str

class GetTaskOutput(BaseGetTaskOutput):
    created_by: str
    assigned_users: List[AssignedUser]



#####    Get tasks    #####
@router.get("/archived", response_model=List[GetTasksOutput])
def get_archived_tasks(
    *,
    db: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user)
):
    return crud.task.get_archived(db, current_user=current_user)


@router.get("/", response_model=List[GetTasksOutput])
def get_not_archived_tasks(
    *,
    db: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user)
):
    return crud.task.get_not_archived(db, current_user=current_user)
##########################



@router.get("/{id}", response_model=GetTaskOutput)
def get_task(
    *,
    db: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user),
    id: int,
):
    task = crud.task.get(db, task_id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if not crud.task.is_allowed(db, current_user=current_user, task_id=id):
        raise HTTPException(status_code=401, detail="Not enough permissions")
    pretty_task = crud.task.get_pretty(db, task=task)

    return pretty_task


#####  Create task  #####
class CreateTaskInput(BaseModel):
    title: str = Query(..., max_length=100, min_length=1)
    description: str = Query(..., max_length=2000)
    task_url: str = ''
    assigned_users_ids: List[int] = []
    
class CreateTaskOutput(BaseModel):
    task_id: int


@router.post("/", status_code=201, response_model=CreateTaskOutput)
def create_task(
    *,
    input: CreateTaskInput,
    background_tasks: BackgroundTasks,
    db: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user),
):
    #Current user always assigned to created task
    assigned_users_ids = input.assigned_users_ids.copy()
    if not current_user.id in assigned_users_ids:
        assigned_users_ids = [current_user.id] + assigned_users_ids

    assigned_users = crud.user.get_by_ids(db, users_ids=assigned_users_ids)

    task_id = crud.task.create(
        db,
        current_user = current_user,
        title = input.title,
        description = input.description,
        assigned_users=assigned_users
    )

    assigned_users_emails = [user.email for user in assigned_users]
    subject = 'Created task'
    message = ''
    if input.task_url:
        message = utils.email_content.render_task_link_html(input.task_url, task_id)
    else:
        message = utils.email_content.render_task_id_html(task_id)
    background_tasks.add_task(utils.send_mails, assigned_users_emails, subject, message)
    # utils.send_mails(assigned_users_emails, subject, message)
    return {'task_id': task_id }
##########################


#####  Edit task  #####
class EditTaskInput(BaseModel):
    title: str = Query(None, max_length=100, min_length=1)
    description: str = Query(None, max_length=2000)
    task_url: str = ''
    assigned_users_ids: List[int] = None
    status_id: int = None

class EditTaskOutput(BaseModel):
    task_id: int


@router.put("/{id}", response_model=EditTaskOutput)
def edit_task(
    *,
    background_tasks: BackgroundTasks,
    db_session: Session = Depends(utils.get_db),
    current_user: User = Depends(utils.current_active_user),
    id: int,
    input: EditTaskInput
):
    if all([val == None for val in dict(input).values()]):
        raise HTTPException(
            status_code=400,
            detail="Request input is empty",
        )

    task = crud.task.get(db_session, task_id=id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if not crud.task.is_allowed(db_session, current_user=current_user, task_id=id):
        raise HTTPException(status_code=401, detail="Not enough permissions")


    is_task_changed = crud.task.update(
        db_session,
        current_user=current_user,
        task = task,
        title = input.title,
        description = input.description,
        assigned_users_ids = input.assigned_users_ids,
        status_id = input.status_id,
    )

    if not is_task_changed:
        raise HTTPException(status_code=400, detail="Data has not changed")

    assigned_users_emails = [user.email for user in task.assigned_users]
    subject = 'Edited task'
    message = 'The task you are assigned to has been changed. '
    if input.task_url:
        message += utils.email_content.render_task_link_html(input.task_url, task.id)
    else:
        message += utils.email_content.render_task_id_html(task.id)

    background_tasks.add_task(utils.send_mails, assigned_users_emails, subject, message)
    return {'task_id': task.id }
##########################

