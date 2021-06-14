from werkzeug.security import generate_password_hash
from faker import Faker
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():

    fake = Faker()

    users = [
        {'username': 'Demo', 'full_name': 'Demo Omed', 'password': 'password'}  # noqa
    ]

    for i in range(49):
        users.append({
            "username": fake.user_name(),
            "full_name": fake.name(),
            "password": fake.password(length=10)
        })
    for user in users:
        load_user = User(username=user["username"], full_name=user["full_name"], password=user["password"])     # noqa
        db.session.add(load_user)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
