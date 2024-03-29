from faker import Faker
from geopy import Nominatim
import random
import time
from app.models import db, Hike, State, User

photoArray = [
    'https://images.unsplash.com/photo-1520962880247-cfaf541c8724?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',   # noqa
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80',   # noqa
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1455218873509-8097305ee378?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',    # noqa
    'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1501258338179-b25f87809429?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',    # noqa
    'https://images.unsplash.com/photo-1443632864897-14973fa006cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1513809491260-0e192158ae44?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=636&q=80',    # noqa
    'https://images.unsplash.com/photo-1535515505622-7621ebc4fc58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',    # noqa
    'https://images.unsplash.com/photo-1527824404775-dce343118ebc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',   # noqa
    'https://images.unsplash.com/photo-1485160497022-3e09382fb310?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',   # noqa
    'https://images.unsplash.com/photo-1518021964703-4b2030f03085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80',   # noqa
    'https://images.unsplash.com/photo-1501822810445-bba370e517ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1456066775592-f14f4ea694a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80',   # noqa
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1025&q=80',   # noqa
    'https://images.unsplash.com/photo-1514509353532-1419c0935d72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',    # noqa
    'https://images.unsplash.com/photo-1446572484939-ce15b646d497?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',   # noqa
    'https://images.unsplash.com/photo-1531379115628-32ab7454986c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',    # noqa
    'https://images.unsplash.com/photo-1579728887026-6fe67a8f9165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1516214104703-d870798883c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1529027467590-53b96b2a71a2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1531756716853-09a60d38d820?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1541426062085-72349d82d048?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80',   # noqa
    'https://images.unsplash.com/photo-1502856755506-d8626589ef19?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1596339325628-de7bdb0df482?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1600284536251-8bb98db53468?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1596965835195-1147baac55c9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1620571678635-0fa3a65bb521?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',    # noqa
    'https://images.unsplash.com/photo-1580648287083-87d2d6dcd9fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1610574010565-f4c089a0e138?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1489&q=80',   # noqa
    'https://images.unsplash.com/photo-1597294303835-8db97ac1e76e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',   # noqa
    'https://images.unsplash.com/photo-1604982780906-c7c198001258?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',   # noqa
]


def seed_hikes():
    fake = Faker()
    locator = Nominatim(user_agent="mine")
    users = User.query.all()

    hikes = [
        # {'name': 'Grand Canyon', 'latitude': 36.05798, 'longitude': -112.1267, 'description': "It's a long hike through the deepest canyon in the world.", 'user_id': 1, 'state_id': 3, 'photo': 'https://images.unsplash.com/photo-1516302350523-4c29d47b89e0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'}  # noqa
    ]

    for i in range(200):
        info = fake.local_latlng()
        location = locator.reverse(str(info[0])+", "+str(info[1]))
        address = location.raw['address']
        state = address["state"]
        photoIndex = random.randint(1, len(photoArray))
        photoIndex -= 1
        photo = photoArray[photoIndex]
        selected = State.query.filter_by(name=state).first()

        user_favorites = []
        user_favorites += random.sample(users, random.randint(0, 15))
        hikes.append({
            'name': info[2],
            'latitude': info[0],
            'longitude': info[1],
            'description': fake.sentence(nb_words=random.randint(40, 150)),
            'user_id': random.randint(1, len(users)),
            'state_id': selected.id,
            'photo': photo,
            'user_favorites': user_favorites
        })
        time.sleep(3)

    for hike in hikes:
        load_hike = Hike(
            name=hike["name"],
            latitude=hike["latitude"],
            longitude=hike["longitude"],
            description=hike["description"],
            user_id=hike["user_id"],
            state_id=hike["state_id"],
            photo=hike["photo"],
            user_favorites=hike["user_favorites"])

        db.session.add(load_hike)

    db.session.commit()


def undo_hikes():
    db.session.execute('TRUNCATE hikes RESTART IDENTITY CASCADE;')
    db.session.commit()
