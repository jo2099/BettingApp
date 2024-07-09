#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jul  9 09:22:00 2024

@author: simoes
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dicionário de exemplo para armazenar usuários
users = {
    'moacir': {'password': '123456', 'attribute': 10},
    'jefferson': {'password': '123456', 'attribute': 20},
    'joao': {'password': '123456', 'attribute': 25},
    'everton': {'password': '123456', 'attribute': 30},
    'teste': {'password': '123456' , 'attribute': None}
}

def readusers():
    users = {}
    with open('users.txt', 'r') as f:
        for line in f:
            user, pwd, attr = line.strip().split(',')
            users[user] = {'password': pwd, 'attribute': int(attr)}
    f.close();
    return users;

def writeusers(users):
    with open('users.txt', 'w') as f:
        for user in users:
            # se o campo attribute for None, escreve 0
            if users[user]['attribute'] == None:
                users[user]['attribute'] = -1
            f.write(f"{user},{users[user]['password']},{users[user]['attribute']}\n")
    f.close();

writeusers(users);

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')

    users=readusers();

    if username in users and users[username]['password'] == password:
        user_attribute = users[username]['attribute']
        return jsonify({'status': 'success', 'message': 'Login successful', 'attribute': user_attribute}), 200
    else:
        return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')
    attribute = data.get('attribute')

    users=readusers();

    if not username or not password:
        return jsonify({'status': 'fail', 'message': 'Username and password are required'}), 400

    if username in users:
        return jsonify({'status': 'fail', 'message': 'Username already exists'}), 400

    users[username] = {'password': password, 'attribute': attribute}
  
    writeusers(users);

    return jsonify({'status': 'success', 'message': 'User registered successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
