"""CRUD operations."""
from model import db, User, Post, Image, Question, connect_to_db
from datetime import datetime
import asyncio

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

def get_image():
    """Retrieve a list of images from database."""

    return Image.query.all()

def get_user_by_id(user_id):
    """Get user object by user_id"""

    return User.query.filter(User.user_id == user_id).first() 


def request_friend(logged_in_user, potential_friend):
    """ Request friend. """

    logged_in_user.following.append(potential_friend)

    return logged_in_user.following

def accept_request(logged_in_user, potential_friend):
    """Accept request. """

    logged_in_user.followers.append(potential_friend)
    logged_in_user.following.append(potential_friend)
    potential_friend.followers.append(logged_in_user)

def get_friend_posts_week(user_id):
    """Retrieve list of friend's posts from current week."""

    week_num = datetime.now().isocalendar().week
    friend_posts_all = Post.query.filter(Post.user_id == user_id).all()
    # print("*** CRUD LINE 58 USERS POSTS:", friend_posts_all)
    friend_posts_current_week = []
    for post in friend_posts_all:
        if post.get_week_num() == week_num:
            friend_posts_current_week.append(post.to_dict())
    # print("+++++CURRENT WEEK POSTS:", friend_posts_current_week)

    return friend_posts_current_week 

def get_friend_images_week(user_id):
    """Retrieve list of friend's images from current week."""

    week_num = datetime.now().isocalendar().week
    friend_posts_all = Post.query.filter(Post.user_id == user_id).all()
    friend_posts_current_week = []

    for post in friend_posts_all:
        if post.get_week_num() == week_num:
            friend_posts_current_week.append(post.to_dict())

    friend_images_current_week = None

    for i in range(len(friend_posts_current_week)):
        print("_____CRUD 106 POST ID'S", friend_posts_current_week[i]['post_id'])
        friend_images_current_week = Image.query.filter(Image.post_id==friend_posts_current_week[i]['post_id']).all()

    if friend_images_current_week == None:
        return []

    friend_images_current_week_todict = []
    for image_obj in friend_images_current_week:
        friend_images_current_week_todict.append(image_obj.to_dict())

    return friend_images_current_week_todict

def get_username(id):
    """Retrieve the username of the user with id in argument."""

    return User.query.filter(User.user_id == id).first().username



if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)