from abc import ABC, abstractmethod
import time
import random
import threading
from utils.Observer import Observer
from utils.Publisher import Publisher

class Bet(Observer):
    def __init__(self,game,betted_result=None,betted_amount=0):
        self._game=game
        self._betters=[]
        self._betted_amount=betted_amount

    def add_betters(self,better):
        self._betters.append(better)

    def remove_betters(self,better):
        self._betters.remove(better)

    def resolve_bet(self):
        print("resolvendo apostas")
        result=self._game.get_result()
                
    def update(self,message):
        if message=="score":
            print("betters notified score")
        elif message=="end":
            print("betters notified end")
            print(self._game.get_result())
            self.resolve_bet()

class WinningBet(Bet):
    def __init__(self, game, betted_result=None,betted_amount=0):
        super().__init__(game, betted_result,betted_amount)
        self.bettedwinningTeam = betted_result
    def resolve_bet(self):
        print("resolvendo aposta")
        result=self._game.get_result()
        #considera empate
        if result["time1"]["score"]==result["time2"]["score"]:
            winningTeam="Empate"
        elif result["time1"]["score"]>result["time2"]["score"]:
            winningTeam=result["time1"]["nome"]
        else:
            winningTeam=result["time2"]["nome"]
        
        if winningTeam== self.bettedwinningTeam:
            print("Parabéns! Você ganhou a aposta! winnig")
            return True,self._betted_amount
        else:
            print("Que pena! Você perdeu a aposta!")
            return False

class CompoundedBet(Bet):
    def __init__(self, game, betted_result=None,betted_amount=0):
        super().__init__(game, betted_result,betted_amount)
        #betted_result é uma lista de apostas
        self.betted_result = betted_result
    def resolve_bet(self):
        print("resolvendo aposta")
        result = self._game.get_result()
        for bet in self.betted_result:
            if bet.resolve_bet()==False:
                print("Que pena! Você perdeu a aposta! compound")
                return False
        print("Parabéns! Você ganhou a aposta! compound")
        print("ganhou",self._betted_amount)
        return True,self._betted_amount

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
        


class Game(ABC,Publisher):
    def __init__(self, time1,time2,duracoes_tempos_segundos=[10,10],tempos_intervalos=[5]):
        super().__init__()
        self._num_tempos =len(duracoes_tempos_segundos)
        self.duracoes_tempos_segundos = duracoes_tempos_segundos
        self._time1 = time1
        self._time2 = time2
        self._tempos_intervalos = tempos_intervalos
        self._score1 = 0
        self._score2 = 0
        self._faltas1=0
        self._faltas2=0
        self.periodo_atual=0
        self._timer=0
        self.em_intervalo=False

    def get_num_tempos(self):
        return self._num_tempos

    def getduracoes_tempos_segundos(self):
        return self.duracoes_tempos_segundos

    def get_time1(self):
        return self._time1

    def get_time2(self):
        return self._time2

    def get_tempos_intervalos(self):
        return self._tempos_intervalos

    def get_score1(self):
        return self._score1

    def get_score2(self):
        return self._score2
    
    def get_faltas1(self):
        return self._faltas1
    
    def get_faltas2(self):
        return self._faltas2

    
    def get_score1(self):
        return self._score1

    
    def get_score2(self):
        return self._score2

    def start(self):
        print("O jogo começou")

    def stop(self, tempo_parado=0):
        print("O jogo parou")
        time.sleep(tempo_parado)

    def end(self):
        # print(self.get_result())
        print("O jogo acabou")
        super().notify("end")

    def update(self, prob_event):
        # Atualiza timer
        self._timer += 1
        print(self._timer)
        # Faz a lógica dos intervalos
        intervalo = self.periodo_atual < self._num_tempos and self._timer == sum(self.duracoes_tempos_segundos[:self.periodo_atual+1])
        if intervalo:
            # Verifica se o índice está dentro do range da lista antes de acessar
            if self.periodo_atual < len(self._tempos_intervalos):
                self.stop(self._tempos_intervalos[self.periodo_atual])
            self.periodo_atual += 1
        else:
            # chance de 20% de evento
            if random.randint(0, 100) <= prob_event:
                self.event()
        time.sleep(1)

    
    @abstractmethod
    def get_result(self):
        pass

    @abstractmethod
    def falta(self,time):
        pass

    @abstractmethod
    def score(self,time):
        pass

    @abstractmethod
    def event(self):
        pass



