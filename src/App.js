import React, { useState } from "react";
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
    </div>
  );
}

export default App;
