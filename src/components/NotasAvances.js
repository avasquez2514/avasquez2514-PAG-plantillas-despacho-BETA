<<<<<<< HEAD
import React, { useEffect, useState, useCallback } from "react";
=======
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
import "../styles/notasAvances.css";

const NotasAvances = ({ torre }) => {
  const [notasAvance, setNotasAvance] = useState([]);
<<<<<<< HEAD
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
=======
  const [indiceActivo, setIndiceActivo] = useState(null);
  const [textoTemporal, setTextoTemporal] = useState("");

  const prefijo = `Gestión-MOC-Torre ${torre}:\n\n`;

  useEffect(() => {
    const cargarNotasDesdeExcel = async () => {
      try {
        const response = await fetch("/NOTAS_DESPACHO.xlsx");
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          const notas = jsonData
            .map((row) => row["Nota_Avances"])
            .filter((nota) => nota && typeof nota === "string");

          setNotasAvance(notas.slice(0, 10));
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error al leer el Excel:", error);
      }
    };

    cargarNotasDesdeExcel();
  }, []);

  const copiarAlPortapapeles = () => {
    navigator.clipboard.writeText(textoTemporal);
  };

  const manejarCambioTexto = (nuevoTexto) => {
    // Siempre aseguramos que el prefijo esté presente
    if (!nuevoTexto.startsWith(prefijo)) {
      nuevoTexto = prefijo + nuevoTexto.replace(prefijo, "");
    }
    setTextoTemporal(nuevoTexto);
  };

  const limpiarTexto = () => {
    setTextoTemporal("");
  };

  const seleccionarAvance = (index) => {
    setIndiceActivo(index);
    const nota = notasAvance[index] ?? "";
    setTextoTemporal(prefijo + nota);
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
  };

  return (
    <div className="notas-avances-container">
<<<<<<< HEAD
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
=======
      <h1 className="notas-avances-title">Notas de Avances</h1>

      <div className="botones-container">
        {notasAvance.map((nota, index) => (
          <button
            key={index}
            className={`boton boton-${index + 1} ${indiceActivo === index ? "activo" : ""}`}
            onClick={() => seleccionarAvance(index)}
            title={nota}
          >
            Avance {index + 1}
          </button>
        ))}
      </div>

      <div className="caja-texto-fija">
        {indiceActivo !== null ? (
          <>
            <textarea
              className="nota-textarea"
              value={textoTemporal}
              onChange={(e) => manejarCambioTexto(e.target.value)}
              rows={8}
            />

            <div className="botones-accion">
              <button className="boton-accion copiar" onClick={copiarAlPortapapeles}>
                Copiar texto
              </button>
              <button className="boton-accion limpiar" onClick={limpiarTexto}>
                Limpiar texto
              </button>
            </div>
          </>
        ) : (
          <p className="seleccion-indicacion">Seleccione un avance para editar aquí.</p>
        )}
      </div>
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
    </div>
  );
};

export default NotasAvances;
