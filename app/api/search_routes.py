from flask import Blueprint, session, request
from app.models import Hike, User, State


search_routes = Blueprint("search", __name__)


@search_routes.route("/", methods=["GET", "POST"])
def search():
    value = request.json['searchParams']
    hikes = Hike.query.filter(Hike.name.ilike(f'{value}%')).limit(8).all()
    states = State.query.filter(State.name.ilike(f'{value}%')).limit(5).all()
    users = User.query.filter(User.full_name.ilike(f'{value}%')).limit(8).all()  # noqa
    return {
        "hikes": [hike.to_dict_basic() for hike in hikes],
        "states": [state.to_dict() for state in states],
        "users": [user.to_dict() for user in users],
        "values": [hike.to_dict() for hike in hikes] + [state.to_dict() for state in states] + [user.to_dict() for user in users]  # noqa
    }
