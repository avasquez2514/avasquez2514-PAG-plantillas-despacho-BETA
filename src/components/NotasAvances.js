import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/notasAvances.css";

const NotasAvances = ({ torre }) => {
  const [notasAvance, setNotasAvance] = useState([]);
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
  };

  return (
    <div className="notas-avances-container">
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
    </div>
  );
};

export default NotasAvances;
