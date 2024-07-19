from abc import ABC,abstractmethod
import random

class Event(ABC):
    def __init__(self,Game):
        self._game=Game

    def get_Game(self):
        return self._game


    @abstractmethod
    def activate(self):
        pass



class Score(Event):
    def activate(self):
        # Puxa um time do Game aleatoriamente
        team = random.choice([self._game.get_time1(), self._game.get_time2()])
        print("score! do time ",team)
        if team == self._game.get_time1():
            new_score = self._game.get_score1() + 1
            self._game.set_score1(new_score)
        else:
            new_score = self._game.get_score2() + 1
            self._game.set_score2(new_score)
        print(f"Score updated: Team 1: {self._game.get_score1()}, Team 2: {self._game.get_score2()}")


class Fault(Event):
    def activate(self):
        team=random.choice([self._game.get_time1(),self._game.get_time2()])
        print("falta do time ",team)
        if team==self._game.get_time1():
            new_faltas=self._game.get_faltas1()+1
            self._game.set_faults1(new_faltas)
        else:
            new_faltas=self._game.get_faltas2()+1
            self._game.set_faults2(new_faltas)



def create_random_event(game):
    return random.choice([Score(game), Fault(game)])