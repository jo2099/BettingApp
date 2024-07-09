#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Jul  9 09:22:00 2024

@author: simoes
"""

from flask import Flask, request, jsonify

app = Flask(__name__)

# Dicionário de exemplo para armazenar usuários
users = {
    'moacir': {'password': '123456', 'attribute': 10},
    'jefferson': {'password': '123456', 'attribute': 20},
    'joao': {'password': '123456', 'attribute': 25},
    'everton': {'password': '123456', 'attribute': 30}
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and users[username]['password'] == password:
        user_attribute = users[username]['attribute']
        return jsonify({'status': 'success', 'message': 'Login successful', 'attribute': user_attribute}), 200
    else:
        return jsonify({'status': 'fail', 'message': 'Invalid username or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    attribute = data.get('attribute')

    if not username or not password:
        return jsonify({'status': 'fail', 'message': 'Username and password are required'}), 400

    if username in users:
        return jsonify({'status': 'fail', 'message': 'Username already exists'}), 400

    users[username] = {'password': password, 'attribute': attribute}
    return jsonify({'status': 'success', 'message': 'User registered successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
