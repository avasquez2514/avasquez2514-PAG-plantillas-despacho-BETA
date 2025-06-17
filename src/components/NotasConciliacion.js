import React from "react";
import "../styles/notasConciliacion.css";

const categorias = [
  "CONCILIACION EQUIPOS",
  "CONCILIACION MESA",
  "CONCILIACION METRAJE",
  "CONCILIACION HOTELES",
  "CONCILIACION N2/N3",
  "CONCILIACION INVENTARIO",
  "CONCILIACION TIGO",
  "CONCILIACION CLIENTE",
  "CONCILIACION INFRAESTRUCTURA",
  "CONCILIACION CENTROS COMERCIALES",
  "CONCILIACION BMC"
];

const NotasConciliacion = () => {
  const copiarTexto = (texto) => {
    navigator.clipboard.writeText(texto).then(() => {
      alert(`Texto copiado: ${texto}`);
    }).catch((err) => {
      console.error("Error al copiar el texto: ", err);
    });
  };

  return (
    <div className="notas-conciliacion-container">
      <div className="notas-conciliacion-card">
        <h2 className="notas-conciliacion-title">🧾 Notas de Conciliación</h2>
        <div className="notas-conciliacion-list">
          {categorias.map((categoria, index) => (
            <div key={index} className="conciliacion-item">
              <p className="conciliacion-texto">{categoria}</p>
              <button
                className="conciliacion-button"
                onClick={() => copiarTexto(categoria)}
              >
                Copiar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotasConciliacion;
