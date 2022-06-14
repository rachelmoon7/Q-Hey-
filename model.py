"""Models for Q&Hey! app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

"""
Association table between users to define a many-to-many relationship between one user and another user.
There will be direct interation with this table.
"""
friend = db.Table(
    'friends', 
    db.Column('friend_id', db.Integer, primary_key=True),
    db.Column('f1_id', db.Integer, db.ForeignKey('users.user_id')),
    db.Column('f2_id', db.Integer, db.ForeignKey('users.user_id')),
)


class User(db.Model):
    """A user."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True
                        )
    fname = db.Column(db.String, nullable=False)  
    lname = db.Column(db.String, nullable=False)                     
    username = db.Column(db.String, unique=True, nullable=False)                                
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # self.posts (posts attribute) was given to us by backref in class Post


    #c is sqlalchemy attribute for a column so friend.c.f1-id = column in friend table with f1_id id 
    #backref gives us a free attribute, so User has free attribute, followers 
    following = db.relationship(
                                'User',
                                secondary=friend,
                                primaryjoin=user_id == friend.c.f1_id,
                                secondaryjoin=user_id == friend.c.f2_id,
                                backref='followers'
                                )

    #call this fcn to get all frineds of given users so don't use backref ^ directly
    #self.followers (followers attribute) was given to us by backref
    def get_all_friends(self):
        """Get all friends, those you are following AND those following you."""
        return self.following + self.followers
    
    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Post(db.Model):
    """A post."""

    __tablename__ = "posts"

    post_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    prompt_id = db.Column(db.Integer, db.ForeignKey("prompts.prompt_id"), nullable=False)
    post_date = db.Column(db.Date)

    user = db.relationship("User", backref="posts")
    prompt = db.relationship("Prompt", backref="posts")

    def __repr__(self):
        return f'<Post post_id={self.post_id} post_date={self.post_date}>'


class Image(db.Model):
    """Image(s) in response to a prompt."""

    __tablename__ = "images"

    image_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.post_id"), nullable=False)
    img_URL = db.Column(db.String)

    post = db.relationship("Post", backref="images")

    def __repr__(self):
        return f'<Image image_id={self.image_id}>'


class Prompt(db.Model):
    """A prompt."""

    __tablename__ = "prompts"

    prompt_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    question = db.Column(db.String, nullable=False)

    # self.posts (posts attribute) was given to us by backref in class Post

    def __repr__(self):
        return f'<Prompt prompt_id={self.prompt_id}>'


def connect_to_db(flask_app, db_uri="postgresql:///project", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)




