from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt

mongo = PyMongo()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)

    # MongoDB Configuration
    app.config["MONGO_URI"] = "mongodb://localhost:27017/attendance_db"
    
    mongo.init_app(app)
    bcrypt.init_app(app)
    CORS(app)

    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app
