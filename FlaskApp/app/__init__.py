import pymongo
import pprint
import json
from flask import Flask
from pymongo import MongoClient
from flask import jsonify
from flask import render_template
from flask import request

app = Flask(__name__)

client = MongoClient()
teste_db = client.teste_db
catalogo = teste_db.catalogo

@app.route('/')
def index():
    return render_template('Index.html');

@app.route('/get_records', methods=['GET'])
def get_records():
    try:
        collection = catalogo.find()
        listaOrganizada = []
        for person in collection:
            personItem = {
                'nome':person['nome'],
                'telefone':person['telefone'],
                'email':person['email']
            };
            listaOrganizada.append(personItem);
    except Exception,e:
        return str(e)
    a = jsonify(listaOrganizada)
    return a

@app.route('/insert_records', methods=['POST'])
def insert_records():
    try:
        post = request.get_json(force=True)
        name = post.get('nome')
        phoneNumber = post.get('telefone')
        emailAdress = post.get('email')

        catalogo.insert_one({
            'nome':name,
            'telefone':phoneNumber,
            'email':emailAdress
	})
        return jsonify(status='OK',message='inserted successfully')

    except Exception,e:
        return jsonify(status='ERROR',message=str(e))
   
if __name__ == "__main__":
    app.run()




