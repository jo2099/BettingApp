from dotenv import load_dotenv
from Data.Models.UsuarioModel import Usuario
from Data.Models.BetModel import BetModel
from Data.Models.RewardModel import RewardModel
from Data.DB import db
import os


class DataService:
    def __init__ (self, app):
        load_dotenv()
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(app)

    @staticmethod
    def initService(app):
        load_dotenv()
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(app)
    
    @staticmethod
    def getDB_users():
        users = Usuario.query.all()
        print("USERS",users)
        return users
    
    @staticmethod
    def addDB_user( user:dict):
        existing_user = Usuario.query.filter_by(email=user['email']).first()
        if existing_user:
            raise Exception('Usuario ja existe')

        new_user = Usuario(nome=user['nome'], email=user['email'], senha=user['senha'], tipo_usuario=user['tipo_usuario'])
        db.session.add(new_user)
        db.session.commit()
        return {'message':'Usuario adicionado com sucesso!'}
        
    @staticmethod    
    def removeDB_user(user):
        db.session.delete(user)
        db.session.commit()
        return {'message':'Usuario removido com sucesso!'}
    
    @staticmethod
    def readUsers():
        with open('./Data/users.txt', 'r') as f:
            users = {}
            for line in f:
                user, pwd, attr = line.strip().split(',')
                users[user] = {'password': pwd, 'attribute': int(attr)}
        f.close()
        return users
    
    @staticmethod
    def writeUsers( users):
        with open('./Data/users.txt', 'w') as f:
            for user in users:
                # se o campo attribute for None, escreve 0
                if users[user]['attribute'] == None:
                    users[user]['attribute'] = -1
                f.write(f"{user},{users[user]['password']},{users[user]['attribute']}\n")
        f.close()

    @staticmethod
    def addBet(bet):
        from main import app
        with app.app_context():
            new_bet = BetModel(user_id=bet['user_id'], game_id=bet['game_id'], bet=bet['bet'], betted=bet['betted'],result=bet['result'],team1=bet['team1'],team2=bet['team2'],date=bet['date'],won=bet['won'])
            db.session.add(new_bet)
            db.session.commit()
            return {'message':'Aposta adicionada com sucesso!'}

    @staticmethod
    def getBets(user_id):
        bets = BetModel.query.filter_by(user_id=user_id).all()
        bets=[bet.__dict__ for bet in bets]
        return bets

    @staticmethod
    def getRewards(team_id):
        rewards= RewardModel.query.filter_by(user_id=team_id).all()
        rewards=[reward.__dict__ for reward in rewards]
        print(rewards)
        for reward in rewards:
            reward.pop('_sa_instance_state')
        return rewards

    @staticmethod
    def addReward(team_id,rewardTitle:str,price:float):
        new_reward=RewardModel(user_id=team_id,rewardtitle=rewardTitle,price=price)
        db.session.add(new_reward)
        db.session.commit()
        return {'message':'Recompensa adicionada com sucesso!'}
    
    @staticmethod
    def getDB_teams():
        teams = Usuario.query.filter_by(tipo_usuario="time").all()
        teams=[team.__dict__ for team in teams]
        for team in teams:
            team.pop('_sa_instance_state')
            team.pop('senha')
            team.pop('tipo_usuario')
            team.pop('email')
        print("TIMES",teams)
        return teams