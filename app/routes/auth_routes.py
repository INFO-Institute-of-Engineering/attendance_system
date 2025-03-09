from flask import Blueprint, jsonify
from app import mongo

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/test_db')
def test_db():
    try:
        mongo.db.command('ping')
        return jsonify({"status": "MongoDB connected!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500