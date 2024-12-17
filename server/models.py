from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Park(db.Model, SerializerMixin):
    __tablename__ = "parks"
  

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String)
    state = db.Column(db.String)



    # relationship
    # trails = db.relationship('Trail', back_populates='park')
    
    # hikers = db.relationship('Hiker', secondary="trails", viewonly=True)


  

    def __repr__(self):
        return f'<Park {self.id}, {self.name}>'
    

    
class Hiker(db.Model, SerializerMixin):
    __tablename__ = "hikers"
    # serialize_rules=("-hiker.trails")


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique= True)
    skill_level = db.Column(db.String, nullable=False, default='Beginner')

    # relationship
    # trails = db.relationship('Trail', back_populates='hiker')
    # trails = db.relationship('Trail', backref='hiker', lazy=True)

    def __repr__(self):
        return f'<Hiker {self.id}, {self.name}>'


# class Trail(db.Model, SerializerMixin):
#     __tablename__= "trails"
#     serialize_rules=("-park.trails", "-hiker.trails")

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String, nullable=False)
#     difficulty = db.Column(db.String)  # Difficulty of the trail (e.g., easy, medium, hard)
#     dog_friendly = db.Column(db.Boolean, default=False)  
#     park_id = db.Column(db.Integer, db.ForeignKey('parks.id'), name='fk_trail_park_id', nullable=False)  
#     hiker_id = db.Column(db.Integer, db.ForeignKey('hikers.id'),name='fk_trail_hiker_id', nullable=False) 

#     # relationships
#     # park = db.relationship('Park', back_populates='trails')
#     # hiker = db.relationship('Hiker', back_populates='trails') 

#     # def to_dict(self):
#     #     return {
#     #         'id': self.id,
#     #         'name': self.name,
#     #         'difficulty': self.difficulty,
#     #         'park_id': self.park_id,
#     #         "dog_friendly": self.dog_friendly
#     #     }

#     def __repr__(self):
#         return f'<Trail {self.id}, {self.name}>'
