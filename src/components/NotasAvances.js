import React, { useEffect, useState, useCallback } from "react";
import "../styles/notasAvances.css";

const NotasAvances = ({ torre }) => {
  const [notasAvance, setNotasAvance] = useState([]);
  const prefijo = `Gestión-MOC-Torre ${torre}:\n\n`;

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");
  const usuario_id = usuario?.id;

  const cargarNotas = useCallback(async () => {
    if (!usuario_id || !token) return;

    try {
      const res = await fetch(`http://localhost:4000/api/notas/avances/${usuario_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      const filtradas = data
        .filter((n) => n.nota_avances?.trim())
        .map((n) => ({ id: n.id, texto: n.nota_avances }));

      setNotasAvance(filtradas);
    } catch (error) {
      console.error("Error al cargar notas:", error);
    }
  }, [usuario_id, token]);

  useEffect(() => {
    cargarNotas();
  }, [cargarNotas]);

  const copiarNota = (texto) => {
    navigator.clipboard.writeText(prefijo + texto)
      .then(() => alert("Nota copiada"))
      .catch((err) => console.error("Error al copiar: ", err));
  };

  const eliminarNota = async (id) => {
    if (!token) return;

    const confirmacion = window.confirm("¿Deseas eliminar esta nota de avances?");
    if (!confirmacion) return;

    try {
      await fetch(`http://localhost:4000/api/notas/avances/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarNotas();
    } catch (error) {
      console.error("Error al eliminar nota:", error);
    }
  };

  const modificarNota = async (nota) => {
    const nuevoTexto = prompt("Nuevo texto:", nota.texto);
    if (!nuevoTexto || !token) return;

    try {
      await fetch(`http://localhost:4000/api/notas/${nota.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nota_avances: nuevoTexto }),
      });
      cargarNotas();
    } catch (error) {
      console.error("Error al modificar nota:", error);
    }
  };

  const agregarNota = async () => {
    const nueva = prompt("Texto de la nueva nota:");
    if (!nueva || !usuario_id || !token) return;

    try {
      await fetch("http://localhost:4000/api/notas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          novedad: "AVANCE",
          nota_avances: nueva.trim(),
          usuario_id,
        }),
      });
      cargarNotas();
    } catch (error) {
      console.error("Error al agregar nota:", error);
    }
  };

  return (
    <div className="notas-avances-container">
      <h1 className="notas-avances-title">📌 Notas de Avances</h1>
      <button className="agregar-button" onClick={agregarNota}>➕ Agregar Nota</button>
      <div className="notas-list">
        {notasAvance.map((nota) => (
          <div key={nota.id} className="nota-item">
            <p className="nota-texto">{nota.texto}</p>
            <div className="nota-botones">
              <button onClick={() => copiarNota(nota.texto)}>Copiar</button>
              <button onClick={() => eliminarNota(nota.id)}>Eliminar</button>
              <button onClick={() => modificarNota(nota)}>Modificar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotasAvances;
