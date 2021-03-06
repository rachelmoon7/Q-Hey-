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
    # self.comments (comments attribute) was given to us by backref in class Comment
    # self.reactions (reactions attribute) was given to us by backref in class Reaction

    #c is sqlalchemy attribute for a column so friend.c.f1-id = column in friend table with f1_id id 
    #backref gives us a free attribute, so User has free attribute, followers 
    following = db.relationship(
                                'User',
                                secondary=friend,
                                primaryjoin=user_id == friend.c.f1_id,
                                secondaryjoin=user_id == friend.c.f2_id,
                                backref='followers'
                                )

    #self.followers (followers attribute) was given to us by backref
    # def get_all_friends(self):
    #     """Get all friends, those you are following AND those following you."""
    #     return self.following + self.followers
    
    def to_dict(self):
        """Convert python object to dictionary"""

        return {'user_id': self.user_id,
                'fname': self.fname, 
                'lname': self.lname, 
                'username': self.username                 
                }

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'


class Post(db.Model):
    """A post."""

    __tablename__ = "posts"

    post_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey("questions.question_id"), nullable=False)
    post_date = db.Column(db.Date)
    caption = db.Column(db.String)
    
    # self.comments (comments attribute) was given to us by backref in class Comment
    # self.reactions (reactions attribute) was given to us by backref in class Reaction
    
    user = db.relationship("User", backref="posts")
    question = db.relationship("Question", backref="posts")

    def get_week_num(self):
        """Get week number of post_date."""

        return self.post_date.isocalendar().week
        
    def to_dict(self):
        """Convert python object to dictionary"""

        return {'post_id': self.post_id, 
                'user_id': self.user_id,
                'question_id': self.question_id,
                'post_date': self.post_date,
                'caption': self.caption
                }

    def __repr__(self):
        return f'<Post post_id={self.post_id} post_date={self.post_date}>'


class Image(db.Model):
    """Image(s) in response to a question."""

    __tablename__ = "images"

    image_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.post_id"), nullable=False)
    img_URL = db.Column(db.String)

    post = db.relationship("Post", backref="images")

    def to_dict(self):
        """Convert python object to dictionary"""

        return {'image_id': self.image_id,
                'post_id': self.post_id,
                'img_URL': self.img_URL
                }

    def __repr__(self):
        return f'<Image image_id={self.image_id} image_url={self.img_URL}>'


class Question(db.Model):
    """A prompt."""

    __tablename__ = "questions"

    question_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    question = db.Column(db.String, nullable=False)

    # self.posts (posts attribute) was given to us by backref in class Post

    def __repr__(self):
        return f'<Question question_id={self.question_id}>'


class Comment(db.Model):
    """A comment on a post."""

    __tablename__ = "comments"

    comment_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.post_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    text = db.Column(db.String)
    comment_date = db.Column(db.Date)

    post = db.relationship("Post", backref="comments")
    user = db.relationship("User", backref="comments")

    def to_dict(self):
        """Convert python object to dictionary"""

        return {'comment_id': self.comment_id,
                'post_id': self.post_id, 
                'user_id': self.user_id, 
                'text': self.text,
                'comment_date': self.comment_date                 
                }

    def __repr__(self):
        return f'<Comment comment_id={self.comment_id} post_id={self.post_id} user_id={self.user_id} text={self.text}>'


class Reaction(db.Model):
    """A reaction to a post."""

    __tablename__ = "reactions"

    reaction_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.post_id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    reaction_type = db.Column(db.String)

    post = db.relationship("Post", backref="reactions")
    user = db.relationship("User", backref="reactions")
    
    def to_dict(self):
        """Convert python object to dictionary"""

        return {'reaction_id': self.reaction_id,
                'post_id': self.post_id, 
                'user_id': self.user_id, 
                'reaction_type': self.reaction_type
                }

    def __repr__(self):
        return f'<Reaction reaction_id={self.reaction_id} post_id={self.post_id} user_id={self.user_id} reaction_type={self.reaction_type}>'


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




