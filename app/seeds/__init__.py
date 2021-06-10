from flask.cli import AppGroup
from .users import seed_users, undo_users
from .states import seed_states, undo_states
from .hikes import seed_hikes, undo_hikes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_states()
    seed_hikes()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_hikes()
    undo_states()
    undo_users()


# Creates the `flask seed run` command
@seed_commands.command('run')
def all():
    undo_hikes()
    undo_states()
    undo_users()
    seed_users()
    seed_states()
    seed_hikes()
