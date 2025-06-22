import React, { useState } from "react";
import "../styles/sidebar.css";

function Sidebar({
  onSelectTipoNota,
  isOpen,
  onClose,
  onVistaEspecial,
  torreSeleccionada,
  onVolverInicio,
<<<<<<< HEAD
  cerrarSesion,
=======
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
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
<<<<<<< HEAD
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("alarma")}>Alarma</button>
                </li>
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("aplicativos")}>Aplicativos</button>
                </li>
=======
                {/* Menús organizados alfabéticamente */}

                {/* Alarma */}
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("alarma")}>Alarma</button>
                </li>

                {/* Aplicativos */}
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("aplicativos")}>Aplicativos</button>
                </li>

                {/* Envío de Correos */}
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
                <li
                  onMouseEnter={() => setHoverEnvioCorreos(true)}
                  onMouseLeave={() => setHoverEnvioCorreos(false)}
                  className="submenu-item"
                >
                  <button>Envío de Correos</button>
                  {hoverEnvioCorreos && (
                    <ul className="submenu-lateral">
                      <li>
<<<<<<< HEAD
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
=======
                        <button onClick={() => onVistaEspecial("envioApertura")}>Apertura</button>
                      </li>
                      <li>
                        <button onClick={() => onVistaEspecial("envioCierre")}>Cierre</button>
                      </li>
                      <li>
                        <button onClick={() => onVistaEspecial("envioInicio")}>Inicio</button>
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
                      </li>
                    </ul>
                  )}
                </li>
<<<<<<< HEAD
=======

                {/* Novedades Asesor */}
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("novedadesAsesor")}>
                    Novedades Asesor
                  </button>
                </li>

                {/* Notas de campo con submenú */}
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
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
<<<<<<< HEAD
                <li className="submenu-item">
                  <button onClick={() => onVistaEspecial("novedadesAsesor")}>
                    Novedades Asesor
                  </button>
                </li>
=======
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
              </ul>
            )}
          </li>
        </ul>
<<<<<<< HEAD

        {/* 🔒 Cerrar sesión fijo abajo */}
        <div className="logout-section">
          <button className="menu-title logout-button" onClick={cerrarSesion}>
            🔒 Cerrar sesión
          </button>
        </div>
=======
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
      </div>

      {isOpen && <div className="overlay" onClick={onClose}></div>}
    </div>
  );
}

export default Sidebar;
