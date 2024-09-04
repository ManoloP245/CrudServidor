import React, { useState, useEffect, useRef } from "react";
import process from 'process';

const API = process.env.REACT_APP_URI || 'http://localhost:5000';
console.log(API)

export function Animales() {
  const [nombre_animal, setNombre_animal] = useState("");
  const [tipo_animal, setTipo_animal] = useState("");
  const [altura_animal, setAltura_animal] = useState("");
  const [peso_animal, setPeso_animal] = useState("");
  const [id, setId] = useState("");

  const nombreInput = useRef([]);

  const [editing, setEditing] = useState(false);
  const [animales, setAnimales] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/animal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_animal,
          tipo_animal,
          altura_animal,
          peso_animal,
        }),
      });
      const data = await res.json();
      console.log(data);
    } else {
      const res = await fetch(`${API}/animal/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_animal,
          tipo_animal,
          altura_animal,
          peso_animal,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }

    await consultarAnimales();
    setNombre_animal("");
    setTipo_animal("");
    setAltura_animal("");
    setPeso_animal("");
    nombreInput.current.focus();
  };

  const consultarAnimales = async () => {
    const res = await fetch(`${API}/animal`);
    const data = await res.json();
    setAnimales(data);
    console.log(data);
  };

  useEffect(() => {
    consultarAnimales();
  }, []);

  const editarAnimal = async (id) => {
    const res = await fetch(`${API}/animal/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(data._id);
    setNombre_animal(data.nombre_animal);
    setTipo_animal(data.tipo_animal);
    setAltura_animal(data.altura_animal);
    setPeso_animal(data.peso_animal);
  };
  const eliminarAnimal = async (id) => {
    const animalResponse = window.confirm("Estas seguro de eliminar el animal");
    if (animalResponse) {
      const res = await fetch(`${API}/animal/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      consultarAnimales();
    }
  };

  return (
    <div className="row justify-content-center my-4">
    <div className="col-md-4">
      <form onSubmit={handleSubmit} className="card card-body shadow-sm border-0">
        <h3 className="text-center mb-4">
          {editing ? 'Editar Animal' : 'Registrar Animal'}
        </h3>
        <div className="form-group mb-3">
          <input
            type="text"
            onChange={(e) => setNombre_animal(e.target.value)}
            value={nombre_animal}
            className="form-control"
            placeholder="Ingrese el nombre del animal"
            autoFocus
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            onChange={(e) => setTipo_animal(e.target.value)}
            value={tipo_animal}
            className="form-control"
            placeholder="Ingrese el tipo de animal"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="number"
            onChange={(e) => setAltura_animal(e.target.value)}
            value={altura_animal}
            className="form-control"
            placeholder="Ingrese la altura del animal"
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="number"
            onChange={(e) => setPeso_animal(e.target.value)}
            value={peso_animal}
            className="form-control"
            placeholder="Ingrese el peso del animal"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          {editing ? 'Editar animal' : 'Registrar animal'}
        </button>
      </form>
    </div>
    <div className="col-md-6">
      <table className="table table-striped table-hover shadow-sm mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal) => (
            <tr key={animal._id}>
              <td>{animal.nombre_animal}</td>
              <td>{animal.tipo_animal}</td>
              <td>{animal.altura_animal}</td>
              <td>{animal.peso_animal}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarAnimal(animal._id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarAnimal(animal._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
}
