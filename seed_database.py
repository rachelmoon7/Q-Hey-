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
with open('data/prompts.json') as f:
    prompt_data = json.loads(f.read())

questions_in_db = []
# for question in prompt_data:
#     question = 