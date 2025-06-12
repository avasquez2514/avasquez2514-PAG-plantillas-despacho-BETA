import React, { useState, useEffect } from "react";
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
          setActivadas((prev) => [...prev, index]);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [alarmas, activadas]);

  const agregarAlarma = () => {
    if (nuevaHora && !alarmas.find((a) => a.hora === nuevaHora)) {
      setAlarmas((prev) => [...prev, { hora: nuevaHora }]);
      setNuevaHora("");
    }
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
              <span className="alarma-hora">{alarma.hora}</span>
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
