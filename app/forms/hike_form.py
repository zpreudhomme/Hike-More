from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Hike


class HikeForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    location = StringField("location", validators=[DataRequired()])
    description = TextAreaField("description", validators=[DataRequired()])
    state_id = SelectField("state_id", coerce=int, validators=[DataRequired()])
