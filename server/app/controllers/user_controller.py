from flask import request, jsonify
from app.models.user_model import users_collection
from app.utils.jwt_utils import decode_token

# ---------------- Get User Profile ----------------
def get_user_profile():
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({"error": "Authorization token required"}), 401

    try:
        # Expecting header like: "Bearer <token>"
        token = auth_header.split(" ")[1]
        decoded = decode_token(token)

        if not decoded:
            return jsonify({"error": "Invalid or expired token"}), 401

        user_id = decoded.get("user_id")
        user = users_collection.find_one({"user_id": user_id}, {"_id": 0, "name": 1, "gender": 1, "age": 1})

        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"user": user}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
