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


def get_username(id):
    """Retrieve the username of the user with id in argument."""

    return User.query.filter(User.user_id == id).first().username


def get_users_posts_week(user_id):
    """Retrieve list of friend's posts from current week."""

    week_num = datetime.now().isocalendar().week
    friend_posts_all = Post.query.filter(Post.user_id==user_id).all()
    # print("*** CRUD LINE 58 USERS POSTS:", friend_posts_all)
    friend_posts_current_week = []
    for post in friend_posts_all:
        if post.get_week_num() == week_num:
            friend_posts_current_week.append(post)
    # print("+++++CURRENT WEEK POSTS:", friend_posts_current_week)

    return friend_posts_current_week 


def get_users_previous_posts(user_id):
    """Retrieve list of all posts ever created by user."""

    return Post.query.filter(Post.user_id == user_id).all()   


def delete_post(post_id):
    """Delete post object from database."""
    print("____CRUD 113,", Post.query.filter(Post.post_id==post_id))
    Image.query.filter(Image.post_id==post_id).delete()
    db.session.commit()
    
    Post.query.filter(Post.post_id==post_id).delete()
    db.session.commit()
    


if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)