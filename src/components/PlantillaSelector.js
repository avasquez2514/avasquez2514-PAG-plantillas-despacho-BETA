import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "../styles/plantillas.css";

function PlantillaSelector({ torre, onSelect }) {
  const [plantillas, setPlantillas] = useState({});
  const [notaSeleccionada, setNotaSeleccionada] = useState("");
  const [tipoNota, setTipoNota] = useState("publica");
  const [textoNota, setTextoNota] = useState("");
  const [textoModificado, setTextoModificado] = useState(false);

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

          const notaPublica = sheet["E4"] ? sheet["E4"].v.toString().trim() : ""; // ← CAMBIO AQUÍ
          const notaInterna = sheet["E3"] ? sheet["E3"].v.toString().trim() : ""; // ← CAMBIO AQUÍ

          const plantillasObj = {
            "CONFIRMACION VISITA": {
              notaPublica,
              notaInterna,
            },
          };

          jsonData.forEach((row) => {
            const novedad = row["Novedad"]?.toString().trim() || "Sin título";
            plantillasObj[novedad] = {
              notaPublica: row["Nota_Publica"]?.toString().trim() || "",
              notaInterna: row["Nota_Interna"]?.toString().trim() || "",
            };
          });

          setPlantillas(plantillasObj);
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error al leer el archivo Excel:", error);
      }
    };

    cargarExcel();
  }, []);

  useEffect(() => {
    if (notaSeleccionada && plantillas[notaSeleccionada] && !textoModificado) {
      const encabezado = `Gestión-MOC-Torre ${torre}:\n`;
      const nota =
        tipoNota === "publica"
          ? plantillas[notaSeleccionada].notaPublica
          : plantillas[notaSeleccionada].notaInterna;

      const textoCompleto =
        tipoNota === "publica" || notaSeleccionada === "Nota de Confirmación"
          ? nota
          : `${encabezado}\n\n${nota}`;

      setTextoNota(textoCompleto);
      onSelect(textoCompleto);
    }
  }, [tipoNota, notaSeleccionada, plantillas, torre, onSelect, textoModificado]);

  const handleNotaChange = (e) => {
    setNotaSeleccionada(e.target.value);
    setTextoModificado(false);
  };

  const handleTipoNotaChange = (tipo) => {
    setTipoNota(tipo);
    setTextoModificado(false);
  };

  const handleTextoChange = (e) => {
    setTextoNota(e.target.value);
    setTextoModificado(true);
  };

  const copiarTexto = () => navigator.clipboard.writeText(textoNota);

  const limpiarTexto = () => {
    setTextoNota("");
    setTextoModificado(true);
    onSelect("");
  };

  return (
    <div className="plantilla-container">
      <div className="plantilla-card">
        <h2 className="plantilla-title">Selecciona Nota</h2>

        <select
          value={notaSeleccionada}
          onChange={handleNotaChange}
          className="plantilla-select"
        >
          <option value="">-- Selecciona una nota --</option>
          {Object.keys(plantillas).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        {notaSeleccionada && (
          <>
            <textarea
              className="plantilla-textarea"
              rows="5"
              value={textoNota}
              onChange={handleTextoChange}
            />
            <div className="plantilla-buttons">
              <button
                onClick={() => handleTipoNotaChange("publica")}
                className={`plantilla-button publica ${tipoNota === "publica" ? "active" : ""}`}
              >
                Nota Pública
              </button>
              <button
                onClick={() => handleTipoNotaChange("interna")}
                className={`plantilla-button interna ${tipoNota === "interna" ? "active" : ""}`}
              >
                Nota Interna
              </button>
            </div>
            <div className="plantilla-buttons">
              <button onClick={copiarTexto} className="plantilla-button copy">
                Copiar
              </button>
              <button onClick={limpiarTexto} className="plantilla-button clear">
                Limpiar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlantillaSelector;
