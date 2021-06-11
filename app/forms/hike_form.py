from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DecimalField, IntegerField  # noqa
from wtforms.validators import DataRequired, ValidationError
from app.models import Hike, State


class HikeForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    latitude = DecimalField("latitude", places=4, rounding=True, validators=[DataRequired()])   # noqa
    longitude = DecimalField("longitude", places=4, rounding=True, validators=[DataRequired()])         # noqa
    description = TextAreaField("description", validators=[DataRequired()])    # noqa
    photo = TextAreaField("photo", validators=[DataRequired()])    # noqa
    state_id = IntegerField("state_id", validators=[DataRequired()])   # noqa
