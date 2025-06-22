<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import LoginRegistro from "./components/LoginRegistro";
=======
import React, { useState } from "react";
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
import NotasAvances from "./components/NotasAvances";
import NotasConciliacion from "./components/NotasConciliacion";
import PlantillaSelector from "./components/PlantillaSelector";
import Sidebar from "./components/Sidebar";
import TorreSelector from "./components/TorreSelector";
import PlantillasAdicionales from "./components/PlantillasAdicionales";
import PlantillaDetalle from "./components/PlantillaDetalle";
import Alarma from "./components/Alarma";
import NovedadesAsesor from "./components/NovedadesAsesor";
import EnvioCorreos from "./components/EnvioCorreos";
import Aplicativos from "./components/Aplicativos";
<<<<<<< HEAD

import "./styles/main.css";

function App() {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem("usuario");
      return guardado && guardado !== "undefined" ? JSON.parse(guardado) : null;
    } catch (error) {
      console.error("❌ Error al leer usuario desde localStorage:", error);
      return null;
    }
  });

=======
import "./styles/main.css";

function App() {
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
  const [tipoNota, setTipoNota] = useState("");
  const [torre, setTorre] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vistaEspecial, setVistaEspecial] = useState("");
  const [modoB2B, setModoB2B] = useState(false);
  const [vista, setVista] = useState("inicio");
  const [pantallaBlanca, setPantallaBlanca] = useState(false);
  const [plantilla, setPlantilla] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

<<<<<<< HEAD
  const [notasConfirmacion, setNotasConfirmacion] = useState({
    notaPublica: "",
    notaInterna: "",
  });

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  useEffect(() => {
    const cargarNotasConfirmacion = async () => {
      try {
        const response = await fetch("/NOTAS_DESPACHO.xlsx");
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];

          const notaPublica = sheet["E3"] ? sheet["E3"].v : "";
          const notaInterna = sheet["E4"] ? sheet["E4"].v : "";

          setNotasConfirmacion({
            notaPublica: notaPublica.toString().trim(),
            notaInterna: notaInterna.toString().trim(),
          });
        };

        reader.readAsArrayBuffer(blob);
      } catch (error) {
        console.error("Error al leer archivo Excel para notas confirmacion:", error);
      }
    };

    cargarNotasConfirmacion();
  }, []);

=======
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  const handleSelectTipoNota = (nota) => {
    setTipoNota(nota);
    setVistaEspecial("");
    setPantallaBlanca(false);

    if (nota === "DESPACHO B2B") {
      setModoB2B(true);
      setTorre("");
    } else {
      setModoB2B(false);
    }

    setVista("");
  };

  const handleTorreSeleccionada = (torreSeleccionada) => {
    setTorre(torreSeleccionada);
    setPantallaBlanca(true);
  };

  const handleVistaEspecial = (vista) => {
    setVistaEspecial(vista);
    setTipoNota("");
    setPantallaBlanca(false);
  };

  const handleVolverInicio = () => {
    setVista("inicio");
    setTipoNota("");
    setTorre("");
    setModoB2B(false);
    setVistaEspecial("");
    setPantallaBlanca(false);
  };

