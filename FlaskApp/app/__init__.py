import pymongo
import pprint
import json
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient("localhost")
teste_db = client.teste_db
catalogo = teste_db.catalogo


@app.route('/')
def index():
    return "index"
   

	
if __name__ == "__main__":
    app.run()

@app.route('/get_records', methods=['POST'])
def get_records():
    try:
        collection = catalogo.find()
        listaOrganizada = []
        for person in collection:
            personItem = {
                'name': person['nome'],
                'phoneNumber': person['telefone'],
                'emailAdress': person['email']
            }
            listaOrganizada.append(personItem)
    except Exception,e:
        return str(e)
    return json.dumps(listaOrganizada)

@app.route('/insert_records', methods=['POST'])
def insert_records():
    try:
        name = request.json['name']
        phoneNumber = json_data['phoneNumber']
        emailAdress = json_data['emailAdress']

        catalogo.insert_one({
            'nome':name,
            'email':phoneNumber,
            'telefone':emailAdress
	})
        return jsonify(status='OK',message='inserted successfully')

    except Exception,e:
        return jsonify(status='ERROR',message=str(e))




