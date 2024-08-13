from flask import Flask, request, jsonify
from Data.DataService import DataService
from Data.schemas.UserSchema import UsuarioSchema
from Data.Models.UsuarioModel import Usuario
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

def get_teams():
    teams = DataService.getDB_teams()
    return jsonify(teams)

def add_user(user:dict):
    return DataService.addDB_user(user)

def Login(email, password):
    users=DataService.getDB_users()
    userschema = UsuarioSchema(many=True)
    users = userschema.dump(users)
    for user in users:
        print("User: ",user)
        if user['email'] == email and user['senha'] == password:
            acess_token = create_access_token(identity=email)
            return jsonify({'status': 'success', 'message': 'Login successful', 'token':acess_token,'id':user['id'],'coins':user['saldo']}), 200
    return jsonify({'status': 'fail', 'message': 'Invalid username or password', 'token':''}), 401
    
def setCoins(user_id, coins):
    user = DataService.getDBModel(user_id)
    
    user.saldo = coins
    # Chama a função para atualizar o usuário no banco de dados
    update_result = DataService.updateDB_user(user)
    
    return jsonify({'message': update_result['message']}), 200

def addCoins(user_id, coins):
    from main import app
    with app.app_context():
        user = DataService.getDBModel(user_id)
    
        user.saldo += coins
        # Chama a função para atualizar o usuário no banco de dados
        update_result = DataService.updateDB_user(user)
    
        return jsonify({'message': update_result['message']}), 200

def removeCoins(user_id, coins):
    from main import app
    with app.app_context():
        user = DataService.getDBModel(user_id)

        user.saldo -= coins
        # Chama a função para atualizar o usuário no banco de dados
        update_result = DataService.updateDB_user(user)
    
        return jsonify({'message': update_result['message']}), 200

def getCoins(user_id):
    user = DataService.getDB_user(user_id)
    if(user == None):
        return jsonify({'message': 'Usuario nao encontrado'}), 404
    print("USER",user)
    return jsonify({'coins': user['saldo']}), 200