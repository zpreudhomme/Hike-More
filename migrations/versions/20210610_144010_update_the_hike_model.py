"""update the hike model

Revision ID: 053b42f981db
Revises: 6e63b3f73329
Create Date: 2021-06-10 14:40:10.819258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '053b42f981db'
down_revision = '6e63b3f73329'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('hikes', sa.Column('photo', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('hikes', 'photo')
    # ### end Alembic commands ###