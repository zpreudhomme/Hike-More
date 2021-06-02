"""Worked on setting up new models and relationships

Revision ID: 76a0286b963f
Revises: 5b4acd0703b0
Create Date: 2021-06-02 10:17:54.680619

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '76a0286b963f'
down_revision = '5b4acd0703b0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('states',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('abbr', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hikes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('desription', sa.Text(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('state_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['state_id'], ['states.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('routes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('map_info', sa.String(), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('routes')
    op.drop_table('hikes')
    op.drop_table('states')
    # ### end Alembic commands ###