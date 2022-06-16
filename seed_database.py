"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime

import crud
import model
import server

os.system("dropdb ratings")
os.system('createdb ratings')

model.connect_to_db(server.app)
model.db.create_all() #creates all tables

#open file, f, read, to string, json.loads converts string from f.read() to dict
#movie_data is a dictionary
with open('data/questions.json') as f:
    questions_data = json.loads(f.read())

for question in questions_data:
    question = (question["question"]) 

    db_questions = crud.create_question(question)
    model.db.session.add(db_questions)

model.db.session.commit()