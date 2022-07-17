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
    "Log out the user by clearing session."

    session.clear()

    return redirect('/') 


@app.route('/landing-page')
def landing_page():
    """Show landing page."""

    questions = crud.get_question()
    week_num = datetime.now().isocalendar().week
    
    return render_template('landing-page.html', questions=questions, week_num=week_num)


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
    # print("(((((LINE 101??", img_url)

    user_id = session["user_id"]
    # print("LINE 150: CURRENT USER POSTING:", user_id)
    # print("???????server from post request:", request.json)
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
        # print("SERVER IMG2 EXISTS ENTERING IF")
        img_url_2 = request.json['img2']   
        new_image_2 = crud.create_image(new_post.post_id, img_url_2)
        
        db.session.add(new_image_2)
        db.session.commit()

        result = get_landing_posts()
        return result
    
    result = get_landing_posts()
    # print("*(*(*( SERVER.PY REULST 129", result)
    return result


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
    # print("$$-150-$$POTENTIAL FRIEND'S FOLLOWERS:", potential_friend.followers)

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
    # return jsonify([{'friend': potential_friend.to_dict()}])
    return ("Accepted friend request")


@app.route('/deny-request', methods=["POST"])
def deny_request():
    """Deny friend request"""
    logged_in_user = crud.get_user_by_id(session["user_id"])
    potential_friend = crud.get_user_by_id(request.json['request_from'])

    crud.deny_request(logged_in_user, potential_friend)
    db.session.commit()
    
    return ("Denial successful")


@app.route('/delete-friend', methods=["POST"])
def delete_friend():
    """Delete a friend."""

    logged_in_user = crud.get_user_by_id(session["user_id"])
    delete_friend = crud.get_user_by_id(request.json)
    crud.delete_friend(logged_in_user, delete_friend)

    return ("Deleted friend")


@app.route('/myFriends')
def show_friends_and_requests():
    """Show list of friends and any friend requests"""
    
    return render_template("myfriends.html")


@app.route('/get_list_of_friends')
def get_list_of_friends():
    """Show list of user's friends."""

    logged_in_user = crud.get_user_by_id(session["user_id"])

    my_friends = list(set(logged_in_user.following) & set(logged_in_user.followers))

    result = {}

    for friend in my_friends:
        info = {}
        info['fname'] = friend.fname
        info['lname'] = friend.lname
        info['user_id'] = friend.user_id
        result[friend.user_id] = info

    return result

@app.route('/get_list_of_pending')
def get_list_of_pending():
    """Show who user sent a friend request to."""

    logged_in_user = crud.get_user_by_id(session["user_id"])
    
    requested = list(set(logged_in_user.following) - set(logged_in_user.followers))

    result = {}

    for friend in requested:
        info = {}
        info['fname'] = friend.fname
        info['lname'] = friend.lname
        info['user_id'] = friend.user_id
        result[friend.user_id] = info

    return result


@app.route('/get_friend-profile_posts', methods=["POST"])
def get_friend_profile_posts():
    """Retrieve all posts for friend's profile."""

    user_id = request.json

    return profile_posts(user_id)


@app.route('/get-all-requests')
def get_all_requests():
    """Get all friend requests"""
    logged_in_user = crud.get_user_by_id(session["user_id"]) 
    # print("@@@@SERVER FOLLOWERS:", logged_in_user.followers) 
    friend_requests = set(logged_in_user.followers) - set(logged_in_user.following)
    
    all_fr = []
    for fr in friend_requests:
        all_fr.append(fr.to_dict())
    # print("--202--ALL REQUESTS", all_fr)    
    return jsonify(all_fr)

    
@app.route('/get-landing-posts')
def get_landing_posts():
    """Retrieve all posts for logged_in_user and logged_in_user's friends from current week to show in Landing Page."""

    post_info = {}

    logged_in_user = crud.get_user_by_id(session["user_id"])

    #list of my friends objects 
    friends = list(set(logged_in_user.followers) & set(logged_in_user.following))
    friends_ids = [obj.user_id for obj in friends]
    friends_ids.append(logged_in_user.user_id)
    for friend_id in friends_ids:
        #initialize empty value here to start fresh for each friend
        caption_image = {}
        #current_week_posts_obj is a list of post objects for each user [{post1 info}, {post2 info}]
        current_week_posts_obj = crud.get_users_posts_week(friend_id)
        
        #iterate thorugh posts object to get .images attribute of each post
        for post in current_week_posts_obj:
            caption_image[post.post_id] = {'caption': post.caption}
            caption_image[post.post_id]['post_date'] = post.post_date

            if len(post.images) > 0:
                caption_image[post.post_id]['img_url'] = post.images[0].img_URL
                if len(post.images) > 1:
                    caption_image[post.post_id]['img_url2'] = post.images[1].img_URL

            # print("!!! SERVER LINE 243", caption_image) 
                
        username = crud.get_username(friend_id)
        post_info[username] = caption_image
        
    print("-_-_-_-_-_-Server 275", post_info)
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


@app.route('/get-my-profile-posts')
def get_my_profile_posts():
    """Retrieve all of my previous posts."""
    
    user_id = session["user_id"]

    return profile_posts(user_id)


@app.route('/delete-post', methods=["POST"])
def delete_post():
    """Delete the post and return all posts for respective pages: Landing/Profile."""
    # print("___SERVER318,", request.json)
    post_id = request.json['postToDelete']
    # print("+++++POST ID", post_id)
    crud.delete_post(post_id)

    if request.json['deleteOrigin'] == False:
        return get_landing_posts()
    elif request.json['deleteOrigin'] == True:
        return get_my_profile_posts()

    return jsonify("Delete successful!")


