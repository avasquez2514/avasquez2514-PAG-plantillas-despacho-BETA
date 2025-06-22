import React, { useState } from "react";
import "../styles/notasConciliacion.css";

const NotasConciliacion = () => {
  const [categorias, setCategorias] = useState([
    "CONCILIACION EQUIPOS",
    "CONCILIACION MESA",
    "CONCILIACION METRAJE",
    "CONCILIACION HOTELES",
    "CONCILIACION N2/N3",
    "CONCILIACION INVENTARIO",
    "CONCILIACION TIGO",
    "CONCILIACION CLIENTE",
    "CONCILIACION INFRAESTRUCTURA",
    "CONCILIACION CENTROS COMERCIALES",
    "CONCILIACION BMC"
  ]);

  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto)
      .then(() => {
        alert(`Texto copiado: ${texto}`);
      })
      .catch((err) => console.error("Error al copiar el texto: ", err));
  };

  const eliminarCategoria = (index) => {
    const nuevasCategorias = categorias.filter((_, i) => i !== index);
    setCategorias(nuevasCategorias);
  };

  const modificarCategoria = (index) => {
    const nuevoTexto = prompt("Ingresa el nuevo texto de la categoría:", categorias[index]);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
      const nuevasCategorias = [...categorias];
      nuevasCategorias[index] = nuevoTexto.trim();
      setCategorias(nuevasCategorias);
    }
  };

  const agregarCategoria = () => {
    const nuevaCategoria = prompt("Ingresa el nombre de la nueva categoría:");
    if (nuevaCategoria !== null && nuevaCategoria.trim() !== "") {
      setCategorias([...categorias, nuevaCategoria.trim()]);
    }
  };

  return (
    <div className="notas-conciliacion-container">
      <div className="notas-conciliacion-card">
        <h2 className="notas-conciliacion-title">🧾 Notas de Conciliación</h2>

        {/* Botón para agregar categoría */}
        <button className="agregar-button" onClick={agregarCategoria}>
          ➕ Agregar Categoría
        </button>

        {/* Lista de categorías */}
        <div className="notas-conciliacion-list">
          {categorias.map((categoria, index) => (
            <div key={index} className="conciliacion-item">
              <p className="conciliacion-texto">{categoria}</p>
              <div className="conciliacion-buttons">
                <button
                  className="conciliacion-button"
                  onClick={() => copiarTexto(categoria)}
                >
                  Copiar
                </button>
                <button
                  className="conciliacion-button eliminar"
                  onClick={() => eliminarCategoria(index)}
                >
                  Eliminar
                </button>
                <button
                  className="conciliacion-button modificar"
                  onClick={() => modificarCategoria(index)}
                >
                  Modificar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotasConciliacion;

