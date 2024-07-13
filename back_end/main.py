from flask import Flask,Blueprint, request, jsonify
from flask_cors import CORS
from Auth.authController import auth_bp
from UserManagement.UserController import user_bp
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from Data.DataService import DataService
import os

app = Flask(__name__)
CORS(app)

load_dotenv()
DataService.initService(app)

app.config['JWT_SECRET_KEY']=os.getenv('JWT_SECRET_KEY')
jwt = JWTManager(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

# app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(user_bp, url_prefix='/user')
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

