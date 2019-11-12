from typing import List
from fastapi import HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session
from app.db.models import Task, User, TaskUser
from . import user as user_crud
from app.data import TASK_STATUSES, ARCHIVED_TASK


def get(db_session: Session, *, task_id: int):
    return db_session.query(Task).get(task_id)


def get_pretty(db_session: Session, *, task: Task):
    assigned_users = [{
        'id': user.id,
        'username': user.username,
        'email': user.email
    } for user in task.assigned_users]

    created_by = db_session.query(User).get(task.created_by_user_id).email
    pretty_task = {
        'id': task.id,
        'date': task.date.strftime("%Y-%m-%d %H:%M"),
        'title': task.title,
        'description': task.description,
        'status_id': task.status_id,
        'created_by': created_by,
        'assigned_users': assigned_users
    }
    return pretty_task

def prettify_tasks(tasks):
    return [{
        'id': task.id,
        'date': task.date.strftime("%Y-%m-%d %H:%M"),
        'title': task.title,
        'description': task.description,
        'comments_count': len(task.comments),
        'status_id': task.status_id,
    } for task in tasks]


def get_not_archived(db_session: Session, *, current_user: User):
    tasks = []
    if current_user.is_superuser:
        tasks = db_session.query(Task).order_by(desc(Task.date))
    else:
        tasks = current_user.tasks.order_by(desc(Task.date))
    tasks = tasks.filter(Task.status_id != ARCHIVED_TASK)
    return prettify_tasks(tasks)



def get_archived(db_session: Session, *, current_user: User):
    tasks = []
    if current_user.is_superuser:
        tasks = db_session.query(Task).order_by(desc(Task.date))
    else:
        tasks = current_user.tasks.order_by(desc(Task.date))

    tasks = tasks.filter_by(status_id=ARCHIVED_TASK)
    return prettify_tasks(tasks)




def create(
    db_session: Session,
    *,
    current_user: User,
    title: str,
    description: str,
    assigned_users: List[User]
):

    task = Task(
        created_by_user_id=current_user.id,
        title=title,
        description=description
    )

    for user in assigned_users:
        task.assigned_users.append(user)

    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)
    return task.id


def reassign_users(db_session, new_ids, task):
    old_ids = [user.id for user in task.assigned_users]
    if old_ids == new_ids:
        return False

    for old_user in task.assigned_users:
        if not old_user.id in new_ids:
            task.assigned_users.remove(old_user)

    for new_id in new_ids:
        if not new_id in old_ids:
            new_user = db_session.query(User).get(new_id)
            task.assigned_users.append(new_user)
    return True

def update(
    db_session: Session,
    *,
    current_user: User,
    task: Task,
    title: str,
    description: str,
    assigned_users_ids: List[int],
    status_id: int
):
    is_task_changed = False

    if title != None:
        if task.title != title:
            task.title = title
            is_task_changed = True

    if description != None:
        if task.description != description:
            task.description = description
            is_task_changed = True

    if status_id != None:
        if task.status_id != status_id:
            new_status = TASK_STATUSES.get(status_id)
            if not new_status:
                raise HTTPException(status_code=400, detail='Incorrect status id')

            if (not current_user.is_superuser) and new_status['superuser_required']:
                raise HTTPException(status_code=401,
                    detail='Only superuser able to change task status to %s' % new_status['name'])
            
            task.status_id = status_id
            is_task_changed = True

    if assigned_users_ids != None:
        if reassign_users(db_session, assigned_users_ids, task):
            is_task_changed = True

    if is_task_changed:
        db_session.commit()
        db_session.refresh(task)

    return is_task_changed


def is_allowed(
    db_session: Session,
    *,
    current_user: User,
    task_id: int
):
    if current_user.is_superuser:
        return True
    if db_session.query(TaskUser).filter_by(task_id=task_id, user_id=current_user.id).first():
        return True
    return False
