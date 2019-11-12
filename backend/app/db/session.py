from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine
from app.config import Config


SQLALCHEMY_DATABASE_URL = 'mysql://%s:%s@%s/%s' % (
    Config.Database.USER,
    Config.Database.PASSWORD,
    Config.Database.HOST,
    Config.Database.DATABASE
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)