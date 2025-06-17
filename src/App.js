import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

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

import "./styles/main.css";

function App() {
  const [tipoNota, setTipoNota] = useState("");
  const [torre, setTorre] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [vistaEspecial, setVistaEspecial] = useState("");
  const [modoB2B, setModoB2B] = useState(false);
  const [vista, setVista] = useState("inicio");
  const [pantallaBlanca, setPantallaBlanca] = useState(false);
  const [plantilla, setPlantilla] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const [notasConfirmacion, setNotasConfirmacion] = useState({
    notaPublica: "",
    notaInterna: "",
  });

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
      {torre && (
        <div className="torre-fija">
          TU TORRE ES: <span style={{ color: "#6D9DEF" }}>{torre}</span>
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
    </div>
  );
}

export default App;
