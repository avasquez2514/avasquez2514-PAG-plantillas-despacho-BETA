import React from "react";
import "../styles/aplicativos.css";

const enlaces = [
  { nombre: "Aplicativo 1", url: "https://enlace1.com" },
  { nombre: "Aplicativo 2", url: "https://enlace2.com" },
  { nombre: "Aplicativo 3", url: "https://enlace3.com" },
  { nombre: "Aplicativo 4", url: "https://enlace4.com" },
  { nombre: "Aplicativo 5", url: "https://enlace5.com" },
  { nombre: "Aplicativo 6", url: "https://enlace6.com" },
  { nombre: "Aplicativo 7", url: "https://enlace7.com" },
  { nombre: "Aplicativo 8", url: "https://enlace8.com" },
  { nombre: "Aplicativo 9", url: "https://enlace9.com" },
  { nombre: "Aplicativo 10", url: "https://enlace10.com" },
];

function Aplicativos() {
  const abrirEnlace = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="aplicativos-container">
      <h2 className="aplicativos-title">📁 Aplicativos Disponibles</h2>
      <div className="aplicativos-grid">
        {enlaces.map((app, index) => (
          <button
            key={index}
            className="aplicativo-btn"
            onClick={() => abrirEnlace(app.url)}
          >
            {app.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Aplicativos;
