from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from UserManagement.UserService import get_users,add_user,Login
from flask_jwt_extended import jwt_required, get_jwt_identity
from Data.schemas.UserSchema import UsuarioSchema
from marshmallow import ValidationError
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
# @jwt_required()
def users():
    search = request.args.get('search', default = None, type = str)
    #faz uma validacao do parametro search
    print(search)
    return get_users(search)


@user_bp.route('/register', methods=['POST'])
# @jwt_required()
def add_userC():
    user = request.get_json()
    print("--------------------",user)
    user_schema = UsuarioSchema()
    try:
        validated_user = user_schema.load(user)
    except ValidationError as err:
        # Retorna os erros de validação para o cliente
        return jsonify(err.messages), 400
    
    try:
        return jsonify(add_user(validated_user)), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 400
    
@user_bp.route('/login', methods=['POST'])

def login():
    data = request.get_json()
    print(data)
    email = data.get('email')
    senha = data.get('senha')

    return Login(email, senha)