import React, { useState, useEffect } from "react";
import "../styles/envioCorreos.css";

function EnvioCorreos({ tipo = "envioInicio" }) {
  const [para, setPara] = useState("");
  const [cc, setCc] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [titulo, setTitulo] = useState("");

  // Establecer título según tipo
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

  // Cargar contenido desde localStorage
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(`correos_${tipo}`));
      if (data) {
        setPara(data.para || "");
        setCc(data.cc || "");
        setAsunto(data.asunto || "");
        setMensaje(data.mensaje || "");
      }
    } catch (err) {
      const legacy = localStorage.getItem(`correos_${tipo}`);
      setMensaje(legacy || "");
      setPara("");
      setCc("");
      setAsunto("");
      console.warn("⚠️ Contenido antiguo detectado. Se carga solo como mensaje.");
    }
  }, [tipo]);

  const copiarTexto = (texto, nombre = "Texto") => {
    navigator.clipboard.writeText(texto);

  };

  const copiarTodo = () => {
    const textoCompleto = `Para:\n${para}\n\nCC:\n${cc}\n\nAsunto:\n${asunto}\n\n${mensaje}`;
    navigator.clipboard.writeText(textoCompleto);
  };

  const guardarTodo = () => {
    const data = { para, cc, asunto, mensaje };
    localStorage.setItem(`correos_${tipo}`, JSON.stringify(data));
    alert("Informacion guardada");
  };

  return (
    <div className="envio-container">
      <h2 className="envio-titulo">{titulo}</h2>

      <label className="envio-label">Para:</label>
      <textarea
        className="envio-textarea"
        value={para}
        onChange={(e) => setPara(e.target.value)}
        placeholder="Direcciones de correo para..."
      />
      <button className="btn-mini" onClick={() => copiarTexto(para, "Para")}>
        Copiar Para
      </button>

      <label className="envio-label">CC:</label>
      <textarea
        className="envio-textarea"
        value={cc}
        onChange={(e) => setCc(e.target.value)}
        placeholder="Direcciones en copia..."
      />
      <button className="btn-mini" onClick={() => copiarTexto(cc, "CC")}>
        Copiar CC
      </button>

      <label className="envio-label">Asunto:</label>
      <input
        className="envio-input"
        type="text"
        value={asunto}
        onChange={(e) => setAsunto(e.target.value)}
        placeholder="Asunto del correo..."
      />
      <button className="btn-mini" onClick={() => copiarTexto(asunto, "Asunto")}>
        Copiar Asunto
      </button>

      <label className="envio-label">Mensaje:</label>
      <textarea
        className="envio-textarea"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe aquí el cuerpo del correo..."
        style={{ minHeight: "150px" }}
      />

      <div className="envio-botones">
        <button className="btn" onClick={copiarTodo}>
          Copiar Todo
        </button>
        <button className="btn" onClick={guardarTodo}>
          Guardar
        </button>
      </div>
    </div>
  );
}

export default EnvioCorreos;
