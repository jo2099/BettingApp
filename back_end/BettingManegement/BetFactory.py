from .Bet import Bet, WinningBet, CompoundedBet, AtributeBet
from GameSimulation.GameSimulationService import GameService
class BetFactory():
    def create_bet(self,game_id,user_id,bet_details):
        print("bet details",bet_details)
        print("game_id",game_id)
        game=GameService().getGame(game_id)
        print("game",game)
        winner=bet_details["winner"]
        amount = int(bet_details["betted_amount"])
        if(game==None):
            return None
        print("winner",winner)  
        if winner!=None:
            finalBet=WinningBet(game,user_id,winner,amount)
            game.add_subscriber(finalBet)
        else:
            print("aehoo")
            raise Exception("Aposta inválida")
        
        return finalBet

    def create_random_bet(self,user_id,bet_details):
        print("bet details",bet_details)
        winner=bet_details["winner"]
        game=GameService().getRandomGame()
        if(game==None):
            return None
        print("winner",winner)  
        finalBet=CompoundedBet(game,user_id,[])
        if winner!=None:
            finalBet.addBet(WinningBet(game,user_id,winner))
            game.add_subscriber(finalBet)
        else:
            raise Exception("Aposta inválida")
        
        return finalBet
