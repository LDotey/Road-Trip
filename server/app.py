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
    
    def post(self):
        data = request.get_json()
        new_park = Park(
            name=data["name"],
            image=data["image"],
            state=data["state"]
        )
        db.session.add(new_park)
        db.session.commit()

        return new_park.to_dict(), 201

class Hikers(Resource):
    def get(self):
        hikers = [hiker.to_dict() for hiker in Hiker.query.all()]
        return hikers, 200
    
    def post(self):
        data = request.get_json()
        new_hiker = Hiker(
            name=data["name"],
            # email=data["email"],
            skill_level=data["skill_level"]
        )
        db.session.add(new_hiker)
        db.session.commit()

        return new_hiker.to_dict(), 201
    
    def patch(self, id):
        data = request.get_json()
        hiker = Hiker.query.get(id)
        if not hiker:
            return {"error": "Hiker not found"}, 404

        # Update hiker details
        hiker.name = data.get("name", hiker.name)
        hiker.skill_level = data.get("skill_level", hiker.skill_level)

        # update trails if provided
        if "trails" in data:
            hiker.trails = []  
            for trail_data in data["trails"]:
                trail = Trail.query.get(trail_data["id"])  
                if trail:
                    hiker.trails.append(trail)  

        db.session.commit()
        return hiker.to_dict(), 200
   
    # def delete(self, id):
    #     try:
    #         # Fetch the hiker to delete
    #         hiker_to_delete = Hiker.query.get(id)
    #         if not hiker_to_delete:
    #             return {'message': 'Hiker not found'}, 404

    #         # Detach the trails associated with the hiker
    #         for trail in hiker_to_delete.trails:
    #             trail.hiker.id = None  # Set hiker_id to None to detach the trail
    #         db.session.commit()  # Commit the changes

    #         # Now delete the hiker
    #         db.session.delete(hiker_to_delete)
    #         db.session.commit()

    #         return {'message': 'Hiker deleted successfully'}, 200
    #     except Exception as e:
    #         db.session.rollback()
    #         return {'message': f'Error deleting hiker: {str(e)}'}, 500

    def delete(self, id):
        hiker = Hiker.query.filter_by(id=id).first()
        
        if not hiker:
            return {"error": "Hiker not found"}, 404
        
        db.session.delete(hiker)
        db.session.commit()
        
        return {"message": "Hiker deleted successfully"}, 200

    
class Trails(Resource):
    def get(self):
        trails = [trail.to_dict() for trail in Trail.query.all()]
        return trails, 200
    
    def post(self):
        try:
            data = request.get_json()
            print("Received data:", data)

            new_trail = Trail(
                name=data["name"],
                difficulty=data["difficulty"],
                dog_friendly=data["dog_friendly"],
                park_id = data["park_id"],
                hiker_id = data["hiker_id"]
                )
            db.session.add(new_trail)
            db.session.commit()

            return new_trail.to_dict(), 201
        except KeyError as e:
                return {'error':f'Missing key: {str(e)}'}, 500
        
    def patch(self, id):
        # Update an existing trail
        data = request.get_json()
        # breakpoint()
        trail = Trail.query.get(id)
        if not trail:
            return {"error": "Trail not found"}, 404
        
        # Update trail details
        trail.name = data.get("name", trail.name)
        trail.difficulty = data.get("difficulty", trail.difficulty)
        trail.dog_friendly = data.get("dog_friendly", trail.dog_friendly)
        trail.park_id = data.get("park_id", trail.park_id)
        trail.hiker_id = data.get("hiker_id", trail.hiker_id)

        db.session.commit()

        return trail.to_dict(), 200
    
    def delete(self, id):
        # Delete a trail by its ID
        trail = Trail.query.get(id)
        if not trail:
            return {"error": "Trail not found"}, 404
        
        park_id = trail.park_id

        db.session.delete(trail)
        db.session.commit()

        return {"message": "Trail deleted successfully", "id": id, "park_id": park_id}, 200
              
class ParkDetail(Resource):
    def get(self, park_id):
        park = [park.to_dict() for park in Park.query.get(park_id)]
        return park, 200
      

api.add_resource(Parks, '/parks')
api.add_resource(Hikers, '/hikers', '/hikers/<int:id>')
api.add_resource(Trails, '/trails', '/trails/<int:id>')
api.add_resource(ParkDetail, '/park/<int:park_id>')




# api.add_resource(TrailsForPark, '/park/<int:park_id>/trails')

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
  