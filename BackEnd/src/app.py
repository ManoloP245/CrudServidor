from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/bd_Zoo'
mongo = PyMongo(app)
CORS(app)


db = mongo.db.animales


@app.route('/animal', methods=['POST'])
def crearAnimal():
    id = db.insert_one({
        'nombre_animal': request.json['nombre_animal'],
        'tipo_animal': request.json['tipo_animal'],
        'altura_animal': request.json['altura_animal'],
        'peso_animal': request.json['peso_animal']
    })
    return jsonify({'_id': str(id.inserted_id)})

   


@app.route('/animal', methods=['GET'])
def consultarAnimales():
    animales = []
    for doc in db.find():
        animales.append({
            '_id': str(ObjectId(doc['_id'])),
            'nombre_animal': doc['nombre_animal'],
            'tipo_animal': doc['tipo_animal'],
            'altura_animal': doc['altura_animal'],
            'peso_animal': doc['peso_animal']
        })
   
    return jsonify(animales)


@app.route('/animal/<id>', methods=['GET'])
def consultarAnimal(id):
    animal = db.find_one({'_id': ObjectId(id)})
    print(animal)
    return jsonify({
        '_id': str(ObjectId(animal['_id'])),
        'nombre_animal': animal['nombre_animal'],
        'tipo_animal': animal['tipo_animal'],
        'altura_animal': animal['altura_animal'],
        'peso_animal': animal['peso_animal'],
    })


@app.route('/animal/<id>', methods=['PUT'])
def editarAnimal(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'nombre_animal': request.json['nombre_animal'],
        'tipo_animal': request.json['tipo_animal'],
        'altura_animal': request.json['altura_animal'],
        'peso_animal': request.json['peso_animal']  
    }})
    return jsonify({'msg': 'Animal editado'})


@app.route('/animal/<id>', methods=['DELETE'])
def eliminarAnimal(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Animal eliminado'})


if __name__ == "__main__":
    app.run(debug=True)