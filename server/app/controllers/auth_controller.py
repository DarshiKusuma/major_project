from flask import request, jsonify, current_app
from app.models.user_model import users_collection, UserSchema
from app.utils.password_utils import hash_password, check_password
from app.utils.jwt_utils import generate_token, decode_token
from flask_mail import Message
from app import mail
import uuid

#Create Schema Instance
user_schema = UserSchema()

def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    gender = data.get("gender")
    password = data.get("password")

    # Validate
    errors = user_schema.validate(data)
    if errors:
        return jsonify({"errors": errors}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User Email already exists"}), 400

    # Hash password
    data["password"] = hash_password(password)
    data["user_id"] = str(uuid.uuid4())  # Generate a unique user ID
    
    # Generate verification token
    verification_token = generate_token(data["user_id"])
    data["isVerified"] = False
    data["verification_token"] = verification_token
    
    # Insert User
    users_collection.insert_one(data)

    #Send Verification Mail With Login Link
    verify_url = f"{current_app.config['FRONTEND_URL']}/verify/{verification_token}"
    msg = Message(
        subject="Welcome! To The Smart Health Predictor",
        recipients=[email],
        body = f"Hello {name},\n\nWelcome to the Smart Health Predictor! Thanks for registering with us!\n\nPlease click the link below to verify your email:\n{verify_url}\n\nBest regards,\nThe Smart Health Predictor Team"
    )

    mail.send(msg)

    return jsonify({"message": "User created successfully! \n\nPlease check your email to verify your account."}), 201

def verify_email(token):
    decoded = decode_token(token)
    
    if not decoded:
        return jsonify({"message": "Invalid or expired token"}), 400
    
    user_id = decoded.get("user_id")
    user = users_collection.find_one({"user_id": user_id})
    
    if user.get("isVerified"):
        return jsonify({"message": "Email already verified"}), 400
    
    users_collection.update_one(
        {"user_id": user_id},
        {"$set": {"isVerified": True, "verification_token": ""}}
    )

    return jsonify({"message": "Email verified successfully! Please Login."}), 200

def resend_verification():
    data = request.json
    email = data.get("email")

    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "User not found. Please register."}), 404

    if user.get("isVerified"):
        return jsonify({"message": "Email already verified"}), 400

    # Only generate a new token, do NOT decode or validate any token here
    new_token = generate_token(user["user_id"])
    users_collection.update_one(
        {"email": email},
        {"$set": {"verification_token": new_token}}
    )

    verify_url = f"{current_app.config['FRONTEND_URL']}/verify/{new_token}"
    msg = Message(
        subject="Resend Verification - Smart Health Predictor",
        recipients=[email],
        body=f"Hi {user['name']},\n\nPlease verify your email:\n{verify_url}\n\nThanks!"
    )
    mail.send(msg)

    return jsonify({"message": "Verification email resent successfully! Please check your inbox."}), 200

def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    # Check if email is verified
    if not user.get("isVerified"):
        return jsonify({"message": "Please verify your email first"}), 403

    # Check password
    if not check_password(password, user["password"]):
        return jsonify({"message": "Invalid email or password"}), 401

    # Generate JWT token
    token = generate_token(user["user_id"])

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "name": user["name"],
            "email": user["email"],
            "gender": user["gender"]
        }
    }), 200