<<<<<<< HEAD
  function NotaConfirmacion({ textoNota }) {
    const [texto, setTexto] = useState(textoNota);

    useEffect(() => {
      setTexto(textoNota);
    }, [textoNota]);

    const copiarTexto = () => {
      navigator.clipboard.writeText(texto);
      alert("Texto copiado al portapapeles");
    };

    return (
      <div className="plantilla-container">
        <div className="plantilla-card">
          <h2 className="plantilla-title">Nota de Confirmación</h2>
          <textarea
            className="plantilla-textarea"
            rows="5"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <div className="plantilla-buttons">
            <button onClick={copiarTexto} className="plantilla-button copy">
              Copiar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {!usuario ? (
        <LoginRegistro onLogin={setUsuario} />
      ) : (
        <>
          {torre && (
            <div className="torre-fija">
              TU TORRE ES: <span style={{background:"linear-gradient(to right, #3b82f6, #0e40af)" }}>{torre}</span>
            </div>
          )}

          <Sidebar
            onSelectTipoNota={handleSelectTipoNota}
            isOpen={menuOpen}
            onClose={handleMenuOpen}
            onVistaEspecial={handleVistaEspecial}
            torreSeleccionada={torre}
            modoB2B={modoB2B}
            onVolverInicio={handleVolverInicio}
            cerrarSesion={cerrarSesion}
          />

          <div className="main-container">
            {pantallaBlanca ? (
              <div style={{ backgroundColor: "white", height: "100vh", width: "100vw" }}></div>
            ) : vista === "inicio" ? (
              <h1 className="title">BIENVENID@, {usuario.nombre?.toUpperCase()}</h1>
            ) : modoB2B && !torre ? (
              <TorreSelector onSelect={handleTorreSeleccionada} />
            ) : vistaEspecial === "notasAvances" ? (
              <NotasAvances torre={torre} usuario={usuario} />
            ) : vistaEspecial === "notasConciliacion" ? (
              <NotasConciliacion torre={torre} />
            ) : vistaEspecial === "plantillasAdicionales" ? (
              <PlantillasAdicionales torre={torre} />
            ) : tipoNota === "confirmacionPublica" ? (
              <NotaConfirmacion textoNota={notasConfirmacion.notaPublica} />
            ) : tipoNota === "confirmacionInterna" ? (
              <NotaConfirmacion textoNota={notasConfirmacion.notaInterna} />
            ) : vistaEspecial === "envioInicio" ||
              vistaEspecial === "envioCierre" ||
              vistaEspecial === "envioApertura" ? (
              <EnvioCorreos tipo={vistaEspecial} />
            ) : vistaEspecial === "alarma" ? (
              <Alarma />
            ) : vistaEspecial === "aplicativos" ? (
              <Aplicativos />
            ) : vistaEspecial === "novedadesAsesor" ? (
              <NovedadesAsesor />
            ) : (
              <>
                {!modoB2B && !torre && tipoNota && (
                  <TorreSelector onSelect={handleTorreSeleccionada} />
                )}

                {torre &&
                  tipoNota &&
                  tipoNota !== "confirmacionPublica" &&
                  tipoNota !== "confirmacionInterna" && (
                    <>
                      <PlantillaSelector
                        torre={torre}
                        tipoNotaExterna={tipoNota}
                        onSelect={(p) => {
                          setPlantilla(p);
                          setMostrarDetalle(false);
                        }}
                      />
                      {plantilla && mostrarDetalle && (
                        <PlantillaDetalle plantilla={plantilla} />
                      )}
                    </>
                  )}
              </>
            )}
          </div>
        </>
      )}
=======
  return (
    <div className="app-container">
      {torre && (
        <div className="torre-fija">
          TU TORRE ES: <span style={{ color: "#367bf2" }}>{torre}</span>
        </div>
      )}

      <Sidebar
        onSelectTipoNota={handleSelectTipoNota}
        isOpen={menuOpen}
        onClose={handleMenuOpen}
        onVistaEspecial={handleVistaEspecial}
        torreSeleccionada={torre}
        modoB2B={modoB2B}
        onVolverInicio={handleVolverInicio}
      />

      <div className="main-container">
        {pantallaBlanca ? (
          <div
            style={{
              backgroundColor: "white",
              height: "100vh",
              width: "100vw",
            }}
          ></div>
        ) : vista === "inicio" ? (
          <h1 className="title">BIENVENIDO ASESOR</h1>
        ) : modoB2B && !torre ? (
          <TorreSelector onSelect={handleTorreSeleccionada} />
        ) : vistaEspecial === "notasAvances" ? (
          <NotasAvances torre={torre} />
        ) : vistaEspecial === "notasConciliacion" ? (
          <NotasConciliacion torre={torre} />
        ) : vistaEspecial === "plantillasAdicionales" ? (
          <PlantillasAdicionales torre={torre} />
        ) : vistaEspecial === "envioInicio" ||
          vistaEspecial === "envioCierre" ||
          vistaEspecial === "envioApertura" ? (
          <EnvioCorreos tipo={vistaEspecial} />
        ) : vistaEspecial === "alarma" ? (
          <Alarma />
        ) : vistaEspecial === "aplicativos" ? (
          <Aplicativos />
        ) : vistaEspecial === "novedadesAsesor" ? (
          <NovedadesAsesor />
        ) : (
          <>
            {!modoB2B && !torre && tipoNota && (
              <TorreSelector onSelect={handleTorreSeleccionada} />
            )}

            {torre && tipoNota && (
              <>
                <PlantillaSelector
                  torre={torre}
                  tipoNotaExterna={tipoNota}
                  onSelect={(p) => {
                    setPlantilla(p);
                    setMostrarDetalle(false);
                  }}
                />
                {plantilla && mostrarDetalle && (
                  <PlantillaDetalle plantilla={plantilla} />
                )}
              </>
            )}
          </>
        )}
      </div>
>>>>>>> cc840baba70a7dfc69cd1966a9e03346c5876088
    </div>
  );
}

export default App;
