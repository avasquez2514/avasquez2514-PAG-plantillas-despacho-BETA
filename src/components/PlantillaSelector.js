import React, { useEffect, useState } from "react";
import "../styles/plantillas.css";

function PlantillaSelector({ torre, onSelect }) {
  const [plantillas, setPlantillas] = useState({});
  const [notaSeleccionada, setNotaSeleccionada] = useState("");
  const [tipoNota, setTipoNota] = useState("publica");
  const [textoNota, setTextoNota] = useState("");
  const [textoModificado, setTextoModificado] = useState(false);

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
  }, []);

  useEffect(() => {
    if (notaSeleccionada && plantillas[notaSeleccionada] && !textoModificado) {
      const encabezado = `Gestión-MOC-Torre ${torre}:`;
      const nota =
        tipoNota === "publica"
          ? plantillas[notaSeleccionada].notaPublica
          : plantillas[notaSeleccionada].notaInterna;

      const textoCompleto =
        tipoNota === "publica" ? nota : `${encabezado}\n\n${nota}`;

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

}

export default PlantillaSelector;
