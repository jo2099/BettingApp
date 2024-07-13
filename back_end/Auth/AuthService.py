from Data.DataService import DataService
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token

def Login(username, password):

    users=DataService.getDB_users()

    if username in users and users[username]['password'] == password:
        user_attribute = users[username]['attribute']
        acess_token = create_access_token(identity=username)
        return jsonify({'status': 'success', 'message': 'Login successful', 'attribute': user_attribute, 'token':acess_token}), 200
    else:
        return jsonify({'status': 'fail', 'message': 'Invalid username or password', 'token':''}), 401
    
def Register(username,password):
    res=DataService.addDB_user({'nome':username,'email':username,'senha':password})

    users[username] = {'password': password, 'attribute': 0}


    return jsonify({'status': 'success', 'message': 'User registered successfully'}), 201