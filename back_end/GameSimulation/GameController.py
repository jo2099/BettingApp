from flask import Flask, Blueprint, request, jsonify,Response,stream_with_context
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
import time
import queue
import json
game_bp = Blueprint('game_bp', __name__)
CORS(game_bp)

# Um dicionário para armazenar mensagens específicas para cada game_id
messages = queue.Queue()
timersQueues = {}

gameStreamMessages = queue.Queue()

def generate_events():
    while True:
        if not messages.empty():
            # print("MESSAGES",messages)
            message = messages.get() #isso retira a mensagem da fila
            yield f"data: {message}\n\n"
        time.sleep(0.05)       




@game_bp.route('/events/stream', methods=['GET'])
def sse():
  return Response(generate_events(), mimetype="text/event-stream")

@game_bp.route('/<game_id>', methods=['GET'])
def get_time(game_id):
    from .GameSimulationService import GameService
    game=GameService().getGame(game_id)
    if(game):
        return jsonify(game.tojson())
    else:
        game=GameService().getRandomGame()
        return jsonify(game.tojson())
    
@game_bp.route('/gameStream')
def game_stream():
    def generate():
        while True:
            if not gameStreamMessages.empty():
                message = gameStreamMessages.get()
                yield f"data: {message}\n\n"
            time.sleep(0.05)
    return Response(generate(), mimetype="text/event-stream")

def send_gameStream_message(message):
    gameStreamMessages.put(message)

def send_direct(message):
    messages.put(message)


    