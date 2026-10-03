import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const API_EMPLOYEES_URL = "http://localhost:5000/api/v1/employees";

function Empleados({ setPagina }) {
  // =========================
  // ESTADOS PRINCIPALES
  // =========================
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // =========================
  // BUSQUEDA
  // =========================
  const [busqueda, setBusqueda] = useState("");

  // =========================
  // MODAL Y FORMULARIO
  // =========================
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  // =========================
  // MAPEAR TUPLA DE API A OBJETO
  // =========================
  // Estructura: [id, name, last_name, dni, email, position, username, password_hash]
  const mapearEmpleado = (item) => {
    if (Array.isArray(item)) {
      return {
        id: item[0],
        nombre: item[1] || "",
        apellido: item[2] || "",
        dni: item[3] || "",
        email: item[4] || "",
        cargo: item[5] || "",
        usuario: item[6] || "",
      };
    }
    return item;
  };

  // =========================
  // OBTENER TODOS LOS EMPLEADOS
  // =========================
  const cargarEmpleados = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(API_EMPLOYEES_URL);
      if (respuesta.ok) {
        const data = await respuesta.json();
        if (Array.isArray(data)) {
          setEmpleados(data.map(mapearEmpleado));
        } else {
          setEmpleados([]);
        }
      } else {
        console.error("Error al obtener empleados:", respuesta.status);
      }
    } catch (error) {
      console.error("Error de conexión al obtener empleados:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  // =========================
  // BUSCAR POR API (POR USERNAME)
  // =========================
  const buscarPorUsernameAPI = async () => {
    const query = busqueda.trim();
    if (!query) {
      cargarEmpleados();
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch(`${API_EMPLOYEES_URL}/${query}`);
      if (respuesta.ok) {
        const data = await respuesta.json();
        if (Array.isArray(data) && data.length > 0) {
          // Si devuelve un array simple representa a un solo empleado
          if (typeof data[0] === "number") {
            setEmpleados([mapearEmpleado(data)]);
          } else {
            setEmpleados(data.map(mapearEmpleado));
          }
        } else {
          setEmpleados([]);
        }
      } else {
        // Si responde 404
        setEmpleados([]);
      }
    } catch (error) {
      console.error("Error al buscar empleado:", error);
    } finally {
      setCargando(false);
    }
  };

  // =========================
  // FILTRADO LOCAL SECUNDARIO
  // =========================
  const empleadosFiltrados = empleados.filter((emp) => {
    const q = busqueda.toLowerCase();
    const nombreCompleto = `${emp.nombre} ${emp.apellido}`.toLowerCase();
    return (
      nombreCompleto.includes(q) ||
      (emp.usuario && emp.usuario.toLowerCase().includes(q)) ||
      (emp.cargo && emp.cargo.toLowerCase().includes(q)) ||
      (emp.dni && emp.dni.includes(q))
    );
  });

  // =========================
  // ABRIR MODAL: NUEVO / EDITAR
  // =========================
  const abrirNuevoEmpleado = () => {
    setModoEdicion(false);
    setEmpleadoEditando(null);

    setNombre("");
    setApellido("");
    setDni("");
    setEmail("");
    setCargo("");
    setUsuario("");
    setPassword("");

    setModalAbierto(true);
  };

  const abrirEditarEmpleado = (empleado) => {
    setModoEdicion(true);
    setEmpleadoEditando(empleado);

    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setDni(empleado.dni);
    setEmail(empleado.email);
    setCargo(empleado.cargo);
    setUsuario(empleado.usuario);
    setPassword(""); // Opcional si desea cambiar contraseña

    setModalAbierto(true);
  };

  // =========================
  // GUARDAR (POST / PUT)
  // =========================
  const guardarEmpleado = async () => {
    if (!nombre.trim() || !apellido.trim() || !dni.trim() || !email.trim() || !cargo.trim()) {
      window.alert("Por favor completa los campos obligatorios.");
      return;
    }

    if (!modoEdicion && (!usuario.trim() || !password.trim())) {
      window.alert("Usuario y contraseña son requeridos para un nuevo empleado.");
      return;
    }

    setGuardando(true);

    try {
      if (modoEdicion && empleadoEditando) {
        // 1. ACTUALIZAR DATOS PRINCIPALES (PUT /employees/:username)
        const bodyEditar = {
          name: nombre.trim(),
          last_name: apellido.trim(),
          dni: dni.trim(),
          email: email.trim(),
          position: cargo.trim(),
        };

        const resEditar = await fetch(`${API_EMPLOYEES_URL}/${empleadoEditando.usuario}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyEditar),
        });

        if (!resEditar.ok) {
          throw new Error("No se pudo actualizar la información del empleado.");
        }

        // 2. CAMBIAR CONTRASEÑA SI SE INGRESÓ UNA NUEVA (PUT /employees/:username/password)
        if (password.trim()) {
          const resPass = await fetch(`${API_EMPLOYEES_URL}/${empleadoEditando.usuario}/password`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ new_password: password.trim() }),
          });

          if (!resPass.ok) {
            window.alert("Se actualizaron los datos, pero hubo un problema al cambiar la contraseña.");
          }
        }
      } else {
        // CREAR EMPLEADO (POST /employees)
        const bodyNuevo = {
          name: nombre.trim(),
          last_name: apellido.trim(),
          dni: dni.trim(),
          email: email.trim(),
          position: cargo.trim(),
          username: usuario.trim(),
          password: password.trim(),
        };

        const resNuevo = await fetch(API_EMPLOYEES_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyNuevo),
        });

        if (!resNuevo.ok) {
          throw new Error("Error al crear el empleado.");
        }
      }

      await cargarEmpleados();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
      window.alert(error.message || "Ocurrió un error al guardar los cambios.");
    } finally {
      setGuardando(false);
    }
  };

  // =========================
  // ELIMINAR (DELETE)
  // =========================
  const eliminarEmpleado = async (empleado) => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar al empleado @${empleado.usuario}?`
    );

    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${API_EMPLOYEES_URL}/${empleado.usuario}`, {
        method: "DELETE",
      });

      if (respuesta.ok) {
        await cargarEmpleados();
      } else {
        window.alert("No se pudo eliminar el empleado.");
      }
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      window.alert("Error de conexión al intentar eliminar el empleado.");
    }
  };

  // =========================
  // CERRAR MODAL
  // =========================
  const cerrarModal = () => {
    setModalAbierto(false);
    setModoEdicion(false);
    setEmpleadoEditando(null);

    setNombre("");
    setApellido("");
    setDni("");
    setEmail("");
    setCargo("");
    setUsuario("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        background:
          "linear-gradient(135deg, #f4f9fc 0%, #eef7fa 50%, #f8fbfd 100%)",
      }}
    >
      {/* ENCABEZADO */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          onClick={() => setPagina("dashboard")}
          variant="outlined"
          sx={{
            color: "#5f3d76",
            borderColor: "#c8a2e8",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
            px: 2.5,
            "&:hover": {
              backgroundColor: "rgba(200,162,232,0.12)",
              borderColor: "#a978d1",
            },
          }}
        >
          ← Volver al Dashboard
        </Button>

        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#4a315e",
            }}
          >
            Empleados
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#6d5580",
            }}
          >
            Administración de empleados de la farmacia
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={abrirNuevoEmpleado}
          sx={{
            background: "linear-gradient(90deg, #a978d1, #c8a2e8)",
            color: "#3d2850",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
            py: 1.2,
            "&:hover": {
              background: "linear-gradient(90deg, #9b68c7, #b98add)",
            },
          }}
        >
          + Agregar empleado
        </Button>
      </Box>

      {/* BUSCADOR */}
      <Card
        sx={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 8px 25px rgba(130,80,170,0.08)",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <TextField
            fullWidth
            label="Buscar empleado por usuario o nombre (Presiona Enter)"
            placeholder="Ej: jdoe"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              if (!e.target.value.trim()) cargarEmpleados();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") buscarPorUsernameAPI();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9b68c7" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                "&:hover fieldset": { borderColor: "#c8a2e8" },
                "&.Mui-focused fieldset": { borderColor: "#a978d1" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#8c5db3" },
            }}
          />
        </CardContent>
      </Card>

      {/* RESULTADOS */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: "#4a315e",
        }}
      >
        Empleados encontrados: {empleadosFiltrados.length}
      </Typography>

      {/* CARGANDO */}
      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
          <CircularProgress sx={{ color: "#a978d1" }} />
        </Box>
      ) : (
        /* TARJETAS DE EMPLEADOS */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {empleadosFiltrados.map((empleado) => (
            <Card
              key={empleado.id || empleado.usuario}
              sx={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
                boxShadow: "0 8px 25px rgba(130,80,170,0.15)",
                overflow: "hidden",
                transition: "0.25s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(130,80,170,0.22)",
                },
              }}
            >
              <Box
                sx={{
                  height: 5,
                  background:
                    "linear-gradient(90deg, #b98add, #e5c9f7)",
                }}
              />

              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#4a315e" }}
                >
                  {empleado.nombre} {empleado.apellido}
                </Typography>

                <Typography sx={{ mt: 1, color: "#5f4770" }}>
                  Usuario: <strong>@{empleado.usuario}</strong>
                </Typography>

                <Typography sx={{ mt: 0.5, color: "#5f4770" }}>
                  DNI: {empleado.dni}
                </Typography>

                <Typography sx={{ mt: 0.5, color: "#5f4770" }}>
                  Email: {empleado.email}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: "#5f4770",
                    fontWeight: "bold",
                  }}
                >
                  Cargo: {empleado.cargo}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => abrirEditarEmpleado(empleado)}
                    sx={{
                      borderColor: "#a978d1",
                      color: "#5f3d76",
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        borderColor: "#8f5db5",
                        backgroundColor: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => eliminarEmpleado(empleado)}
                    sx={{
                      borderColor: "#a45b79",
                      color: "#7b4058",
                      borderRadius: "10px",
                      textTransform: "none",
                      fontWeight: "bold",
                      "&:hover": {
                        borderColor: "#8e4564",
                        backgroundColor: "rgba(255,255,255,0.15)",
                      },
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* SIN RESULTADOS */}
      {!cargando && empleadosFiltrados.length === 0 && (
        <Card
          sx={{
            mt: 4,
            borderRadius: "20px",
            background: "linear-gradient(135deg, #c8a2e8, #d8b9f0)",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                textAlign: "center",
                color: "#5f4770",
                fontWeight: 500,
              }}
            >
              No se encontraron empleados.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* MODAL (CREAR / EDITAR) */}
      <Dialog
        open={modalAbierto}
        onClose={cerrarModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#4a315e",
          }}
        >
          {modoEdicion ? "Editar empleado" : "Nuevo empleado"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Nombre *"
            placeholder="Ej: John"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Apellido *"
            placeholder="Ej: Doe"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="DNI *"
            placeholder="Ej: 12345678"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email *"
            type="email"
            placeholder="Ej: jdoe@farmacia.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Cargo / Posición *"
            placeholder="Ej: Farmacéutico"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Usuario *"
            placeholder="Ej: jdoe"
            value={usuario}
            disabled={modoEdicion} // No se permite editar el usuario identificador
            onChange={(e) => setUsuario(e.target.value)}
            margin="normal"
          />

          <TextField
            fullWidth
            label={
              modoEdicion
                ? "Nueva Contraseña (dejar en blanco si no deseas cambiarla)"
                : "Contraseña *"
            }
            type="password"
            placeholder={
              modoEdicion
                ? "Dejar en blanco para no cambiar"
                : "Ej: Password123!"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={cerrarModal}
            disabled={guardando}
            sx={{
              color: "#6d5580",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={guardarEmpleado}
            disabled={guardando}
            sx={{
              background: "linear-gradient(90deg, #a978d1, #c8a2e8)",
              color: "#3d2850",
              fontWeight: "bold",
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #9b68c7, #b98add)",
              },
            }}
          >
            {guardando ? (
              <CircularProgress size={24} sx={{ color: "#3d2850" }} />
            ) : modoEdicion ? (
              "Guardar cambios"
            ) : (
              "Agregar empleado"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Empleados;
