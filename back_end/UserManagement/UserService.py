from flask import Flask, request, jsonify
from Data.DataService import DataService
from Data.schemas.UserSchema import UsuarioSchema
from flask_jwt_extended import create_access_token

def get_users(search=None):
    #users=[{'id':1,'name':'Joao','email':'','senha':''}]
    usersDB = DataService.getDB_users()
    print(usersDB)
    if search:
        usersDB = [user for user in usersDB if search in user['nome']]
        ...  
    userschema = UsuarioSchema(many=True)
    users = userschema.dump(usersDB)
    return jsonify(users)

def add_user(user:dict):
    return DataService.addDB_user(user)

def Login(email, password):

    users=DataService.getDB_users()
    userschema = UsuarioSchema(many=True)
    users = userschema.dump(users)
    for user in users:
        if user['email'] == email and user['senha'] == password:
            acess_token = create_access_token(identity=email)
            return jsonify({'status': 'success', 'message': 'Login successful', 'token':acess_token}), 200
    return jsonify({'status': 'fail', 'message': 'Invalid username or password', 'token':''}), 401
    