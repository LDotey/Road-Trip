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
    
    def patch(self, id):
        data = request.get_json()
        park = Park.query.get(id)
        if not park:
            return {"error": "Park not found"}, 404
        
        park.name = data.get("name", park.name)
        park.state = data.get("state", park.state)
        park.image = data.get("image", park.image)

        db.session.commit()
        return park.to_dict(), 200


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

    def delete(self, id):
        hiker = Hiker.query.get(id)
        
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
        # update an existing trail
        data = request.get_json()
        # breakpoint()
        trail = Trail.query.get(id)
        if not trail:
            return {"error": "Trail not found"}, 404
        
        # update trail details
        trail.name = data.get("name", trail.name)
        trail.difficulty = data.get("difficulty", trail.difficulty)
        trail.dog_friendly = data.get("dog_friendly", trail.dog_friendly)
        trail.park_id = data.get("park_id", trail.park_id)
        trail.hiker_id = data.get("hiker_id", trail.hiker_id)

        db.session.commit()

        return trail.to_dict(), 200
    
    def delete(self, id):
        # delete a trail by its ID
        trail = Trail.query.get(id)
        if not trail:
            return {"error": "Trail not found"}, 404
        
        park_id = trail.park_id

        db.session.delete(trail)
        db.session.commit()

        return {"message": "Trail deleted successfully", "id": id, "park_id": park_id}, 200
  

class ParksByState(Resource):
    def get(self, state):
        # breakpoint()
   
        # parks = Park.query.filter_by(state=state).all()
        all_parks = Park.query.all()
        parks = [ park for park in all_parks if park.state==state ]
        if not parks:
            return {'message': f'No parks found in {state}'}, 404

        parks_list = [park.to_dict() for park in parks]  

        return {'parks': parks_list}, 200
    
class TrailsByDifficulty(Resource):
    def get(self, difficulty):

        all_trails = Trail.query.all()
        trails = [ trail.to_dict() for trail in all_trails if trail.difficulty==difficulty]

        return {'trails': trails}, 200
    
class TrailsByHikerID(Resource):
    def get(self, hiker_id):

        trails = Trail.query.filter_by(hiker_id=hiker_id).all()
        trails = [trail.to_dict() for trail in trails if trail.hiker_id==hiker_id]

        return {'trails': trails}, 200
    
class HikerBySkill(Resource):
    def get(self, skill_level):

        all_hikers = Hiker.query.all()
      

api.add_resource(Parks, '/parks', '/parks/<int:id>')
api.add_resource(Hikers, '/hikers', '/hikers/<int:id>')
api.add_resource(Trails, '/trails', '/trails/<int:id>')
api.add_resource(ParksByState, '/parks/<string:state>')
api.add_resource(TrailsByDifficulty, '/trails/<string:difficulty>')
api.add_resource(TrailsByHikerID, '/trails/hiker/<int:hiker_id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)





        
