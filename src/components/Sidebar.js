import React, { useState } from "react";
import "../styles/sidebar.css";

function Sidebar({
  onSelectTipoNota,
  isOpen,
  onClose,
  onVistaEspecial,
  torreSeleccionada,
  onVolverInicio,
  cerrarSesion,
}) {
  const [isNotasDespachoOpen, setNotasDespachoOpen] = useState(false);
  const [hoverNotasSeguimiento, setHoverNotasSeguimiento] = useState(false);
  const [hoverEnvioCorreos, setHoverEnvioCorreos] = useState(false);

  const handleDespachoClick = () => {
    setNotasDespachoOpen(!isNotasDespachoOpen);
    onSelectTipoNota("DESPACHO B2B");
  };

  const handleInicioClick = () => {
    onVolverInicio();
  };

  return (
    <div className={`container ${isOpen ? "sidebar-open" : ""}`}>
      <button className={`menu-button ${isOpen ? "open" : ""}`} onClick={onClose}>
        Aplicaciones
      </button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="menu">
          <li>
            <button className="menu-title" onClick={handleInicioClick}>
              INICIO
            </button>

            <button className="menu-title" onClick={handleDespachoClick}>
              • DESPACHO B2B
            </button>

            {isNotasDespachoOpen && torreSeleccionada && (
              <ul className="submenu">
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("alarma")}>Alarma</button>
                </li>
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("aplicativos")}>Aplicativos</button>
                </li>
                <li
                  onMouseEnter={() => setHoverEnvioCorreos(true)}
                  onMouseLeave={() => setHoverEnvioCorreos(false)}
                  className="submenu-item"
                >
                  <button>Envío de Correos</button>
                  {hoverEnvioCorreos && (
                    <ul className="submenu-lateral">
                      <li>
                        <button onClick={() => onVistaEspecial("envioApertura")}>
                          Envío Apertura
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onVistaEspecial("envioCierre")}>
                          Envío Cierre
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onVistaEspecial("envioInicio")}>
                          Envío Inicio
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                <li
                  onMouseEnter={() => setHoverNotasSeguimiento(true)}
                  onMouseLeave={() => setHoverNotasSeguimiento(false)}
                  className="submenu-item"
                >
                  <button>Notas de campo</button>
                  {hoverNotasSeguimiento && (
                    <ul className="submenu-lateral">
                      <li>
                        <button onClick={() => onVistaEspecial("notasAvances")}>
                          Notas de Avances
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onVistaEspecial("notasConciliacion")}>
                          Notas de Conciliación
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onSelectTipoNota("publica")}>
                          Notas de Seguimiento
                        </button>
                      </li>
                      <li>
                        <button onClick={() => onVistaEspecial("plantillasAdicionales")}>
                          Plantillas
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("novedadesAsesor")}>
                    Novedades Asesor
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* 🔒 Cerrar sesión fijo abajo */}
        <div className="logout-section">
          <button className="menu-title logout-button" onClick={cerrarSesion}>
            🔒 Cerrar sesión
          </button>
        </div>
      </div>

      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </div>
  );
}

export default Sidebar;
