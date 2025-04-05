from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import os
from dotenv import load_dotenv

# Initialize bcrypt for password hashing
bcrypt = Bcrypt()

# Connect to MongoDB
MONGO_URI = (os.getenv("MONGO_URI"))
client = MongoClient(MONGO_URI)
db = client["attendance_db"]
users_collection = db["users"]

# Sample User Data
user = {
    "username": "testuser",
    "password": bcrypt.generate_password_hash("password123").decode('utf-8')
}

# Insert User
users_collection.insert_one(user)
print("User added successfully!")
