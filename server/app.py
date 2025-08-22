import os
from flask import Flask, jsonify
from flask_pymongo import PyMongo
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

#Load environment variables
load_dotenv()

app = Flask(__name__)

# Replace with your MongoDB Atlas connection string
app.config["MONGO_URI"] = os.getenv("MONGO_URI")

try:
    mongo = PyMongo(app)
    # Test the connection by calling server_info()
    mongo.cx.server_info()
    connection_status = True
except ConnectionFailure:
    connection_status = False

@app.route('/')
def home():
    if connection_status:
        return jsonify({"message": "MongoDB Atlas connected successfully!"})
    else:
        return jsonify({"error": "Failed to connect to MongoDB Atlas"}), 500

if __name__ == '__main__':
    app.run(debug=True)
