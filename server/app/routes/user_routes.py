from flask import Blueprint
from app.controllers.user_controller import get_user_profile

user_bp = Blueprint("user", __name__)

# Route to get user profile
user_bp.route("/profile", methods=["GET"])(get_user_profile)
