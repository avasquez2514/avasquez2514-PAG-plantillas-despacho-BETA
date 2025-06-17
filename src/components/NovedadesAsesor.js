import React, { useState, useEffect } from "react";
import "../styles/novedadesAsesor.css";

function NovedadesAsesor() {
  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState(null);
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    const guardadas = localStorage.getItem("novedadesAsesor");
    if (guardadas) setNovedades(JSON.parse(guardadas));
  }, []);

  useEffect(() => {
    localStorage.setItem("novedadesAsesor", JSON.stringify(novedades));
  }, [novedades]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const agregarNovedad = () => {
    if (texto.trim() === "") return;

    const ahora = new Date();
    const fecha = ahora.toLocaleDateString("es-CO");
    const hora = ahora.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const nuevaNovedad = {
      id: Date.now(),
      texto,
      imagen,
      fechaHora: `${fecha} ${hora}`,
    };

    setNovedades([nuevaNovedad, ...novedades]);
    setTexto("");
    setImagen(null);
  };

  const eliminarNovedad = (id) => {
    setNovedades(novedades.filter((n) => n.id !== id));
  };

  return (
    <div className="novedades-container">
      <h2 className="novedades-titulo">📝 Novedades Asesor</h2>

      <textarea
        className="novedades-textarea"
        rows="4"
        placeholder="Escribe la novedad..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <label className="novedades-imagen-label">
        📷 Agregar imagen:
        <input type="file" accept="image/*" onChange={handleImagenChange} />
      </label>
      {imagen && (
        <div className="novedades-preview">
          <img src={imagen} alt="preview" />
        </div>
      )}

      <button className="btn guardar" onClick={agregarNovedad}>
        Guardar Novedad
      </button>

      <hr className="novedades-divider" />

      <h3>🗂️ Listado de Novedades</h3>
      {novedades.length === 0 ? (
        <p className="novedades-vacio">No hay novedades aún.</p>
      ) : (
        <ul className="novedades-lista">
          {novedades.map((n) => (
            <li key={n.id} className="novedades-item">
              <p><strong>{n.fechaHora}</strong></p>
              <p>{n.texto}</p>
              {n.imagen && <img src={n.imagen} alt="novedad" />}
              <button className="btn eliminar" onClick={() => eliminarNovedad(n.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NovedadesAsesor;
