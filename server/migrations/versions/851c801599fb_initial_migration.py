"""initial migration

Revision ID: 851c801599fb
Revises: 
Create Date: 2024-12-15 14:27:08.146046

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '851c801599fb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('hikers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('skill_level', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('parks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('image', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('trails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('difficulty', sa.String(), nullable=True),
    sa.Column('dog_friendly', sa.Boolean(), nullable=True),
    sa.Column('fk_trail_park_id', sa.Integer(), nullable=False),
    sa.Column('fk_trail_hiker_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['fk_trail_hiker_id'], ['hikers.id'], name=op.f('fk_trails_fk_trail_hiker_id_hikers')),
    sa.ForeignKeyConstraint(['fk_trail_park_id'], ['parks.id'], name=op.f('fk_trails_fk_trail_park_id_parks')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('trails')
    op.drop_table('parks')
    op.drop_table('hikers')
    # ### end Alembic commands ###
