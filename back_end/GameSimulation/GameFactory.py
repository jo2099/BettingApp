import time
from .Game import Futebol,Basquete
import random
from utils.Observer import Observer

class GameFactory(Observer):
    def __init__(self):
        self.activeGames=set()
        self.activeTeams=set()
        self.futebolTeams=["Gremio","Internacional","São Paulo","Corinthians","Flamengo","Vasco","Fluminense","Botafogo","Palmeiras","Santos","Cruzeiro","Atlético-MG","Fluminense","Botafogo","Vasco","Bahia","Sport","Fortaleza","Ceará","Goiás","Avaí","Chapecoense","CSA"]
        self.basqueteTeams=["Los Angeles Lakers","Boston Celtics","Golden State Warriors","Chicago Bulls","San Antonio Spurs","Miami Heat","Houston Rockets","Philadelphia 76ers","Detroit Pistons","New York Knicks","Oklahoma City Thunder","Dallas Mavericks","Portland Trail Blazers","Toronto Raptors","Cleveland Cavaliers","Indiana Pacers","Milwaukee Bucks","Utah Jazz","Denver Nuggets","Phoenix Suns","Atlanta Hawks","Washington Wizards","Sacramento Kings","Orlando Magic","Minnesota Timberwolves","Charlotte Hornets","Brooklyn Nets","Los Angeles Clippers","Memphis Grizzlies","New Orleans Pelicans"]   

    def create_game(self, tipo,time1,time2,duracoes_tempos_segundos=[10,10],tempos_intervalos=[5]):
        if(tipo!="futebol" and tipo!="basquete"):
            raise Exception("Tipo de jogo não suportado")
        if tipo=="futebol":
            game=Futebol(time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        elif tipo=="basquete":
            game=Basquete(time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        game.add_subscriber(self)
        self.activeTeams.add(time1)
        self.activeTeams.add(time2)
        self.activeGames.add(game)
        return game
    
    def update(self,message):
        if(message[0]=="end"):
            msg,game = message
            if game in self.activeGames:
                self.activeGames.remove(game)
            if game.get_time1() in self.activeTeams:
                self.activeTeams.remove(game.get_time1())
            if game.get_time2() in self.activeTeams:
                self.activeTeams.remove(game.get_time2())
                game.remove_subscriber(self)


    def create_random_game(self):
        tipo=random.choice(["futebol","basquete"])
        #pega times que ainda não estão em jogo
        times_disponiveis = self.futebolTeams if tipo=="futebol" else self.basqueteTeams
        times_disponiveis=list(set(times_disponiveis)-self.activeTeams)
        if len(times_disponiveis)<2:
            return None
        time1=random.choice(times_disponiveis)
        times_disponiveis.remove(time1)
        time2=random.choice(times_disponiveis)
        if(tipo=="futebol"):
            game = self.create_game(tipo,time1,time2,[20,20],[8])
        elif(tipo=="basquete"):
            game = self.create_game(tipo,time1,time2,[12,12,12,12],[5,5,5])
        return game
        
        
