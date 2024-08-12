from flask import Flask, Blueprint, request, jsonify,Response,stream_with_context
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity
import time
import queue
import json
game_bp = Blueprint('game_bp', __name__)
CORS(game_bp)

# Um dicionário para armazenar mensagens específicas para cada game_id
messages = {}
timersQueues = {}

gameStreamMessages = queue.Queue()

def generate_events(game_id):
    while True:
        if game_id in messages:
            message = messages[game_id]
            yield f"data: {message}\n\n"
            del messages[game_id]
            print("messages", messages)
            time.sleep(0.0005)
        else:
            time.sleep(0.0005)


def remove_messages(game_id):
    #remove o id do dicionario de mensagens
    if game_id in messages:
        messages.pop(game_id)

def trigger_timer_update(game_id, timer_value):
    """Adiciona um evento de atualização de timer na fila correspondente ao game_id."""
    if game_id not in timersQueues:
        timersQueues[game_id] = queue.Queue()
    # Coloca o novo valor do timer na fila do game_id
    timersQueues[game_id].put(json.dumps({"timer": timer_value, "id": game_id}))
    print(f"[DEBUG] Timer atualizado para game_id {game_id} com valor {timer_value}")

@game_bp.route('/timer/<game_id>', methods=['GET'])
def timer_stream(game_id):
    def generate():
        if game_id not in timersQueues:
            timersQueues[game_id] = queue.Queue()
        q = timersQueues[game_id]
        while True:
            try:
                # Aguarda por novos eventos na fila com um timeout para evitar bloqueios
                event = q.get(timeout=10)
                print(f"[DEBUG] Enviando evento para game_id {game_id}: {event}")
                yield f"data: {event}\n\n"
            except queue.Empty:
                # Isso evita que o servidor fique bloqueado indefinidamente
                continue
    
    print(f"[DEBUG] Iniciando stream para game_id {game_id}")
    return Response(generate(), mimetype="text/event-stream")

@game_bp.route('/events/<game_id>', methods=['GET'])
def sse(game_id):
  return Response(generate_events(game_id), mimetype="text/event-stream")

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
            time.sleep(1)
    return Response(generate(), mimetype="text/event-stream")

def send_gameStream_message(message):
    gameStreamMessages.put(message)

def send_direct(game_id, message):
    messages[game_id] = message

@game_bp.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    game_id = data.get('game_id')
    message = data.get('message')
    
    if game_id and message:
        messages[game_id] = message
        return {"status": "success"}, 200
    else:
        return {"status": "error", "message": "Missing game_id or message"}, 400

    