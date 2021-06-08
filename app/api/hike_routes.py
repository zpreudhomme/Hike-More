from flask import Blueprint, session, request
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import HikeForm
from app.models import Hike, State, db

hike_routes = Blueprint('hike', __name__)


@hike_routes.route("/", methods=["POST"])
def new_hike():
    """
    Creates a new hike in the database
    """
    form = HikeForm()
    # form.state_id.choices = state_choice
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        hike = Hike(
            name=form.data["name"],
            latitude=form.data["latitude"],
            longitude=form.data["longitude"],
            description=form.data["description"],
            user_id=current_user.id,
            state_id=form.data["state_id"]
        )
        db.session.add(hike)
        db.session.commit()
        return hike.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@hike_routes.route("/states")
def all_states():
    states = State.query.all()
    return states.to_dict()
