from flask import Flask, request, jsonify
from Data.DataService import readUsers
def get_users(search=None):
    users = readUsers()
    if search:
        users = [user for user in users if search in user]
    return jsonify(users)