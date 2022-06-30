"""Server for Q&Hey! app."""

from flask import (Flask, render_template, request, flash, session, jsonify, json,
                   redirect)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined
from datetime import datetime
import cloudinary.uploader
import os


CLOUDINARY_KEY = os.environ['CLOUDINARY_KEY']
CLOUDINARY_SECRET = os.environ['CLOUDINARY_SECRET']
CLOUD_NAME = "dvbrrbcum"

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

@app.route('/')
def homepage():
    """Process user login or link to create account."""
    
    return render_template('homepage.html')

@app.route('/login', methods=["POST"])
def login_user():
    """Process user login info."""

    user_username = request.form.get("user_username")
    user_password = request.form.get("user_password")
 
    existing_user = crud.get_user_by_username(user_username)

    if existing_user and user_password == existing_user.password:     
        session["user_email"] = existing_user.email
        session["user_id"] = existing_user.user_id
        session["username"] = existing_user.username
        return redirect('/landing-page')
    else:
        flash("Incorrect password!")
        return redirect('/')

@app.route('/logout')
def logout():
    "Log out the user"

    session.clear()

    return redirect('/') 



@app.route('/landing-page')
def landing_page():
    """Show landing page."""

    questions = crud.get_question()
    week_num = datetime.now().isocalendar().week
    posts = crud.get_post()
    images = crud.get_image()
    
    flash("Logged in!")
    
    return render_template('landing-page.html', questions=questions, week_num=week_num, posts=posts, images=images)

@app.route('/signup')
def create_account():
    """Create new account."""

    return render_template("register.html")

@app.route('/register', methods=["POST"])
def register_user():
    """Create a new user."""    
    
    fname = request.form.get("user_fname")
    lname = request.form.get("user_lname")
    email = request.form.get("user_email")
    username = request.form.get("user_username")
    password = request.form.get("user_password")

    user = crud.get_user_by_username(username)

    if user:
        flash("That username has been taken. Please try again.")
        return redirect('/signup')
    else:
        user = crud.create_user(fname, lname, email, username, password)
        db.session.add(user)
        db.session.commit()
        flash("Account successfully created! Please log in.")
        return redirect('/')


@app.route("/post-form-data", methods=["POST"])
def process_form():
    """Process the form"""

    img_url = request.json['img1']  
    print("(((((LINE 101??", img_url)

    
    user_id = session["user_id"]
    print("LINE 150: CURRENT USER POSTING:", user_id)

    question_id = datetime.now().isocalendar().week
    post_date = datetime.now()
    caption = request.json["caption"]

    new_post = crud.create_post(user_id, question_id, post_date, caption)
    db.session.add(new_post)
    db.session.commit()

    new_image = crud.create_image(new_post.post_id, img_url) 
    db.session.add(new_image)
    db.session.commit()

    if request.json['img2']:

        img_url_2 = request.json['img2']   
        new_image_2 = crud.create_image(new_post.post_id, img_url_2)
        
        db.session.add(new_image_2)
        db.session.commit()

        return jsonify([{'new_post': new_post.to_dict(), 'new_image': new_image.to_dict(), 'new_image_2': new_image_2.to_dict()}])
    
    return jsonify([{'new_post': new_post.to_dict(), 'new_image': new_image.to_dict()}])


@app.route('/get-search-result', methods=["POST"])
def get_search_result():
    """Look for user with the username in search box"""

    user = crud.get_user_by_username(request.json['searchString'])
    
    if user == None:
        return jsonify([{'potentialFriend': "does not exist"}])
    
    return jsonify([{'potentialFriend': user.username}])


@app.route('/request-friend', methods=["POST"])
def request_friend():
    """Request user in search result as a friend."""

    logged_in_user = crud.get_user_by_id(session["user_id"])    
    potential_friend = crud.get_user_by_username(request.json['result'])

    crud.request_friend(logged_in_user, potential_friend)
    db.session.add(potential_friend)
    db.session.commit()
    print("$$-158-$$POTENTIAL FRIEND'S FOLLOWERS:", potential_friend.followers)
    #send friend request to potential_friend

    return jsonify([{'user': session["user_id"]}])


@app.route('/accept-request', methods=["POST"])
def accept_request():
    """Accept friend request"""
    logged_in_user = crud.get_user_by_id(session["user_id"])
    print("!!-169-!!LOGGED IN AS", logged_in_user)
   
    potential_friend = crud.get_user_by_id(request.json['request_from'])
    print("$$-172-$$accepting from:", potential_friend)
    
    crud.accept_request(logged_in_user, potential_friend)
    db.session.commit()

    print("---178--whomyfriends:", logged_in_user.followers)
    return jsonify([{'friend': potential_friend.to_dict()}])


