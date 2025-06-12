import React from "react";
import "../styles/plantillas.css";

function TorreSelector({ onSelect }) {
  const torres = [
    "ANTIOQUIA CENTRO",
    "ANTIOQUIA ORIENTE",
    "EDATEL",
    "BOGOTA",
    "OPC_BASIC",
    "SANTANDER",
    "COSTA"
  ];

  return (
    <div className="torre-selector-container">
      <h2 className="torre-selector-title">SELECCIONA TU TORRE:</h2>
      <div className="torre-buttons">
        {torres.map((torre) => (
          <button
            key={torre}
            className="torre-button"
            onClick={() => onSelect(torre)}
          >
            {torre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TorreSelector;
