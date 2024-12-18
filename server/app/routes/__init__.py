from flask import Blueprint
from flask_cors import cross_origin

api = Blueprint('api', __name__)

from app.routes import predict, logs, export

@api.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    return {'message': 'pong'}, 200