import os

class Config(object):
    class Database(object):
        HOST = 'db'
        PORT = '3306'
        USER = 'root'
        PASSWORD = os.environ['MYSQL_ROOT_PASSWORD']
        DATABASE = os.environ['MYSQL_DATABASE']

    class Superuser(object):
        USERNAME = os.environ['SUPERUSER_USERNAME']
        EMAIL = os.environ['SUPERUSER_EMAIL']
        PASSWORD = os.environ['SUPERUSER_PASSWORD']


    class Mail(object):
        EMAIL = os.environ['EMAIL']
        USERNAME = os.environ['MAIL_USERNAME']
        PASSWORD = os.environ['MAIL_PASSWORD']
        SMTP_SERVER = os.environ['SMTP_SERVER']
        SMTP_PORT = os.environ['SMTP_PORT']

    class Auth(object):
        CONFIRM_TOKEN_EXPIRE_SECONDS = 3600
        ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 60 minutes * 24 hours * 7 days = 7 days
        SECRET_KEY = os.environ['SECRET_KEY']
        ALGORITHM = "HS256"

    EMAIL_TEMPLATES_DIR = "/app/app/email_templates/build"
