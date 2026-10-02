import { useState } from "react";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Medicamentos from "./components/Medicamentos";

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
    </>
  );
}

export default App;