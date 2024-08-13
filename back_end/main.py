from flask import Flask,Blueprint, request, jsonify
from flask_cors import CORS
# from Auth.authController import auth_bp
from UserManagement.UserController import user_bp
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from Data.DataService import DataService
import threading
from GameSimulation.GameSimulationService import GameService
from GameSimulation.GameController import game_bp
from BettingManegement.BetController import bet_bp
from Store.RewardController import reward_bp

import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

load_dotenv()
DataService.initService(app)

app.config['JWT_SECRET_KEY']=os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

def start_game_service():
    game_service = GameService()
    game_thread = threading.Thread(target=game_service.activate)
    game_thread.daemon = True  # Permite que o thread seja encerrado quando o programa principal terminar
    game_thread.start()
    print("Serviço de geração de jogos iniciado.")
    return game_thread


# app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(game_bp, url_prefix='/game')
app.register_blueprint(bet_bp, url_prefix='/bet')
app.register_blueprint(reward_bp, url_prefix='/reward')
if __name__ == '__main__':
    gameThread=start_game_service()
    app.run(debug=True, host='0.0.0.0', port=5000)
    gameThread.join()
