from flask import Flask,Blueprint, request, jsonify
from flask_cors import CORS
from Auth.AuthService import Register, Login

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')

    return Login(username, password)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    return Register(username, password)