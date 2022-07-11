"""CRUD operations."""
from model import db, User, Post, Image, Question, Comment, Reaction, connect_to_db
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
    potential_friend.followers.append(logged_in_user)


def deny_request(logged_in_user, potential_friend):
    """Deny request."""

    logged_in_user.followers.remove(potential_friend)
    

def delete_friend(logged_in_user, delete_friend):
    """Delete a friend."""

    logged_in_user.following.remove(delete_friend)
    db.session.commit()
    logged_in_user.followers.remove(delete_friend)
    db.session.commit()
    delete_friend.followers.remove(logged_in_user)
    db.session.commit()


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

    Image.query.filter(Image.post_id==post_id).delete()
    db.session.commit()
    
    Post.query.filter(Post.post_id==post_id).delete()
    db.session.commit()
    

def create_comment(post_id, user_id, text, comment_date):
    """Create a comment."""

    comment = Comment(post_id=post_id, user_id=user_id, text=text, comment_date=comment_date)
    
    return comment


def get_post_by_post_id(post_id):
    """Get post by post_id."""

    return Post.query.filter(Post.post_id == post_id).first()


def delete_comment(comment_id):
    """Delete comment from database."""

    Comment.query.filter(Comment.comment_id==comment_id).delete()
    db.session.commit()


def create_reaction(post_id, user_id, reaction_type):
    """Add a reaction."""

    reaction = Reaction(post_id=post_id, user_id=user_id, reaction_type=reaction_type)
    # print("####CRUD REACTION CREATED:", reaction)

    return reaction


def like_reaction_count(post_id, reaction_type):
    """Get the count of a reaction."""

    like_count = Reaction.query.filter(Reaction.post_id == post_id, Reaction.reaction_type == reaction_type).count()

    #liked_users is a list of Reactions for the post
    liked_users = Reaction.query.filter(Reaction.post_id==post_id, Reaction.reaction_type==reaction_type).all()
    #iterate through liked_users to get the user_id's
    liked_user_ids = [get_username(obj.user_id) for obj in liked_users]
    # print("_____________**__CRUD LIKED USER ID'S", liked_users)
    # print("__________!!crud id's:", liked_user_ids)

    result = {}
    result['count'] = like_count
    result['users'] = liked_user_ids
    return result


def love_reaction_count(post_id, reaction_type):
    """Get the count of a reaction."""

    love_count = Reaction.query.filter(Reaction.post_id == post_id, Reaction.reaction_type == "Love").count()

    loved_users = Reaction.query.filter(Reaction.post_id==post_id, Reaction.reaction_type==reaction_type).all()
    loved_user_ids = [get_username(obj.user_id) for obj in loved_users]

    result = {}
    result['count'] = love_count
    result['users'] = loved_user_ids
    return result


def haha_reaction_count(post_id, reaction_type):
    """Get the count of a reaction."""

    haha_count = Reaction.query.filter(Reaction.post_id == post_id, Reaction.reaction_type == "Ha ha!").count()

    haha_users = Reaction.query.filter(Reaction.post_id==post_id, Reaction.reaction_type==reaction_type).all()
    haha_user_ids = [get_username(obj.user_id) for obj in haha_users]

    result = {}
    result['count'] = haha_count
    result['users'] = haha_user_ids
    return result


def hug_reaction_count(post_id, reaction_type):
    """Get the count of a reaction."""

    hug_count = Reaction.query.filter(Reaction.post_id == post_id, Reaction.reaction_type == "Hug").count()

    hug_users = Reaction.query.filter(Reaction.post_id==post_id, Reaction.reaction_type==reaction_type).all()
    hug_user_ids = [get_username(obj.user_id) for obj in hug_users]

    result = {}
    result['count'] = hug_count
    result['users'] = hug_user_ids
    return result


def undo_reaction(user_id, post_id, reaction_type):
    """Delete a reaction."""

    Reaction.query.filter(Reaction.user_id==user_id, Reaction.post_id==post_id, Reaction.reaction_type==reaction_type).delete()

    db.session.commit()


if __name__ == '__main__':
    from server import app
    
    connect_to_db(app)