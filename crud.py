"""CRUD operations."""
from model import db, User, Post, Image, Prompt, connect_to_db

def create_user(fname, lname, email, username, password):
    """Create and return a new user."""

    user = User(fname=fname, lname=lname, email=email, username=username, password=password)

    return user

def get_user_by_username(username):
    """Check if user object with this username exists"""

    return User.query.filter(User.username == username).first() 

# def create_post(user_id, prompt_id):
#     """Create a post when a user uploads image in response to prompt_id"""

#     post = Post()


if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)