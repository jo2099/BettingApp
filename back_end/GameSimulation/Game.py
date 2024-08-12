from abc import ABC, abstractmethod
import time
import random
import threading
from .GameController import send_direct
from utils.Publisher import Publisher
from BettingManegement.Bet import *
import uuid     
import json

messages_lock = threading.Lock()

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
        #gera um id unico para o jogo
        self.id=uuid.uuid4()

    def get_num_tempos(self):
        return self._num_tempos

    def getduracoes_tempos_segundos(self):
        return self.duracoes_tempos_segundos

    def get_time1(self):
        return self._time1

    def get_time2(self):
        return self._time2
    
    def get_timer(self):
        return self._timer
    
    def get_id(self):
        return self.id

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

    def get_tipo(self):
        return self.tipo

    def get_score2(self):
        return self._score2

    def start(self):
        # print("O jogo começou")
        ...
        # message={"event":"start_game"
        #          ,"details":{
        #              "id":str(self.id),
        #              "time1":str(self._time1),
        #              "time2":str(self._time2),
        #              "tipo":self.tipo,
        #              "duracoes_tempos_segundos":str(self.duracoes_tempos_segundos),
        #              "tempos_intervalos":str(self._tempos_intervalos)
        #          }}
        # json_message=json.dumps(message)
        # print("MANDANDO START GAME")
        # with messages_lock:
        #     send_direct(json_message)

    def stop(self, tempo_parado=0):
        # print("O jogo parou")
        # message={
        #     "event":"stop_game",
        #     "details":{
        #         "id":str(self.id),
        #         "time1":str(self._time1),
        #         "time2":str(self._time2),
        #         "tipo":self.tipo,
        #     }}
        # json_message=json.dumps(message)
        # with messages_lock:
        #     send_direct(json_message)
        time.sleep(tempo_parado)
        

    def end(self):
        # print(self.get_result())
        # print("O jogo acabou")
        super().notify(list(["end",self]))

    def update(self, prob_event):
        
        self._timer += 1
        # trigger_timer_update(str(self.id), self._timer)
        
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
        # super().notify(list(["timer"]))        
        # send_direct(str(self.id),json_message)
        #manda uma request para localhost:5000/send_message


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

    def tojson(self):
        return {"id":str(self.id),"time1":str(self._time1),"time2":str(self._time2),"tipo":self.tipo,"score1":str(self._score1),"score2":str(self._score2),"faltas1":str(self._faltas1),"faltas2":str(self._faltas2),"timer":str(self._timer)}



class Futebol(Game):
    def __init__(self, time1,time2,duracoes_tempos_segundos=[20,20],tempos_intervalos=[8]):
        self.tipo="futebol"
        super().__init__(time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        self.cartoes={"amarelo":{"time1":0,"time2":0},"vermelho":{"time1":0,"time2":0}}
    

    def falta(self,time):
        if time==1:
            self._faltas1+=1
        else:
            self._faltas2+=1
  
        if random.randint(0,100)<80:
            if random.randint(0,100)<80:
                self.cartoes["amarelo"][f"time{time}"]+=1
                
            else:
                self.cartoes["vermelho"][f"time{time}"]+=1

    def score(self,time):

        if time==1:
            self._score1+=1
            score=self._score1
        else:
            self._score2+=1
            score=self._score2
        with messages_lock:
            send_direct(json.dumps({"event":"score","details":{"id":str(self.id),"time":time,"score":str(score)}}))


    def event(self):
        evento = random.choice(["falta", "score"])
        if evento == "falta":
            time_falta=random.choice([1,2])
            self.falta(time_falta)
        else:  # evento == "score"
            time_score = random.choice([1, 2])
            self.score(time_score)
        super().notify(list([evento]))

    def get_result(self):
        result={"time1":{"nome":self._time1,"score":self._score1,"numFaltas":self._faltas1,"amarelos":self.cartoes["amarelo"]["time1"],"vermelhos":self.cartoes["vermelho"]["time1"]},
                "time2":{"nome":self._time2,"score":self._score2,"numFaltas":self._faltas2,"amarelos":self.cartoes["amarelo"]["time2"],"vermelhos":self.cartoes["vermelho"]["time2"]}}
        return result
    
    def simulate(self):
        # print("Iniciando a simulação")
        self.start()
        while self._timer < sum(self.duracoes_tempos_segundos):
            self.update(20)
        self.end()


class Basquete(Game):
    def __init__(self, time1,time2,duracoes_tempos_segundos=[12,12,12,12],tempos_intervalos=[5,5,5]):
        super().__init__(time1,time2,duracoes_tempos_segundos,tempos_intervalos)
        self.cestas={"time1":{"1":0,"2":0,"3":0,"enterradas":0},"time2":{"1":0,"2":0,"3":0,"enterradas":0}}
        self.tipo="basquete"

    def get_result(self):
        result={"time1":{"nome":self._time1,"score":self._score1, "numFaltas":self._faltas1,"1":self.cestas["time1"]["1"],"2":self.cestas["time1"]["2"],"3":self.cestas["time1"]["3"],"enterradas":self.cestas["time1"]["enterradas"]},
                "time2":{"nome":self._time2,"score":self._score2, "numFaltas":self._faltas2,"1":self.cestas["time2"]["1"],"2":self.cestas["time2"]["2"],"3":self.cestas["time2"]["3"],"enterradas":self.cestas["time2"]["enterradas"]}}
        return result
    
    def falta(self,time):
        if time==1:
            self._faltas1+=1
        else:
            self._faltas2+=1
        # print("falta do time ",time)

    def score(self,time):
        opcoes_pontuacao=[3,2,1]
        probs=[20,30,40]
        pontuacao_selecionada=random.choices(opcoes_pontuacao,weights=probs,k=1)[0]
        score=0
        if time==1:
            # print("cesta de ",pontuacao_selecionada,"para o time 1")
            self._score1+=pontuacao_selecionada
            score=self._score1
        else:
            # print("cesta de ",pontuacao_selecionada,"para o time 2")
            self._score2+=pontuacao_selecionada
            score=self._score2
        self.cestas[f"time{time}"][f"{pontuacao_selecionada}"]+=1
        if pontuacao_selecionada == 2:
            #chance de ser uma enterrada
            if random.randint(0,100)<20:
                # print("Enterrada!")
                self.cestas[f"time{time}"]["enterradas"]+=1
        with messages_lock:
            send_direct(json.dumps({"event":"score","details":{"id":str(self.id),"time":time,"score":str(score)}}))
        
        

    def event(self):
        evento = random.choice(["falta", "score","toco","enterrada"])
        if evento == "falta":
            time_falta=random.choice([1,2])
            self.falta(time_falta)
        else:  # evento == "score"
            time_score = random.choice([1, 2])
            self.score(time_score)
        super().notify(list([evento]))
    
    def simulate(self):
        # print("Iniciando a simulação")
        self.start()
        while self._timer < sum(self.duracoes_tempos_segundos):
            self.update(60)
        self.end()

    

# jogoteste = Futebol("Brasil","Argentina",[10],[])
# jogoBasquete=Basquete("Lakers","Bulls",[5,5,5,5],[2,2,2])
# bet=CompoundedBet(jogoteste,[WinningBet(jogoteste,"Brasil")],200)
# jogoteste.add_subscriber(bet)
# jogoteste.simulate()

# bet=CompoundedBet(jogoBasquete,[WinningBet(jogoBasquete,"Lakers")])
# jogoBasquete.add_subscriber(bet)
# jogoBasquete.simulate()