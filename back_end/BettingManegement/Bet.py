from utils.Observer import Observer
from uuid import uuid4
#preciso ter o tracking na Bet de qual é o componente respectivo no frontEnd para atualizar

class Bet(Observer):
    def __init__(self,game,user_id,betted_result=None,betted_amount=0):
        self._game=game
        self._betters=[]
        self._betted_amount=betted_amount
        self.multipliers=[1.5,1.1,2]
        #cria um id unico para a aposta
        self.id=uuid4()
        self.user_id=user_id

    def add_betters(self,better):
        self._betters.append(better)

    def remove_betters(self,better):
        self._betters.remove(better)

    def resolve_bet(self):
        print("resolvendo apostas")
        result=self._game.get_result()
                
    def update(self,message:list):
        #se message conter "end" ou "score" ou "timer" notifica os betters
        print("UPDATE BET")
        if(message[0]=="end"):
            print("betters notified end")
            print(self._game.get_result())
            self.resolve_bet()
            #manda um sse para o frontEnd
    def tojson(self):
        return {"id":str(self.id),"game":str(self._game.get_id()),"betters":self._betters,"betted_amount":self._betted_amount}                

class WinningBet(Bet):
    def __init__(self, game, user_id,betted_result=None,betted_amount=0):
        super().__init__(game, user_id,betted_result,betted_amount)
        self.bettedwinningTeam = betted_result
    def resolve_bet(self):
        print("resolvendo aposta")
        result=self._game.get_result()
        #considera empate
        if result["time1"]["score"]==result["time2"]["score"]:
            winningTeam="Empate"
            multipler=self.multipliers[1]
        elif result["time1"]["score"]>result["time2"]["score"]:
            winningTeam=result["time1"]["nome"]
            multipler=self.multipliers[0]
        else:
            winningTeam=result["time2"]["nome"]
            multipler=self.multipliers[2]
        
        print("WINNING TEAM",winningTeam)
        if winningTeam== self.bettedwinningTeam:
            print("Parabéns! Você ganhou a aposta! winnig")
            return True,self._betted_amount * multipler
        else:
            print("Que pena! Você perdeu a aposta!")
            print("voce apostou em",self.bettedwinningTeam)
            return False

class CompoundedBet(Bet):
    def __init__(self, game, user_id,betted_result=None,betted_amount=0):
        super().__init__(game, user_id,betted_result,betted_amount)
        #betted_result é uma lista de apostas
        self.betted_result = []
    def resolve_bet(self):
        print("resolvendo aposta")
        result = self._game.get_result()
        for bet in self.betted_result:
            result= bet.resolve_bet()
            if result==False:
                print("Que pena! Você perdeu a aposta! compound")
                return False
            else:
                self._betted_amount+=bet._betted_amount
        print("Parabéns! Você ganhou a aposta! compound")
        print("ganhou",self._betted_amount)
        return True,self._betted_amount 
    def addBet(self,bet):
        self.betted_result.append(bet)

class AtributeBet(Bet):
    def __init__(self, game, betted_result=None,betted_amount=0):
        super().__init__(game, betted_result,betted_amount)
        #betted_result é um dicionarío com os atributos e valores que o usuário apostou
        self.betted_result = betted_result
    def resolve_bet(self):
        print("resolvendo aposta")
        print("beted result", self.betted_result)
        result = self._game.get_result()
        
        for key, nested_dict in self.betted_result.items():
            if key not in result:
                print("Que pena! Você perdeu a aposta!")
                return False
            for nested_key, nested_value in nested_dict.items():
                if nested_key not in result[key] or result[key][nested_key] != nested_value:
                    print("Que pena! Você perdeu a aposta!")
                    return False
        
        print("Parabéns! Você ganhou a aposta!")
        return True,self._betted_amount
 