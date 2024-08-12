from back_end.utils.Observer import Observer

#classe que mantém as bets ativas e serve como mediator entre as bets e o frontEnd
#front end manda request para o BetController e ativa a funcao add_better do BetManager que recebe o game e o id do usuario 
class BetManager(Observer):
    ...