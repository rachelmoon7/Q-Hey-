"""Server for Q&Hey! app."""

from flask import (Flask, render_template, request, flash, session,
                   redirect)
from model import connect_to_db, db
import crud
from jinja2 import StrictUndefined

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
        flash("Logged in!")
        return render_template('landing-page.html')
    else:
        flash("Incorrect password!")
        return redirect('/')

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

if __name__ == "__main__":
    connect_to_db(app)
    # DebugToolbarExtension(app)
    app.run(host="0.0.0.0", debug=True)