from .db import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


user_hikes = db.Table(
    "user_hikes",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "hike_id", db.Integer, db.ForeignKey("hikes.id"), primary_key=True
    )
)


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    full_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_photo = db.Column(db.String(), default='https://www.whittierfirstday.org/wp-content/uploads/default-user-image-e1501670968910.png')  # noqa
    created_at = db.Column(db.DateTime(), nullable=False, default=datetime.utcnow)  # noqa

    hikes_owned = db.relationship(
        "Hike",
        back_populates="owner",
        foreign_keys="Hike.user_id"
    )

    routes_owned = db.relationship(
        "Route",
        back_populates="owner",
        cascade='all, delete-orphan'
    )

    favorite_hikes = db.relationship(
        "Hike",
        secondary="user_hikes",
        back_populates="user_favorites"
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
            "favorite_hikes": [hike.to_dict_basic() for hike in self.favorite_hikes],   # noqa
            # "hikes": self.hikes_owned.to_dict_basic(),
            # "routes": self.routes_owned.to_dict_basic()
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
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text)
    photo = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    state_id = db.Column(db.Integer, db.ForeignKey("states.id"), nullable=False)  # noqa
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # noqa

    owner = db.relationship(
        "User",
        back_populates="hikes_owned",
        foreign_keys=[user_id]
    )

    state = db.relationship(
        "State",
        back_populates="hikes_in_state"
    )

    user_favorites = db.relationship(
        "User",
        secondary="user_hikes",
        back_populates="favorite_hikes"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "description": self.description,
            "created_at": str(self.created_at),
            "photo": self.photo,
            "owner": self.owner.to_dict_basic(),
            "state": self.state.to_dict_basic(),
            "user_favorites": [user.to_dict_basic() for user in self.user_favorites],   # noqa
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
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
