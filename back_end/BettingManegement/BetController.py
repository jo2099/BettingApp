from flask import Flask, Blueprint, request, jsonify,Response,stream_with_context
from flask_cors import CORS
import time
import json

bet_bp = Blueprint('bet_bp', __name__)

CORS(bet_bp)


@bet_bp.route('/createbet', methods=['POST'])
def add_bet():
    from .BetManagerService import BetManager
    data = request.get_json()
    game_id = data['game_id']
    user_id = data['user_id']
    bet_value = data['bet_value']
    #bet_value é um objeto que contém o valor da aposta e o vencedor
    print("bet_value",bet_value)
    # try:
    bet = BetManager().createBet(game_id, user_id, bet_value)
    print("BET",bet)
    return jsonify(bet.tojson())
    # except Exception as e:
    #     # print("aaaaa")
    #     # return str(e), 400
    #     print(e)
    

@bet_bp.route('/createbet/randomGame', methods=['POST'])
def add_randomgameBet():
    from .BetManagerService import BetManager
    data = request.get_json()
    user_id = data['user_id']
    bet_value = data['bet_value']
    try:
        bet = BetManager().createBetRandomGame(user_id, bet_value)
        return jsonify(bet.tojson())
    except Exception as e:
        return str(e), 400
    
@bet_bp.route('/bets/<user_id>', methods=['GET'])
def get_bets(user_id):
    from .BetManagerService import BetManager
    bets = BetManager().getDoneBets(user_id)
    # print("BETS",bets)
    #tira o _sa_instance_state pq o json nao serializa isso
    for bet in bets:
        bet.pop('_sa_instance_state')
        
    # print("BETS 2",bets)
    return jsonify(bets)
    # print("RESPONSE",response)

