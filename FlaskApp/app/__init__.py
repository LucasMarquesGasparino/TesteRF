# -*- coding: utf-8 -*-

import pymongo
import pprint
import json
from flask import Flask
from pymongo import MongoClient
from flask import jsonify
from flask import render_template
from flask import request

app = Flask(__name__)

#------------------------------
# Conexão com o banco de dados
client = MongoClient()
teste_db = client.teste_db
catalogo = teste_db.catalogo

#------------------------------------------------------
# Renderização do template (coincide com toda a página)
@app.route('/')
def index():
    return render_template('Index.html');

#-------------------------------------------------
# Transmissão dos dados do Flask para o AngulasJS
@app.route('/get_records', methods=['GET'])
def get_records():
    try:
        # Todas as tuplas
        collection = catalogo.find()
        listaOrganizada = []
        # Iteração por cada uma das tuplas
        for person in collection:
            # Agrupamento de informações num tipo legível ao JSON
            personItem = {
                'nome':person['nome'],
                'telefone':person['telefone'],
                'email':person['email']
            };
            listaOrganizada.append(personItem);
    except Exception,e:
        return str(e)
    # Serialização em JSON
    a = jsonify(listaOrganizada)
    return a

#-------------------------------------------------
# Recepção dos dados do AngularJS pelo Flask
@app.route('/insert_records', methods=['POST'])
def insert_records():
    try:
        # Desserialização em JSON
        post = request.get_json(force=True)
        # Armazenamento dos valores recebidos
        name = post.get('nome')
        phoneNumber = post.get('telefone')
        emailAdress = post.get('email')

        # Inserção dos dados na consulta Catalogo
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