@app.route('/add-comment', methods=["POST"])
def add_comment():
    """Add a comment to a post."""
    # print("got to server add-comment fcn")
    post_id = request.json['postToComment']
    user_id = session["user_id"]
    text = request.json['comment']
    comment_date = datetime.now()
    # print("__request__", request.json)
    # print("---post_id", post_id)
    # print("!!text", text)
    comment_obj = crud.create_comment(post_id, user_id, text, comment_date)
    db.session.add(comment_obj)
    db.session.commit()
    comment = comment_obj.to_dict()
    comment['username'] = crud.get_user_by_id(comment['user_id']).username
        # adding boolean value to each comment info dictionary to see if comment belongs to logged in user
    if session['username'] == comment['username']:
        comment['delete_option'] = True
    else:
        comment['delete_option'] = False
    # return get_comments_for_post_id(post_id)
    return jsonify(comment)


@app.route('/get-all-comments', methods=["POST"])
def get_all_comments():
    """Retrieves all comments and its user's username for post."""

    post_id = request.json
    
    post = crud.get_post_by_post_id(post_id)
    # print("_______post.comments", post.comments)
    # all_comments = []
    #create array by iterating through comments attribute of a post
    if post is not None:
        all_comments = [comment.to_dict() for comment in post.comments]

        for i in range(len(all_comments)):
            # adding username to each comment info dictionary
            all_comments[i]['username'] = crud.get_user_by_id(all_comments[i]['user_id']).username
            # adding boolean value to each comment info dictionary to see if comment belongs to logged in user
            if session['username'] == all_comments[i]['username']:
                all_comments[i]['delete_option'] = True
            else:
                all_comments[i]['delete_option'] = False
        return jsonify(all_comments)
    else: 
        return jsonify([])



@app.route('/delete-comment', methods=["POST"])
def delete_comment():
    """Delete a comment."""
    # print("++++++", request.json)

    comment_to_delete = request.json
    crud.delete_comment(comment_to_delete)
    
    return ('Deleted Comment')


@app.route('/add-reaction', methods=["POST"])
def add_reaction():
    """Add a reaction to a post."""

    post_id = request.json['postID']
    user_id = session["user_id"]
    reaction_type = request.json['reactionType']
    # print("__3-8-2-SERVER post_id", post_id)
    # print("__3-8-2-SERVER reaction_type", reaction_type)
    reaction_obj = crud.create_reaction(post_id, user_id, reaction_type)
    db.session.add(reaction_obj)
    db.session.commit()

    return jsonify('Reaction added')


@app.route('/get-all-reactions', methods=["POST"])
def get_all_reactions():
    """Get all reactions for a post."""

    post_id = request.json
    post = crud.get_post_by_post_id(post_id)
    #create array by iterating through reactions attribute of a post
    if post is not None:
        all_reactions = [reaction.to_dict() for reaction in post.reactions]
        print("!!!!!!allreactions", all_reactions)
        return count_of_reactions(post_id)
    else:
    #call count_of_reactions function with post_id
        return {'like': 0, 'love': 0, 'haha': 0, 'hug': 0}


@app.route('/undo-reaction', methods=["POST"])
def undo_reaction():
    """Undo a reaction."""

    user_id = session["user_id"]
    post_id = request.json['postID']
    reaction_type = request.json['reactionType']

    crud.undo_reaction(user_id, post_id, reaction_type)
    
    #call count_of_reactions function with post_id
    return count_of_reactions(post_id)


@app.route('/get-friend-posts', methods=["POST"])
def to_friend_profile():
    """Show friend's posts."""
    print("_=-=-=-=-request.json", request.json)
    
    friend_id = request.json
    all_posts = profile_posts(friend_id)
    print("__=-=-=-=-=-=all_posts", all_posts)
    return all_posts




#------------Helper Functions:------------
def profile_posts(user_id):
    """Helper function to get all posts for a user's profile."""

    post_info = {}
    caption_image = {}
    #current_week_posts_obj is a list of post objects for each user [{post1 info}, {post2 info}]
    posts_obj = crud.get_users_previous_posts(user_id)
    # print("$$$$$server 484 post obj?", posts_obj[0].post_id)
    for post in posts_obj:
            caption_image[post.post_id] = {'caption': post.caption}
            caption_image[post.post_id]['post_date'] = post.post_date

            if len(post.images) > 0:
                caption_image[post.post_id]['img_url'] = post.images[0].img_URL
                if len(post.images) > 1:
                    caption_image[post.post_id]['img_url2'] = post.images[1].img_URL
                
    username = crud.get_username(user_id)
    post_info[username] = caption_image
        
    # print("!@!@!@!@!@ Server 497", post_info)
    return jsonify(post_info)


def count_of_reactions(post_id):
    """Helper function to get count of each reaction."""

    like_info = crud.like_reaction_count(post_id, 'Like')

    love_info = crud.love_reaction_count(post_id, 'Love')
    haha_info = crud.haha_reaction_count(post_id, 'Ha ha!')
    hug_info = crud.hug_reaction_count(post_id, 'Hug')

    result = {}
    
    result['like'] = like_info
    result['love'] = love_info
    result['haha'] = haha_info
    result['hug'] = hug_info

    return jsonify(result)




if __name__ == "__main__":
    connect_to_db(app)
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0", debug=True)

