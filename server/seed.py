#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Park

parks_data = [
    {"name": "Yellowstone", "image":"https://keepnaturewild.com/cdn/shop/products/keep-nature-wild-yellowstone-old-faithful-sticker-28689460822207.jpg?v=1681174869&width=2048", "state": "Wyoming" },
    {"name": "Yosemite", "image": "https://m.media-amazon.com/images/I/61OMPvva-uL.jpg", "state": "California"},
    {"name": "Grand Canyon", "image": "https://m.pumpernickelpress.com/DSN/wwwpumpernickelpresscom/Commerce/ProductImages/lg1_004393.jpg", "state": "Arizona"},
    {"name": "Zion", "image": "https://keepnaturewild.com/cdn/shop/products/keep-nature-wild-zion-the-narrows-sticker-28689440538815.jpg?crop=center&height=1200&v=1681174675&width=1200", "state": "Utah"},
    {"name": "Glacier", "image": "https://thelandmarkproject.com/cdn/shop/products/2020GlacierNationalParkSticker.png?v=1658782923", "state": "Montana"}
]

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

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed code goes here!
        seed_parks()
