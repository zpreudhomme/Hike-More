from flask.cli import AppGroup
from .users import seed_users, undo_users
from .states import seed_states, undo_states

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_states()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_states()


# Creates the `flask seed all` command
@seed_commands.command('undo')
def all():
    undo_users()
    undo_states()
    seed_users()
    seed_states()
