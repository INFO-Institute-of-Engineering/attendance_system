from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt

auth_bp = Blueprint('auth', __name__)

# Initialize MongoDB and Bcrypt
mongo = PyMongo()
bcrypt = Bcrypt()

# Route to check username and password
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Find user in database
    user = mongo.db.users.find_one({"username": username})

    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401
