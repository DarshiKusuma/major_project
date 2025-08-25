from flask import Blueprint
from app.controllers import auth_controller

auth_bp = Blueprint("auth", __name__)

auth_bp.route("/register", methods=["POST"])(auth_controller.register)
auth_bp.route("/login", methods=["POST"])(auth_controller.login)
auth_bp.route("/verify/<token>", methods=["GET"])(auth_controller.verify_email)
auth_bp.route("/resend-verification", methods=["POST"])(auth_controller.resend_verification)
auth_bp.route("/forgot-password", methods=["POST"])(auth_controller.forgot_password)
auth_bp.route("/reset-password/<token>", methods=["POST"])(auth_controller.reset_password)