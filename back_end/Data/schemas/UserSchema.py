from marshmallow import Schema, fields  
     
class UsuarioSchema(Schema):
    id = fields.Integer(dump_only=True)
    nome = fields.Str(required=True)
    email = fields.Str(required=True)
    senha = fields.Str(required=True)
    tipo =  fields.Integer(dump_only=True)
    saldo = fields.Decimal(required=True)   #saldo para apostadores podemos definir null para os outros usuarios 

class TimeSchema(Schema):
    id = fields.Integer(dump_only=True)
    recompensas_fornecidas = fields.List(fields.Integer(), required=True)  
    favoritado_por = fields.List(fields.Integer(), required=True)    

class RecompensaSchema(Schema):                   
    id = fields.Integer(dump_only=True)
    nome = fields.Str(required=True)
    valor = fields.Decimal(required=True)  # valor para a compra da recompensa?
    fornecido_por = fields.Integer(dump_only=True)

class ApostaSchema(Schema):
    id = fields.Integer(dump_only=True)
    time_ganhador = fields.Integer(dump_only=True)
    numero_cartoes_amarelos = fields.Integer(dump_only=True)       # se houver cartões se não 0 pode ser usado
    numero_cartoes_vermelhos = fields.Integer(dump_only=True)
    placar = fields.Str(dump_only=True)
    jogo = fields.Str(required=True)
    apostado_por = fields.List(fields.Integer(), required=True)    