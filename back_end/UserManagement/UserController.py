from flask import Flask, Blueprint, request, jsonify,Response,stream_with_context
from flask_cors import CORS
from UserManagement.UserService import get_users,add_user,Login,get_teams
from flask_jwt_extended import jwt_required, get_jwt_identity
from Data.schemas.UserSchema import UsuarioSchema
import time
import queue
from marshmallow import ValidationError
user_bp = Blueprint('user_bp', __name__)

userStreamMessages = queue.Queue()

@user_bp.route('/users', methods=['GET'])
# @jwt_required()
def users():
    search = request.args.get('search', default = None, type = str)
    #faz uma validacao do parametro search
    print(search)
    return get_users(search)

@user_bp.route('/users/teams', methods=['GET'])
def users_teams():
    return get_teams()
    

@user_bp.route('/register', methods=['POST'])
def register():
    user = request.get_json()
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

@user_bp.route('/setcoins', methods=['POST'])
def set_coins():
    data = request.get_json()
    coins = data.get('coins')
    user_id = data.get('user_id')
    from UserManagement.UserService import setCoins
    return setCoins(user_id, coins)

@user_bp.route('/getcoins/<userid>', methods=['GET'])
def get_coins(userid):
    from UserManagement.UserService import getCoins
    return getCoins(userid)


def send_userStream_message(message):
    print("SENDING")
    userStreamMessages.put(message)

@user_bp.route('/userStream')
def game_stream():
    def generate():
        while True:
            if not userStreamMessages.empty():
                message = userStreamMessages.get()
                print("yelding",message)
                yield f"data: {message}\n\n"
            else:
                print("no message to yeld")
                yield ":\n\n"
            time.sleep(0.5)
    return Response(generate(), mimetype="text/event-stream")