from Data.DB import db

class RewardModel(db.Model):

    __tablename__ = 'rewards'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    rewardtitle = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    def __repr__(self):
        return f'<Reward {self.reward}>'
    
    def __init__(self, user_id, rewardtitle,price):
        self.user_id = user_id
        self.rewardtitle = rewardtitle
        self.price = price