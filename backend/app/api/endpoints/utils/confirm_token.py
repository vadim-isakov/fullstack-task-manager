from itsdangerous import URLSafeTimedSerializer
from app.config import Config
from app import salt

def encode(email):
    serializer = URLSafeTimedSerializer(Config.Auth.SECRET_KEY)
    return serializer.dumps(email, salt=salt.confirm_salt)


def decode(token):
    serializer = URLSafeTimedSerializer(Config.Auth.SECRET_KEY)
    try:
        email = serializer.loads(
            token, salt=salt.confirm_salt,
            max_age=Config.Auth.CONFIRM_TOKEN_EXPIRE_SECONDS)
    except:
        return False
    return email
