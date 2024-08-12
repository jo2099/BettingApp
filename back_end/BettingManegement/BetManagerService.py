from utils.Observer import Observer
from .BetFactory import BetFactory
#classe que mantém as bets ativas e serve como mediator entre as bets e o frontEnd
#front end manda request para o BetController e ativa a funcao add_better do BetManager que recebe o game e o id do usuario 
from GameSimulation.GameSimulationService import GameService
class BetManager():
    def __init__(self):
        self.Activebets = set()


    def createBet(self,game_id,user_id,bet_details):
        bet=BetFactory().create_bet(game_id,user_id,bet_details)
        self.Activebets.add(bet)
        print("BET RESULTADO",bet)
        if(bet!=None):
            return bet
        else:
            raise Exception("Aposta inválida")
        
    def createBetRandomGame(self,user_id,bet_details):
        bet=BetFactory().create_random_bet(user_id,bet_details)
        self.Activebets.add(bet)
        if(bet!=None):
            return bet
        else:
            raise Exception("Aposta inválida")
        
    def getDoneBets(self,user_id):
        from Data.DataService import DataService
        return DataService.getBets(user_id)