from Data.DB import db


class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(120), nullable=False)
    tipo_usuario= db.Column(db.String(120), nullable=False)
    saldo = db.Column(db.Float, nullable=True)
    def __repr__(self):
        return f'<Usuario {self.nome}>'
    
    def __init__(self, nome, email, senha,tipo_usuario,saldo):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.tipo_usuario = tipo_usuario
        self.saldo = saldo

