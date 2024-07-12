from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from UserManagement.UserService import get_users
from flask_jwt_extended import jwt_required, get_jwt_identity
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
@jwt_required()
def users():
    search = request.args.get('search', default = None, type = str)
    #faz uma validacao do parametro search
    print(search)
    return get_users(search)