class Futebol(Game):
    def __init__(self, time1,time2,duracoes_tempos_segundos=[10,10],tempos_intervalos=[5]):
        super().__init__(time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        self.cartoes={"amarelo":{"time1":0,"time2":0},"vermelho":{"time1":0,"time2":0}}
    

    def falta(self,time):
        if time==1:
            self._faltas1+=1
        else:
            self._faltas2+=1
  
        if random.randint(0,100)<80:
            if random.randint(0,100)<80:
                print("Falta! Cartão amarelo para o time ",time)
                self.cartoes["amarelo"][f"time{time}"]+=1
                
            else:
                print("Falta! Cartão vermelho para o time ",time)
                self.cartoes["vermelho"][f"time{time}"]+=1
        else:
            print("falta sem cartão para o time",time)    


    def score(self,time):
        if time==1:
            print("Gol do time 1: ",self._time1)
            self._score1+=1
        else:
            print("Gol do time 2: ",self._time2)
            self._score2+=1


    def event(self):
        evento = random.choice(["falta", "score"])
        if evento == "falta":
            time_falta=random.choice([1,2])
            self.falta(time_falta)
        else:  # evento == "score"
            time_score = random.choice([1, 2])
            self.score(time_score)
        super().notify(evento)

    def get_result(self):
        result={"time1":{"nome":self._time1,"score":self._score1,"numFaltas":self._faltas1,"amarelos":self.cartoes["amarelo"]["time1"],"vermelhos":self.cartoes["vermelho"]["time1"]},
                "time2":{"nome":self._time2,"score":self._score2,"numFaltas":self._faltas2,"amarelos":self.cartoes["amarelo"]["time2"],"vermelhos":self.cartoes["vermelho"]["time2"]}}
        return result
    
    def simulate(self):
        print("Iniciando a simulação")
        self.start()
        while self._timer < sum(self.duracoes_tempos_segundos):
            self.update(20)
        self.end()


class Basquete(Game):
    def __init__(self, time1,time2,duracoes_tempos_segundos=[10,10],tempos_intervalos=[5]):
        super().__init__(time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        self.cestas={"time1":{"1":0,"2":0,"3":0,"enterradas":0},"time2":{"1":0,"2":0,"3":0,"enterradas":0}}

    def get_result(self):
        result={"time1":{"nome":self._time1,"score":self._score1, "numFaltas":self._faltas1,"1":self.cestas["time1"]["1"],"2":self.cestas["time1"]["2"],"3":self.cestas["time1"]["3"],"enterradas":self.cestas["time1"]["enterradas"]},
                "time2":{"nome":self._time2,"score":self._score2, "numFaltas":self._faltas2,"1":self.cestas["time2"]["1"],"2":self.cestas["time2"]["2"],"3":self.cestas["time2"]["3"],"enterradas":self.cestas["time2"]["enterradas"]}}
        return result
    
    def falta(self,time):
        if time==1:
            self._faltas1+=1
        else:
            self._faltas2+=1
        print("falta do time ",time)

    def score(self,time):
        opcoes_pontuacao=[3,2,1]
        probs=[20,30,40]
        pontuacao_selecionada=random.choices(opcoes_pontuacao,weights=probs,k=1)[0]
        if time==1:
            print("cesta de ",pontuacao_selecionada,"para o time 1")
            self._score1+=pontuacao_selecionada
        else:
            print("cesta de ",pontuacao_selecionada,"para o time 2")
            self._score2+=pontuacao_selecionada
        self.cestas[f"time{time}"][f"{pontuacao_selecionada}"]+=1
        if pontuacao_selecionada == 2:
            #chance de ser uma enterrada
            if random.randint(0,100)<20:
                print("Enterrada!")
                self.cestas[f"time{time}"]["enterradas"]+=1
        

    def event(self):
        evento = random.choice(["falta", "score","toco","enterrada"])
        if evento == "falta":
            time_falta=random.choice([1,2])
            self.falta(time_falta)
        else:  # evento == "score"
            time_score = random.choice([1, 2])
            self.score(time_score)
        super().notify(evento)
    
    def simulate(self):
        print("Iniciando a simulação")
        self.start()
        while self._timer < sum(self.duracoes_tempos_segundos):
            self.update(60)
        self.end()

    

jogoteste = Futebol("Brasil","Argentina",[10],[])
jogoBasquete=Basquete("Lakers","Bulls",[5,5,5,5],[2,2,2])
bet=CompoundedBet(jogoteste,[WinningBet(jogoteste,"Brasil")],200)
jogoteste.add_subscriber(bet)
jogoteste.simulate()

# bet=CompoundedBet(jogoBasquete,[WinningBet(jogoBasquete,"Lakers")])
# jogoBasquete.add_subscriber(bet)
# jogoBasquete.simulate()