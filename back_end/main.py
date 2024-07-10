from flask import Flask,Blueprint, request, jsonify
from flask_cors import CORS
from Auth.authController import auth_bp
app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/auth')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

