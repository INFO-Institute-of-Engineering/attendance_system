import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key_here")
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/attendance_db")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_jwt_secret_key_here")
