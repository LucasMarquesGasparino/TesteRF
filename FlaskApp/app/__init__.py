import pymongo
import pprint
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient()
db = client.teste_db
collection = db.catalogo



@app.route('/')
def index():
    return "Index"

@app.route('/get_records')
def get_records():
    return "Get"

@app.route('/insert_records')
def insert_records():
    return "Set"

if __name__ == "__main__":
    app.run()


