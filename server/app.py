#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response 
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Park
from flask_cors import CORS
from datetime import datetime

CORS(app)


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Parks(Resource):
    def get(self):
        parks = [park.to_dict() for park in Park.query.all()]
        return make_response(parks, 200)

print("hello")

api.add_resource(Parks, '/parks')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

