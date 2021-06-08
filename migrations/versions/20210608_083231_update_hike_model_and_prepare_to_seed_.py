"""Update Hike model and prepare to seed hikes

Revision ID: 259e8c43eedb
Revises: 09c41cda3a4e
Create Date: 2021-06-08 08:32:31.017469

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '259e8c43eedb'
down_revision = '09c41cda3a4e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('hikes', sa.Column('latitude', sa.Float(), nullable=False))
    op.add_column('hikes', sa.Column('longitude', sa.Float(), nullable=False))
    op.drop_column('hikes', 'location')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('hikes', sa.Column('location', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('hikes', 'longitude')
    op.drop_column('hikes', 'latitude')
    # ### end Alembic commands ###
