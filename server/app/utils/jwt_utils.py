import jwt
import datetime
from app.config import Config

# ---------------- Login Token (24h) ----------------
def generate_login_token(user_id):
    payload = {
        "user_id": str(user_id),
        "type": "login",
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")

# ---------------- Short Token (10 min) ----------------
def generate_short_token(user_id, token_type="verify"):
    """
    user_id -> can be user_id or email
    token_type -> "verify" or "reset"
    """
    payload = {
        "user_id": str(user_id),
        "type": token_type,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)
    }
    return jwt.encode(payload, Config.SECRET_KEY, algorithm="HS256")

# ---------------- Decode ----------------
def decode_token(token):
    try:
        return jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
