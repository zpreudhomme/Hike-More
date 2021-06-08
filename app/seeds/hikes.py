from faker import Faker
import random
from app.models import db, Hike


def seed_hikes():
    fake = Faker()

    hikes = [
        {'name': 'Grand Canyon', 'latitude': 36.05798, 'longitude': -112.1267, 'description': "It's a long hike through the deepest canyon in the world.", 'user_id': 1, 'state_id': 3}  # noqa
    ]

    for i in range(50):
        info = fake.local_latlng()
        hikes.append({
            'name': info[2],
            'latitude': info[0],
            'longitude': info[1],
            'description': fake.sentence(nb_words=random.randint(1, 15)),
            'user_id': 1,
            'state_id': 2
        })

    for hike in hikes:
        print(hike)
        load_hike = Hike(name=hike["name"], latitude=hike["latitude"], longitude=hike["longitude"], description=hike["description"], user_id=hike["user_id"], state_id=hike["state_id"])  # noqa
        
        db.session.add(load_hike)

    db.session.commit()


def undo_hikes():
    db.session.execute('TRUNCATE hikes RESTART IDENTITY CASCADE;')
    db.session.commit()
