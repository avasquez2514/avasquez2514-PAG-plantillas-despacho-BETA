import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import "../styles/plantillasAdicionales.css";

const PlantillasAdicionales = () => {
  const [plantillas, setPlantillas] = useState([]);
  const API = "http://localhost:4000/api/notas";

  const cargarPlantillas = async () => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!token || !usuario?.id) return;

    try {
      const res = await fetch(`${API}/${usuario.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      const filtradas = data
        .filter((nota) => nota.plantilla)
        .map((nota) => ({
          id: nota.id,
          nombre: nota.novedad || "Sin título",
          texto: nota.plantilla,
        }));

      setPlantillas(filtradas);
    } catch (error) {
      console.error("Error al cargar plantillas:", error);
    }
  };

  useEffect(() => {
    cargarPlantillas();
  }, []);

  const copiarPlantilla = (texto) => {
    navigator.clipboard.writeText(texto)
      .then(() => alert("Plantilla copiada"))
      .catch((err) => console.error("Error al copiar: ", err));
  };

  const eliminarPlantilla = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${API}/plantilla/${id}`, { // 👈 nueva ruta
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarPlantillas();
    } catch (error) {
      console.error("Error al eliminar plantilla:", error);
    }
  };

  const modificarPlantilla = async (plantilla) => {
    const nuevoNombre = prompt("Nuevo título:", plantilla.nombre);
    const nuevoTexto = prompt("Nuevo contenido:", plantilla.texto);
    if (!nuevoTexto) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await fetch(`${API}/${plantilla.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          novedad: nuevoNombre,
          plantilla: nuevoTexto,
        }),
      });
      cargarPlantillas();
    } catch (error) {
      console.error("Error al modificar plantilla:", error);
    }
  };

  const agregarPlantilla = async () => {
    const nombre = prompt("Título de la nueva plantilla:");
    const texto = prompt("Contenido de la nueva plantilla:");
    if (!nombre || !texto) return;

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
          novedad: nombre,
          plantilla: texto,
          usuario_id: usuario.id,
        }),
      });
      cargarPlantillas();
    } catch (error) {
      console.error("Error al agregar plantilla:", error);
    }
=======
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
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
  };

  return (
    <div className="plantilla-container">
      <div className="plantilla-card">
<<<<<<< HEAD
        <h2 className="plantilla-title">📄 Plantillas Adicionales</h2>
        <button className="agregar-button" onClick={agregarPlantilla}>
          ➕ Agregar Plantilla
        </button>

        <div className="plantilla-list">
          {plantillas.map((plantilla) => (
            <div key={plantilla.id} className="plantilla-item">
              <h2 className="plantilla-nombre">{plantilla.nombre}</h2>
              <p className="plantilla-texto">{plantilla.texto}</p>
              <div className="plantilla-buttons">
                <button onClick={() => copiarPlantilla(plantilla.texto)}>Copiar</button>
                <button onClick={() => eliminarPlantilla(plantilla.id)}>Eliminar</button>
                <button onClick={() => modificarPlantilla(plantilla)}>Modificar</button>
              </div>
            </div>
          ))}
        </div>
=======
        <h2 className="plantilla-title">Plantillas Adicionales</h2>

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
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
      </div>
    </div>
  );
};

export default PlantillasAdicionales;
