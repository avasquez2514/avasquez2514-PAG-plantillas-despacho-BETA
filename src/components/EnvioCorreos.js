import React, { useState, useEffect } from "react";
import "../styles/envioCorreos.css";

function EnvioCorreos({ tipo = "envioInicio" }) {
  const [texto, setTexto] = useState("");
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    switch (tipo) {
      case "envioInicio":
        setTitulo("📤 Envío de Correos - Inicio");
        break;
      case "envioCierre":
        setTitulo("📤 Envío de Correos - Cierre");
        break;
      case "envioApertura":
        setTitulo("📤 Envío de Correos - Apertura");
        break;
      default:
        setTitulo("📤 Envío de Correos");
    }
  }, [tipo]);

  useEffect(() => {
    const guardado = localStorage.getItem(`correos_${tipo}`);
    if (guardado) setTexto(guardado);
  }, [tipo]);

  const copiarTexto = () => {
    navigator.clipboard.writeText(texto);
    alert("Texto copiado al portapapeles");
  };

  const guardarTexto = () => {
    localStorage.setItem(`correos_${tipo}`, texto);
    alert("Correos guardados");
  };

  return (
    <div className="envio-container">
      <h2 className="envio-titulo">{titulo}</h2>
      <textarea
        className="envio-textarea"
        rows="10"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Ingresa los correos aquí separados por coma o espacio..."
      />
      <div className="envio-botones">
        <button className="btn" onClick={copiarTexto}>
          Copiar
        </button>
        <button className="btn" onClick={guardarTexto}>
          Guardar
        </button>
      </div>
    </div>
  );
}

export default EnvioCorreos;
