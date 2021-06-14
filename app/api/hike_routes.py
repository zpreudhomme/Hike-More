from flask import Blueprint, session, request
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import HikeForm
from app.models import Hike, State, db, User

hike_routes = Blueprint('hike', __name__)


@hike_routes.route("/", methods=["GET"])
def all_hikes():
    """
    Returns all hikes in DB
    """
    hikes = Hike.query.all()
    print(hikes)
    return {'hike': [hike.to_dict() for hike in hikes]}


@hike_routes.route("/", methods=["POST"])
def new_hike():
    """
    Creates a new hike in the database
    """
    form = HikeForm()
    # form.state_id.choices = state_choice
    form['csrf_token'].data = request.cookies['csrf_token']
    print("I am here!!!---------", form)
    if form.validate_on_submit():
        print("form.data")
        hike = Hike(
            name=form.data["name"],
            latitude=form.data["latitude"],
            longitude=form.data["longitude"],
            description=form.data["description"],
            user_id=current_user.id,
            state_id=form.data["state_id"],
            photo=form.data["photo"]
        )
        db.session.add(hike)
        db.session.commit()
        return hike.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@hike_routes.route("/<int:id>")
def get_hike(id):
    hike = Hike.query.get(id)
    return hike.to_dict()


@hike_routes.route("/<int:id>", methods=["DELETE"])
def delete_hike(id):
    print("I've been hit---------------", id)
    hike = Hike.query.get(id)
    print(hike)
    db.session.delete(hike)
    db.session.commit()
    return "Deleted!"


@hike_routes.route("/<int:id>", methods=["PUT"])
def put_hike(id):
    hike = Hike.query.get(id)
    hike.name = request.json['name']
    hike.latitude = request.json['latitude']
    hike.longitude = request.json['longitude']
    hike.description = request.json['description']
    hike.photo = request.json['photo']
    hike.state_id = request.json['state_id']
    db.session.commit()
    return hike.to_dict()


@hike_routes.route("/favorites")
def get_favorites():
    id = current_user.id
    user = User.query.get(id)
    data = user.to_dict()
    return {"hikes": data["favorite_hikes"]}


@hike_routes.route("/favorites/add/<int:id>", methods=["PUT"])
def add_to_favorites(id):
    hike = Hike.query.get(id)
    current_user.favorite_hikes.append(hike)
    db.session.commit()
    return current_user.to_dict()


@hike_routes.route("/favorites/delete/<int:id>", methods=["PUT"])
def delete_from_favorites(id):
    hike = Hike.query.get(id)
    current_user.favorite_hikes.remove(hike)
    db.session.commit()
    return current_user.to_dict()


def grab_favorites(hike):
    return hike["total_favorites"]


@hike_routes.route("/popular")
def most_popular():
    hikes = Hike.query.all()
    all_hikes = [hike.to_dict() for hike in hikes]
    sorted_hikes = sorted(all_hikes, key=grab_favorites, reverse=True)
    popular = sorted_hikes[0:6]
    return {"popular": popular}
