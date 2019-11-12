
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Table
from sqlalchemy.orm import relationship


import datetime
import bcrypt

from ..config import Config
from .base import Base


TaskUser = Table('task_user', Base.metadata,
    Column('task_id', Integer, ForeignKey('task.id')),
    Column('user_id', Integer, ForeignKey('user.id'))
)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer(), primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(80), unique=True, nullable=False)
    password_hash = Column(String(80), nullable=False)
    tasks = relationship('Task', secondary=TaskUser, lazy='dynamic')
    is_superuser = Column(Boolean(), default=False)
    is_active = Column(Boolean(), default=False)

    def __init__(self, username, email, password, is_superuser=False, is_active = False):
        password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.is_superuser = is_superuser
        self.is_active = is_active

    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password_hash.encode())



class Task(Base):
    __tablename__ = 'task'
    id = Column(Integer(), primary_key=True)
    created_by_user_id = Column(Integer(), ForeignKey('user.id'))
    date = Column(DateTime(), default=datetime.datetime.now)
    title = Column(String(80), nullable=False)
    description = Column(String(1000), nullable=False)
    status_id = Column(Integer(), nullable=False, default=0)
    assigned_users = relationship('User', secondary=TaskUser)
    comments = relationship('Comment', order_by="Comment.date")



class Comment(Base):
    __tablename__ = 'comment'
    id = Column(Integer(), primary_key=True)
    created_by_user_id = Column(Integer(), ForeignKey('user.id'))
    task_id = Column(Integer(), ForeignKey('task.id'))
    text = Column(String(300))
    date = Column(DateTime(), default=datetime.datetime.now)


