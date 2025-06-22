import React, { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import * as XLSX from "xlsx";
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
import "../styles/plantillas.css";

function PlantillaSelector({ torre, onSelect }) {
  const [plantillas, setPlantillas] = useState({});
  const [notaSeleccionada, setNotaSeleccionada] = useState("");
  const [tipoNota, setTipoNota] = useState("publica");
  const [textoNota, setTextoNota] = useState("");
  const [textoModificado, setTextoModificado] = useState(false);

<<<<<<< HEAD
  const API = "http://localhost:4000/api/notas";

  const cargarPlantillas = async () => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!token || !usuario?.id) {
      console.error("❌ No hay token o usuario en localStorage.");
      return;
    }

    try {
      const res = await fetch(`${API}/${usuario.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("🟢 Plantillas recibidas:", data);

      const agrupadas = {};
      data.forEach((row) => {
        const novedad = row.novedad || "Sin título";
        agrupadas[novedad] = {
          id: row.id,
          notaPublica: row.nota_publica || "",
          notaInterna: row.nota_interna || "",
        };
      });

      setPlantillas(agrupadas);
    } catch (error) {
      console.error("Error cargando plantillas:", error);
    }
  };

  useEffect(() => {
    cargarPlantillas();
=======
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
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
  }, []);

  useEffect(() => {
    if (notaSeleccionada && plantillas[notaSeleccionada] && !textoModificado) {
<<<<<<< HEAD
      const encabezado = `Gestión-MOC-Torre ${torre}:`;
=======
      const encabezado = `Gestión-MOC-Torre ${torre}:\n`;
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
      const nota =
        tipoNota === "publica"
          ? plantillas[notaSeleccionada].notaPublica
          : plantillas[notaSeleccionada].notaInterna;

      const textoCompleto =
<<<<<<< HEAD
        tipoNota === "publica" ? nota : `${encabezado}\n\n${nota}`;
=======
        tipoNota === "publica" || notaSeleccionada === "Nota de Confirmación"
          ? nota
          : `${encabezado}\n\n${nota}`;
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088

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

<<<<<<< HEAD
  const agregarPlantilla = async () => {
    const novedad = prompt("Nombre de la nueva plantilla:");
    if (!novedad) return;

    const notaPublica = prompt("Texto nota pública:") || "";
    const notaInterna = prompt("Texto nota interna:") || "";

    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!token || !usuario?.id) return;

    try {
      await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          novedad: novedad.trim(),
          nota_publica: notaPublica.trim(),
          nota_interna: notaInterna.trim(),
          usuario_id: usuario.id,
        }),
      });

      cargarPlantillas();
    } catch (error) {
      console.error("Error al agregar plantilla:", error);
    }
  };

  const modificarPlantilla = async () => {
    if (!notaSeleccionada) return;

    const actual = plantillas[notaSeleccionada];
    const token = localStorage.getItem("token");
    if (!token) return;

    const nuevaPublica = prompt("Nuevo texto nota pública:", actual.notaPublica) || "";
    const nuevaInterna = prompt("Nuevo texto nota interna:", actual.notaInterna) || "";

    try {
      await fetch(`${API}/${actual.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nota_publica: nuevaPublica.trim(),
          nota_interna: nuevaInterna.trim(),
        }),
      });

      cargarPlantillas();
      setTextoModificado(false);
    } catch (error) {
      console.error("Error modificando plantilla:", error);
    }
  };

  const eliminarPlantilla = async () => {
    if (!notaSeleccionada) return;

    const id = plantillas[notaSeleccionada].id;
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm(`¿Eliminar plantilla "${notaSeleccionada}"?`)) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotaSeleccionada("");
      setTextoNota("");
      onSelect("");
      cargarPlantillas();
    } catch (error) {
      console.error("Error al eliminar la plantilla:", error);
    }
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
          <option key={key} value={key}>{key}</option>
        ))}
      </select>

      <div className="plantilla-buttons">
        <button className="plantilla-button" onClick={agregarPlantilla}>➕Agregar</button>
        <button className="plantilla-button" onClick={modificarPlantilla}>✏️Modificar</button>
        <button className="plantilla-button" onClick={eliminarPlantilla}>🗑️Eliminar</button>
      </div>

      {notaSeleccionada && (
        <>
          <textarea
            rows="5"
            value={textoNota}
            onChange={handleTextoChange}
            className="plantilla-textarea"
          />

          <div className="plantilla-buttons">
            <button
              className={`plantilla-button publica ${tipoNota === "publica" ? "active" : ""}`}
              onClick={() => handleTipoNotaChange("publica")}
            >
              Nota Pública
            </button>
            <button
              className={`plantilla-button interna ${tipoNota === "interna" ? "active" : ""}`}
              onClick={() => handleTipoNotaChange("interna")}
            >
              Nota Interna
            </button>
          </div>

          <div className="plantilla-buttons">
            <button className="plantilla-button copy" onClick={copiarTexto}>Copiar</button>
            <button className="plantilla-button clear" onClick={limpiarTexto}>Limpiar</button>
          </div>
        </>
      )}
    </div>
  </div>
);

=======
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
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
}

export default PlantillaSelector;
