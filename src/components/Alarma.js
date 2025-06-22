import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import "../styles/alarma.css";

function Alarma() {
  const [nuevaHora, setNuevaHora] = useState("");
  const [nombreAlarma, setNombreAlarma] = useState("");
  const [alarmas, setAlarmas] = useState(() => {
    try {
      const guardadas = localStorage.getItem("alarmas");
      return guardadas ? JSON.parse(guardadas) : [];
    } catch (e) {
      console.error("❌ Error leyendo alarmas:", e);
      return [];
    }
  });
  const [activadas, setActivadas] = useState([]);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("alarmas", JSON.stringify(alarmas));
  }, [alarmas]);

  // Verificar alarmas cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      const ahora = new Date();
      const horaActual = ahora.toTimeString().slice(0, 5);

      alarmas.forEach((alarma, index) => {
        if (alarma.hora === horaActual && !activadas.includes(index)) {
          mostrarPantallaAlarma(alarma);
=======
import "../styles/alarma.css"; // Estilos separados

function Alarma() {
  const [nuevaHora, setNuevaHora] = useState("");
  const [alarmas, setAlarmas] = useState([]);
  const [activadas, setActivadas] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const ahora = new Date();
      const horaActual = `${ahora.getHours().toString().padStart(2, "0")}:${ahora
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      alarmas.forEach((alarma, index) => {
        if (alarma.hora === horaActual && !activadas.includes(index)) {
          alert(`⏰ ¡Alarma activada! (${alarma.hora})`);
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
          setActivadas((prev) => [...prev, index]);
        }
      });
    }, 1000);
<<<<<<< HEAD

    return () => clearInterval(intervalo);
  }, [alarmas, activadas]);

  const mostrarPantallaAlarma = (alarma) => {
    const mensaje = `⏰ ${alarma.nombre || "¡Alarma activada!"} - ${alarma.hora}`;

    const overlay = document.createElement("div");
    overlay.className = "alarma-overlay"; // Usa la clase CSS
    overlay.textContent = mensaje;

    // Al hacer clic, eliminar el overlay
    overlay.onclick = () => {
      document.body.removeChild(overlay);
    };

    document.body.appendChild(overlay);
  };

  const agregarAlarma = () => {
    if (!nuevaHora) return;
    const nueva = { hora: nuevaHora, nombre: nombreAlarma.trim() };
    setAlarmas((prev) => [...prev, nueva]);
    setNuevaHora("");
    setNombreAlarma("");
=======
    return () => clearInterval(interval);
  }, [alarmas, activadas]);

  const agregarAlarma = () => {
    if (nuevaHora && !alarmas.find((a) => a.hora === nuevaHora)) {
      setAlarmas((prev) => [...prev, { hora: nuevaHora }]);
      setNuevaHora("");
    }
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
  };

  const eliminarAlarma = (index) => {
    setAlarmas((prev) => prev.filter((_, i) => i !== index));
    setActivadas((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="alarma-container">
      <h2 className="alarma-title">⏰ Gestión de Alarmas</h2>

      <div className="alarma-input-container">
        <input
          type="time"
          value={nuevaHora}
          onChange={(e) => setNuevaHora(e.target.value)}
          className="alarma-input"
        />
<<<<<<< HEAD
        <input
          type="text"
          placeholder="Nombre de la alarma"
          value={nombreAlarma}
          onChange={(e) => setNombreAlarma(e.target.value)}
          className="alarma-input"
        />
=======
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
        <button onClick={agregarAlarma} className="alarma-agregar">
          Agregar Alarma
        </button>
      </div>

      {alarmas.length === 0 ? (
        <p className="alarma-empty">No hay alarmas programadas.</p>
      ) : (
        <ul className="alarma-lista">
          {alarmas.map((alarma, index) => (
            <li key={index} className="alarma-item">
<<<<<<< HEAD
              <span className="alarma-hora">
                🕒 {alarma.hora} {alarma.nombre && `- ${alarma.nombre}`}
              </span>
=======
              <span className="alarma-hora">{alarma.hora}</span>
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
              <button
                onClick={() => eliminarAlarma(index)}
                className="alarma-eliminar"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Alarma;