@app.route('/myFriends')
def show_friends_and_requests():
    """Show list of friends and any friend requests"""
    logged_in_user = crud.get_user_by_id(session["user_id"])
    
    requested = set(logged_in_user.following) - set(logged_in_user.followers)

    my_friends = set(logged_in_user.following) & set(logged_in_user.followers)
    
    return render_template("myfriends.html", logged_in_user=logged_in_user, requested=requested, my_friends=my_friends)


@app.route('/get-all-requests')
def get_all_requests():
    """Get all friend requests"""

    logged_in_user = crud.get_user_by_id(session["user_id"])  
    friend_requests = set(logged_in_user.followers) - set(logged_in_user.following)
    
    all_fr = []
    for fr in friend_requests:
        all_fr.append(fr.to_dict())
    print("--202--ALL REQUESTS", all_fr)    
    return jsonify(all_fr)

    
@app.route('/get-friends-posts')
def get_friends_posts():
    """Retrieve all posts for each friend from current week to show in Landing Page."""
    #declare empty dictionary for {friend_id: {post_id: {caption: caption, post_date: post_date, img_url:img_url}}}
    post_info = {}

    logged_in_user = crud.get_user_by_id(session["user_id"])

    #list of my friends objects 
    friends = list(set(logged_in_user.followers) & set(logged_in_user.following))
    friends_ids = [obj.user_id for obj in friends]

    for friend_id in friends_ids:
        #initialize empty value here to start fresh for each friend
        caption_image = {}
        #current_week_posts_obj is a list of post objects for each user [{post1 info}, {post2 info}]
        current_week_posts_obj = crud.get_users_posts_week(friend_id)
        
        #iterate thorugh posts object to get .images attribute of each post
        for post in current_week_posts_obj:
            caption_image[post.post_id] = {'caption': post.caption}
            caption_image[post.post_id]['img_url'] = post.images[0].img_URL

            if len(post.images) > 1:
                caption_image[post.post_id]['img_url'] = post.images[0].img_URL
                caption_image[post.post_id]['img_url2'] = post.images[1].img_URL
            # print("!!! SERVER LINE 235", caption_image) 
                
        username = crud.get_username(friend_id)
        post_info[username] = caption_image
        
    # print("-_-_-_-_-_-Server 275", post_info)
    return jsonify(post_info)


@app.route('/profile')
def my_profile():
    """Return page showing the details of a given user."""
    username = session['username']

    return render_template("profile.html", username=username)
    #div on profile.html which renders profiles jsx


@app.route('/whose-profile')
def whose_profile():
    """Return username of the profile."""

    username = session['username']
    return jsonify(username)

    
@app.route('/get-logged-in-user')
def show_logged_in_user():
    """Return logged in user's username."""

    return jsonify(session['username'])


@app.route('/get-my-posts')
def get_my_posts():
    """Retrieve all posts for myself from current week to show in Landing Page."""
    #declare empty dictionary for {friend_id: {post_id: {caption: caption, post_date: post_date, img_url:img_url}}}
    post_info = {}

    my_id = session["user_id"]
    caption_image = {}
    #current_week_posts_obj is a list of post objects for each user [{post1 info}, {post2 info}]
    current_week_posts_obj = crud.get_users_posts_week(my_id)
    for post in current_week_posts_obj:
            caption_image[post.post_id] = {'caption': post.caption}
            caption_image[post.post_id]['img_url'] = post.images[0].img_URL

            if len(post.images) > 1:
                caption_image[post.post_id]['img_url'] = post.images[0].img_URL
                caption_image[post.post_id]['img_url2'] = post.images[1].img_URL
            # print("!!! SERVER LINE 235", caption_image) 
                
    username = crud.get_username(my_id)
    post_info[username] = caption_image
        
    print("-_-_-_-_-_-Server 275", post_info)
    return jsonify(post_info)


@app.route('/get-my-previous-posts')
def get_my_previous_posts():
    """Retrieve all of my previous posts."""

    post_info = {}

    my_id = session["user_id"]
    caption_image = {}
    #current_week_posts_obj is a list of post objects for each user [{post1 info}, {post2 info}]
    previous_posts_obj = crud.get_users_previous_posts(my_id)
    # print("$$$$$server 292 post obj?", previous_posts_obj)
    for post in previous_posts_obj:
            caption_image[post.post_id] = {'caption': post.caption}
            caption_image[post.post_id]['img_url'] = post.images[0].img_URL

            if len(post.images) > 1:
                caption_image[post.post_id]['img_url'] = post.images[0].img_URL
                caption_image[post.post_id]['img_url2'] = post.images[1].img_URL
            # print("!!! SERVER LINE 235", caption_image) 
                
    username = crud.get_username(my_id)
    post_info[username] = caption_image
        
    # print("!@!@!@!@!@ Server 304", post_info)
    return jsonify(post_info)


# @app.route('/delete-post', methods=["POST"])
# def delete_post():
#     """Delete the post """


if __name__ == "__main__":
    connect_to_db(app)
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0", debug=True)