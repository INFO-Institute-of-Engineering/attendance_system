from flask import Flask
from flask_pymongo import PyMongo

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')

    # Initialize MongoDB
    mongo.init_app(app)

    # Register blueprints (routes) later
    from app.routes import auth_routes, student_routes, staff_routes
    app.register_blueprint(auth_routes)
    app.register_blueprint(student_routes)
    app.register_blueprint(staff_routes)

    return app