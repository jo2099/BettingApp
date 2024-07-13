from marshmallow import Schema, fields  
     
class UsuarioSchema(Schema):
    id = fields.Integer(dump_only=True)
    nome = fields.Str(required=True)
    email = fields.Str(required=True)
    senha = fields.Str(required=True)