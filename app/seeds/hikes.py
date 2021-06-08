from faker import Faker
from app.models import db, Hike


def seed_hikes():
    fake = Faker()

    # hikes= [
    #     'name': 'Grand Canyon', 'latitude':'','longitude':'','description':'','user_id':'','state_id':''}  # noqa
    # ]
