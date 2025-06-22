// src/components/LoginRegistro.jsx
import React, { useState } from "react";
import "../styles/loginregistro.css";

const LoginRegistro = ({ onLogin }) => {
  const [esRegistro, setEsRegistro] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const ruta = esRegistro ? "registro" : "login";
    const datos = esRegistro
      ? { email, nombre, contraseña }
      : { email, contraseña };

    try {
      setCargando(true);

      const respuesta = await fetch(`http://localhost:4000/api/auth/${ruta}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        console.error("❌ Error del servidor:", resultado);
        alert(resultado.mensaje || "Error al iniciar sesión o registrarse.");
        return;
      }

      localStorage.setItem("token", resultado.token);
      localStorage.setItem("usuario", JSON.stringify(resultado.usuario));

      alert(resultado.mensaje || "Sesión iniciada correctamente.");
      onLogin(resultado.usuario);

    } catch (error) {
      console.error("❌ Error de red o backend:", error);
      alert("No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-registro-container">
      <h2>{esRegistro ? "Registro" : "Iniciar sesión"}</h2>

      <form onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {esRegistro && (
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        )}

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando
            ? esRegistro
              ? "Registrando..."
              : "Iniciando sesión..."
            : esRegistro
            ? "Registrarse"
            : "Entrar"}
        </button>
      </form>

      <p
        onClick={() => setEsRegistro(!esRegistro)}
        style={{ cursor: "pointer", marginTop: "10px" }}
      >
        {esRegistro
          ? "¿Ya tienes cuenta? Inicia sesión"
          : "¿No tienes cuenta? Regístrate"}
      </p>
    </div>
  );
};

export default LoginRegistro;
