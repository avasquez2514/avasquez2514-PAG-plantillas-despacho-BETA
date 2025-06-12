import React from "react";
import "../styles/plantillas.css";

function PlantillaDetalle({ plantilla }) {
  return (
    <div className="plantilla-detalle-container">
      <h3 className="plantilla-detalle-title">PLANTILLA SELECCIONADA</h3>
      <div className="plantilla-detalle-texto">
        {plantilla
          ? plantilla.split("\n").map((linea, index) => (
              <p key={index}>{linea}</p>
            ))
          : "No se ha seleccionado ninguna plantilla."}
      </div>
    </div>
  );
}

export default PlantillaDetalle;
