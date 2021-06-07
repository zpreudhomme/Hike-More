from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DecimalField
from wtforms.validators import DataRequired, ValidationError
from app.models import Hike, State


class HikeForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    latitude = DecimalField("latitude", validators=[DataRequired()])
    longitude = DecimalField("longitude", places=4, rounding=True, validators=[DataRequired()])         # noqa
    description = TextAreaField("description", places=4, rounding=True, validators=[DataRequired()])    # noqa
    state_id = SelectField("state_id", coerce=int, validators=[DataRequired()])   # noqa
