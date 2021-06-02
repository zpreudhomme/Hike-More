from .db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    # email = db.Column(db.String(255), nullable=False, unique=True)
    full_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_photo = db.Column(db.String(), default='https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png')  # noqa
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)  # noqa

    hikes_owned = db.relationship(
        "Hike",
        back_populates="owner",
        cascade='all, delete-orphan'
    )

    routes_owned = db.relationship(
        "Route",
        back_populates="owner",
        cascade='all, delete-orphan'
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "full_name": self.full_name,
            "profile_photo": self.profile_photo,
            "created_at": str(self.created_at),
            "hikes": self.hikes_owned.to_dict_basic(),
            "routes": self.routes_owned.to_dict_basic()
            }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "profile_photo": self.profile_photo,
            }


class Hike(db.Model):
    __tablename__ = 'hikes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    desription = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey("states.id"), nullable=False)  # noqa
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # noqa

    owner = db.relationship(
        "User",
        back_populates="hikes_owned"
    )

    state = db.relationship(
        "State",
        back_populates="hikes_in_state"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "description": self.desription,
            "created_at": str(self.created_at),
            "owner": owner.to_dict_basic(),
            "state": state.to_dict_basic()
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "description": self.desription,
            "created_at": str(self.created_at),
        }


class Route(db.Model):
    __tablename__ = 'routes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    map_info = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # noqa

    owner = db.relationship(
        "User",
        back_populates="routes_owned"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "map_info": self.map_info,
            "description": self.desription,
            "created_at": str(self.created_at),
            "owner": owner.to_dict_basic(),
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "map_info": self.map_info,
            "description": self.desription,
            "created_at": str(self.created_at),
        }


class State(db.Model):
    __tablename__ = "states"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    abbr = db.Column(db.String, nullable=False)

    hikes_in_state = db.relationship(
        "Hike",
        back_populates="state"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "abbr": self.abbr,
            "hikes": self.hikes_in_state.to_dict_basic()
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "abbr": self.abbr,
        }
