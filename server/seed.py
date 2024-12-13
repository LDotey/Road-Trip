#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Park, Hiker, Trail

parks_data = [
    {"name": "Yellowstone", "image":"https://keepnaturewild.com/cdn/shop/products/keep-nature-wild-yellowstone-old-faithful-sticker-28689460822207.jpg?v=1681174869&width=2048", "state": "Wyoming" },
    {"name": "Yosemite", "image": "https://m.media-amazon.com/images/I/61OMPvva-uL.jpg", "state": "California"},
    {"name": "Grand Canyon", "image": "https://m.pumpernickelpress.com/DSN/wwwpumpernickelpresscom/Commerce/ProductImages/lg1_004393.jpg", "state": "Arizona"},
    {"name": "Zion", "image": "https://keepnaturewild.com/cdn/shop/products/keep-nature-wild-zion-the-narrows-sticker-28689440538815.jpg?crop=center&height=1200&v=1681174675&width=1200", "state": "Utah"},
    {"name": "Glacier", "image": "https://thelandmarkproject.com/cdn/shop/products/2020GlacierNationalParkSticker.png?v=1658782923", "state": "Montana"}
]

trails_data = [
    {"name": "Old Faithful Geyser", "difficulty": "Medium", "dog_friendly": False},
    {"name": "Half Dome", "difficulty": "Hard", "dog_friendly": False},
    {"name": "Bright Angel Trail", "difficulty": "Medium", "dog_friendly": False},
    {"name": "Angel's Landing", "difficulty": "Hard", "dog_friendly": False},
    {"name": "Highline Trail", "difficulty": "Medium", "dog_friendly": False},
]

def fake_hikers():
    fake=Faker()
    skill_levels = ['Beginner', 'Novice', 'Expert']

    return Hiker(
        name=fake.name(),
        email=fake.email(),
        skill_level=rc(skill_levels)
    )

def seed_parks():
    Park.query.delete()
    

    for park_data in parks_data:
        park = Park(
            name=park_data['name'],
            image=park_data['image'],
            state=park_data['state']
        )
        db.session.add(park)
        db.session.commit()

        print("Database seeded with parks")

    # db.session.add_all(parks_data)

def seed_trails():
    trails = []
    for i, park in enumerate(Park.query.all()):
        for trail_data in trails_data:
            trail = Trail(
                name=trail_data['name'],
                difficulty=trail_data['difficulty'],
                dog_friendly=trail_data['dog_friendly'],
                park_id=park.id
            )
            db.session.add(trail)
            trails.append(trail)
            db.session.commit()
            print(f"Seeded {len(trails)} trails for park {park.name}")

def seed_hikers():
    fake = Faker()
    hikers = [fake_hikers() for _ in range(8)]
    db.session.add_all(hikers)
    db.session.commit()
    print("Seeded hikers")

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code goes here!
        seed_parks()
        seed_trails()
