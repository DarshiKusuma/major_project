from flask import Blueprint
from app.controllers.stress_controller import stress_from_image, stress_from_live

stress_bp = Blueprint("stress", __name__)

# POST → Image upload
stress_bp.route("/image", methods=["POST"])(stress_from_image)

# GET → Live detection
stress_bp.route("/live", methods=["GET"])(stress_from_live)
