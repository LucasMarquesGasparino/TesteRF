import pymongo
import pprint
import json
from flask import Flask
from pymongo import MongoClient
from flask import jsonify
from flask import render_template

app = Flask(__name__)
client = MongoClient()
teste_db = client.teste_db


@app.route('/')
def index():
    return render_template('Index.html');

@app.route('/get_records', methods=['GET'])
def get_records():
    try:
        catalogo = teste_db.catalogo
        collection = catalogo.find()
        listaOrganizada = []
        for person in collection:
            personItem = {
                'nome':person['nome'],
                'telefone':person['telefone'],
                'email':person['email']
            };
            listaOrganizada.append(personItem);
        for person in listaOrganizada:
            print person
    except Exception,e:
        return str(e)
    a = json.dumps(listaOrganizada)
    return a

@app.route('/insert_records', methods=['POST'])
def insert_records():
    try:
        json_data = request.json['info']
        name = json_data['nome']
        phoneNumber = json_data['telefone']
        emailAdress = json_data['email']

        catalogo.insert_one({
            'nome':name,
            'email':phoneNumber,
            'telefone':emailAdress
	})
        return jsonify(status='OK',message='inserted successfully')

    except Exception,e:
        return jsonify(status='ERROR',message=str(e))
   
if __name__ == "__main__":
    app.run()




