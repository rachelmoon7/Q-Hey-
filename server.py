"""Server for Q&Hey! app."""

from flask import (Flask, render_template, request, flash, session,
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

    #for single post, pass in user.post[-1], in jinja, for loop thoruhg posts.images
    if existing_user and user_password == existing_user.password:
        # print("ENTER IF")
        session["user_email"] = existing_user.email
        session["user_id"] = existing_user.user_id

        return redirect('/landing-page')
    else:
        flash("Incorrect password!")
        return redirect('/')


@app.route('/landing-page')
def landing_page():
    """Show landing page."""
    questions = crud.get_question()
    week_num = datetime.now().isocalendar().week
    posts = crud.get_post()

    flash("Logged in!")
    print("THE DATE OF THE POST IS:", posts[-1].post_date)
    return render_template('landing-page.html', questions=questions, week_num=week_num, posts=posts)

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
    my_file = request.files['my-file']
    print("######", my_file)
    result = cloudinary.uploader.upload(my_file,
                                        api_key=CLOUDINARY_KEY,
                                        api_secret=CLOUDINARY_SECRET,
                                        cloud_name=CLOUD_NAME)
    img_url = result['secure_url']   
    
    
    user_id = session["user_id"]
    print("@###$@#", user_id)
    question_id = datetime.now().isocalendar().week
    post_date = datetime.now()
    caption = request.form.get("caption")

    new_post = crud.create_post(user_id, question_id, post_date, caption)
    db.session.add(new_post)
    db.session.commit()

    new_image = crud.create_image(new_post.post_id, img_url) 
    db.session.add(new_image)
    db.session.commit()

    return redirect('/landing-page')


if __name__ == "__main__":
    connect_to_db(app)
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0", debug=True)