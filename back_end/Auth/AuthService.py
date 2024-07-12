from Data.DataService import readUsers, writeUsers
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token

def Login(username, password):

    users=readUsers();

    if username in users and users[username]['password'] == password:
        user_attribute = users[username]['attribute']
        acess_token = create_access_token(identity=username)
        return jsonify({'status': 'success', 'message': 'Login successful', 'attribute': user_attribute, 'token':acess_token}), 200
    else:
        return jsonify({'status': 'fail', 'message': 'Invalid username or password', 'token':''}), 401
    
def Register(username,password):
    users=readUsers();
    if not username or not password:
        return jsonify({'status': 'fail', 'message': 'Username and password are required'}), 400

    if username in users:
        return jsonify({'status': 'fail', 'message': 'Username already exists'}), 400

    users[username] = {'password': password, 'attribute': 0}

    writeUsers(users);

    return jsonify({'status': 'success', 'message': 'User registered successfully'}), 201