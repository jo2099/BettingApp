from Data.DB import db

class BetModel(db.Model):
    __tablename__ = 'bets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    game_id = db.Column(db.String(120), nullable=False)
    bet = db.Column(db.String(120), nullable=False)
    result = db.Column(db.String(120), nullable=False)
    team1 = db.Column(db.String(120), nullable=False)
    team2 = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    won = db.Column(db.Boolean, nullable=False)
    def __repr__(self):
        return f'<Bet {self.bet}>'
    
    def __init__(self, user_id, game_id, bet, result,team1,team2,date,won):
        self.user_id = user_id
        self.game_id = game_id
        self.bet = bet
        self.result = result
        self.team1 = team1
        self.team2 = team2
        self.date = date
        self.won = won