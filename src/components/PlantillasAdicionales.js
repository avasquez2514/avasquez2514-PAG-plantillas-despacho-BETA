import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/plantillasAdicionales.css";

const PlantillasAdicionales = () => {

  const [mostrarTexto, setMostrarTexto] = useState(false);
  const [textoEditable, setTextoEditable] = useState("");

  useEffect(() => {
    const cargarExcel = async () => {
      try {
        const response = await fetch("/NOTAS_DESPACHO.xlsx");
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          // Tomamos la primera plantilla no vacía de la columna "Plantillas"
          const primeraPlantilla = jsonData
            .map((row) => row["Plantillas"])
            .find((texto) => texto && texto.trim() !== "") || "";

   
          setTextoEditable(primeraPlantilla); // Inicializamos con el texto cargado
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error cargando Excel:", error);
      }
    };

    cargarExcel();
  }, []);

  const toggleMostrarTexto = () => {
    setMostrarTexto((prev) => !prev);
  };

  return (
    <div className="plantilla-container">
      <div className="plantilla-card">
        <h2 className="plantilla-title">Selecciona tu plantilla:</h2>

        <button className="plantilla-button" onClick={toggleMostrarTexto}>
          Plantilla inventario
        </button>

        {mostrarTexto && (
          <div className="caja-texto-plantilla">
            <textarea
              rows={10}
              value={textoEditable}
              onChange={(e) => setTextoEditable(e.target.value)}
            />
            <button
              onClick={() => navigator.clipboard.writeText(textoEditable)}
              className="copiar-boton"
            >
              Copiar texto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantillasAdicionales;
