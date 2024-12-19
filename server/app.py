#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response 
from flask_migrate import Migrate
from flask_restful import Api, Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import Park , Hiker, Trail
from flask_cors import CORS

CORS(app)


# Views go here!

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'

class Parks(Resource):
    def get(self):
        # breakpoint()
        parks = [park.to_dict() for park in Park.query.all()]
        return parks, 200

class Hikers(Resource):
    def get(self):
        hikers = [hiker.to_dict() for hiker in Hiker.query.all()]
        return hikers, 200
    
class Trails(Resource):
    def get(self):
        trails = [trail.to_dict() for trail in Trail.query.all()]
        return trails, 200
              
class ParkDetail(Resource):
    def get(self, park_id):
        park = [park.to_dict() for park in Park.query.get(park_id)]
        return park, 200
      

api.add_resource(Parks, '/parks')
api.add_resource(Hikers, '/hikers')
api.add_resource(Trails, '/trails')
api.add_resource(ParkDetail, '/park/<int:park_id>')




# api.add_resource(TrailsForPark, '/park/<int:park_id>/trails')
# api.add_resource(ParkDetail, '/park/<int:park_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

# class TrailsForPark(Resource):
#     def get(self, park_id):
#             try:
#                 trails = Trail.query.filter_by(park_id=park_id).all()
#                 if not trails:
#                     return make_response({"message": "no trails found for this park."}, 404)
#                 print(f"Fetched trails: {trails}")
                
#                 trails_response = [trail.to_dict() for trail in trails]
#                 return make_response(trails_response, 200)
            
#             except Exception as e:
#                 print(f"Error fetching trails for park {park_id}: {str(e)}")
#                 return make_response({"message": "An error occurred while fetching trails."}, 500)

# class ParkDetail(Resource):
#     def get(self, park_id):
#         try:
#             # Fetch the park by ID
#             park = Park.query.get(park_id)
#             if not park:
#                 return make_response({"message": "Park not found"}, 404)
            
#             # Fetch trails for the selected park
#             trails = Trail.query.filter_by(park_id=park_id).all()
#             trails_response = [trail.to_dict() for trail in trails]

#             # Construct the response: return park data along with the trails
#             park_response = park.to_dict()
#             park_response['trails'] = trails_response

#             return make_response(park_response, 200)
#         except Exception as e:
#             print(f"Error fetching park and trails for park {park_id}: {str(e)}")
#             return make_response({"message": "An error occurred while fetching the park details."}, 500)
  