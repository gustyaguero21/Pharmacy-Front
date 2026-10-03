import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Medicamentos from "./components/Medicamentos";
import Categorias from "./components/Categorias";
import Empleados from "./components/Empleados";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [pagina, setPagina] = useState("dashboard");

  const iniciarSesion = () => {
    setLogueado(true);
  };

  if (!logueado) {
    return <Login iniciarSesion={iniciarSesion} />;
  }

  return (
    <>
      {pagina === "dashboard" && (
        <Dashboard setPagina={setPagina} />
      )}

      {pagina === "medicamentos" && (
        <Medicamentos setPagina={setPagina} />
      )}

      {pagina === "categorias" && (
        <Categorias setPagina={setPagina} />
      )}

      {pagina === "empleados" && (
        <Empleados setPagina={setPagina} />
      )}
    </>
  );
}

export default App;
