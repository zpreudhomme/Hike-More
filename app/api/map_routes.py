from flask import Blueprint, session, request
import os

map_routes = Blueprint('map', __name__)


@map_routes.route("/")
def get_api_key():
    api_key = os.environ.get("REACT_APP_GOOGLE_API")
    return {'api_key': api_key}
