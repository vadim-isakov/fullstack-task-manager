from sqlalchemy.orm import Session
from app.db.models import Task, User, Comment


def get_by_task(db_session: Session, *, task: Task):
    pretty_comments = [{
        'id': comment.id,
        'text': comment.text,
        'date': comment.date.strftime("%Y-%m-%d %H:%M"),
        'created_by': db_session.query(User).get(comment.created_by_user_id).email
    } for comment in task.comments]
    return pretty_comments


def create(
    db_session: Session,
    *,
    text: str,
    current_user: User,
    task: Task
):
    comment = Comment(
        created_by_user_id=current_user.id,
        text=text
    )
    task.comments.append(comment)
    db_session.commit()
    db_session.refresh(comment)
    return comment.id


def get(db_session: Session, *, id: int):
    return db_session.query(Comment).get(id)


def delete(db_session: Session, *, comment: Comment):
    db_session.delete(comment)
    db_session.commit()