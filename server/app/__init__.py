from flask import Flask
from flask_cors import CORS
from app.config import Config
from pymongo import MongoClient, errors

#Global Vars
db = None
mail = None

def create_app():
    global db, mail
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    
    #Initialize MongoDB
    try:
        client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=5000)
        client.server_info()  # Force connection on a request as the
        db = client.get_default_database()
        print("✅ MongoDB connected successfully")
    except errors.ServerSelectionTimeoutError as e:
        print("❌ MongoDB connection failed", e)
        import sys
        sys.exit(1)

    # Initialize Flask-Mail
    from flask_mail import Mail
    mail = Mail(app)

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")
    
    from app.routes.user_routes import user_bp
    app.register_blueprint(user_bp, url_prefix="/user")
    
    from app.routes.stress_routes import stress_bp
    app.register_blueprint(stress_bp, url_prefix="/stress")

    return app
