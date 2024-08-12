from .GameFactory import GameFactory
from utils.Observer import Observer
from .GameController import send_gameStream_message,remove_messages
import time
import random
import queue
import json
import threading
class GameService(Observer):
    _instance=None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            self.initialized = True
            self.gameFactory = GameFactory()
            self.message_queue = queue.Queue()
            self.activeGames=set()


        

    def generate_game(self, tipo,time1,time2,duracoes_tempos_segundos=[10,10],tempos_intervalos=[10]):
        if time1 in self.activeTeams or time2 in self.activeTeams:
            return None
        game = self.gameFactory.create_game(tipo,time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        game.add_subscriber(self)

        return game
    
    def update(self,message):
        #unpack na mensagem
        if(message[0]=="end"):
            msg,game = message
            print("--------------------")
            print("removendo jogo")
            print("--------------------")
            message={
                "event":"end_game",
                "details":{
                    "id":str(game.get_id()),
                    "time1":str(game.get_time1()),
                    "time2":str(game.get_time2()),
                    "tipo":game.get_tipo(),
                    "result":game.get_result()
                }
            }
            print("--------------------")
            print("mandando end game")
            print("--------------------")
            json_message=json.dumps(message)
            send_gameStream_message(json_message)
            remove_messages(game.get_id())
            self.activeGames.remove(game)


    def getGame(self,gameid):
        #retorna o jogo com o id especificado
        for game in self.activeGames:
            if game.get_id()==gameid:
                return game
    def generate_games(self):
        # while True:
        #     #gera periodicamente um jogo aleatorio
        game=self.gameFactory.create_random_game()
        if(game!=None):
            game.add_subscriber(self)
            self.activeGames.add(game)
            print("activeGames",self.activeGames)
            game.add_subscriber(self)
            message={
                "event":"new_game",
                "details":{
                    "id":str(game.get_id()),
                    "time1":str(game.get_time1()),
                    "time2":str(game.get_time2()),
                    "tipo":game.get_tipo()
                }
            }
            json_message=json.dumps(message)
            send_gameStream_message(json_message)
            print("mandando mensagem")
            game.simulate()
            
            
    def get_message_queue(self):
        return self.message_queue

    def getGames(self,tipo):
        return [game.get_result() for game in self.activeGames if game.get_tipo()==tipo]
    
    def getGame(self,id):
        for game in self.activeGames:
            if game.get_id()==id:
                return game
            
    def getRandomGame(self):
        return random.choice(list(self.activeGames))

    def activate(self):
        while True:
            #gera periodicamente um jogo aleatorio
            threading.Thread(target=self.generate_games).start()
            time.sleep(6)

