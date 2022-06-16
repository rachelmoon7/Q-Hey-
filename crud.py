"""CRUD operations."""
from model import db, User, Post, Image, Question, connect_to_db

def create_user(fname, lname, email, username, password):
    """Create and return a new user."""

    user = User(fname=fname, lname=lname, email=email, username=username, password=password)

    return user


def get_user_by_username(username):
    """Check if user object with this username exists"""

    return User.query.filter(User.username == username).first() 


def create_question(question):
    """Create and return a question."""

    question = Question(question=question)

    return question


def get_question():
    """Return list of all questions."""

    return Question.query.all()


def create_post(user_id, question_id, post_date, caption):
    """Create a post when a user posts in response to prompt_id."""

    post = Post(user_id=user_id, question_id=question_id, post_date=post_date, caption=caption)
    
    return post

def create_image(post_id, img_URL):
    """Create an image when a user uploads."""

    image = Image(post_id=post_id, img_URL=img_URL)

    return image

def get_post():
    """Retrieve a list of posts from database."""

    return Post.query.all()

if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)