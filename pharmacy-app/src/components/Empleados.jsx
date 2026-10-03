import { useState } from "react";

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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Empleados({ setPagina }) {
  // =========================
  // DATOS DE PRUEBA
  // =========================

  const [empleados, setEmpleados] = useState([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      usuario: "jperez",
      cargo: "Farmacéutico",
    },
    {
      id: 2,
      nombre: "María",
      apellido: "Gómez",
      usuario: "mgomez",
      cargo: "Administrativo",
    },
    {
      id: 3,
      nombre: "Carlos",
      apellido: "Rodríguez",
      usuario: "crodriguez",
      cargo: "Vendedor",
    },
  ]);

  // =========================
  // BUSQUEDA
  // =========================

  const [busqueda, setBusqueda] = useState("");

  // =========================
  // MODAL
  // =========================

  const [modalAbierto, setModalAbierto] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [empleadoEditando, setEmpleadoEditando] =
    useState(null);

  // =========================
  // FORMULARIO
  // =========================

  const [nombre, setNombre] = useState("");

  const [apellido, setApellido] = useState("");

  const [usuario, setUsuario] = useState("");

  const [cargo, setCargo] = useState("");

  // =========================
  // FILTRAR
  // =========================

  const empleadosFiltrados = empleados.filter(
    (empleado) =>
      `${empleado.nombre} ${empleado.apellido}`
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      empleado.usuario
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      empleado.cargo
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

  // =========================
  // NUEVO EMPLEADO
  // =========================

  const abrirNuevoEmpleado = () => {
    setModoEdicion(false);

    setEmpleadoEditando(null);

    setNombre("");
    setApellido("");
    setUsuario("");
    setCargo("");

    setModalAbierto(true);
  };

  // =========================
  // EDITAR EMPLEADO
  // =========================

  const abrirEditarEmpleado = (empleado) => {
    setModoEdicion(true);

    setEmpleadoEditando(empleado);

    setNombre(empleado.nombre);
    setApellido(empleado.apellido);
    setUsuario(empleado.usuario);
    setCargo(empleado.cargo);

    setModalAbierto(true);
  };

  // =========================
  // GUARDAR
  // =========================

  const guardarEmpleado = () => {
    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !usuario.trim() ||
      !cargo.trim()
    ) {
      window.alert("Completá todos los campos.");
      return;
    }

    // EDITAR
    if (modoEdicion && empleadoEditando) {
      setEmpleados(
        empleados.map((empleado) =>
          empleado.id === empleadoEditando.id
            ? {
                ...empleado,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                usuario: usuario.trim(),
                cargo: cargo.trim(),
              }
            : empleado
        )
      );
    }

    // NUEVO
    else {
      const nuevoEmpleado = {
        id: Date.now(),
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        usuario: usuario.trim(),
        cargo: cargo.trim(),
      };

      setEmpleados([
        ...empleados,
        nuevoEmpleado,
      ]);
    }

    cerrarModal();
  };

  // =========================
  // ELIMINAR
  // =========================

  const eliminarEmpleado = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este empleado?"
    );

    if (!confirmar) {
      return;
    }

    setEmpleados(
      empleados.filter(
        (empleado) => empleado.id !== id
      )
    );
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
    setUsuario("");
    setCargo("");
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
      {/* =========================
          ENCABEZADO
      ========================== */}

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
              backgroundColor:
                "rgba(200,162,232,0.12)",
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
            background:
              "linear-gradient(90deg, #a978d1, #c8a2e8)",
            color: "#3d2850",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
            py: 1.2,

            "&:hover": {
              background:
                "linear-gradient(90deg, #9b68c7, #b98add)",
            },
          }}
        >
          + Agregar empleado
        </Button>
      </Box>

      {/* =========================
          BUSCADOR
      ========================== */}

      <Card
        sx={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.92)",
          boxShadow:
            "0 8px 25px rgba(130,80,170,0.08)",
          mb: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <TextField
            fullWidth
            label="Buscar empleado"
            placeholder="Ej: Juan Pérez"
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: "#9b68c7" }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",

                "&:hover fieldset": {
                  borderColor: "#c8a2e8",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#a978d1",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#8c5db3",
              },
            }}
          />
        </CardContent>
      </Card>

      {/* =========================
          RESULTADOS
      ========================== */}

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mb: 2,
          color: "#4a315e",
        }}
      >
        Empleados encontrados:{" "}
        {empleadosFiltrados.length}
      </Typography>

      {/* =========================
          TARJETAS
      ========================== */}

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
            key={empleado.id}
            sx={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
              boxShadow:
                "0 8px 25px rgba(130,80,170,0.15)",
              overflow: "hidden",
              transition: "0.25s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  "0 12px 30px rgba(130,80,170,0.22)",
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
                sx={{
                  color: "#4a315e",
                }}
              >
                {empleado.nombre}{" "}
                {empleado.apellido}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#5f4770",
                }}
              >
                Usuario: {empleado.usuario}
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
                  onClick={() =>
                    abrirEditarEmpleado(empleado)
                  }
                  sx={{
                    borderColor: "#a978d1",
                    color: "#5f3d76",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "bold",

                    "&:hover": {
                      borderColor: "#8f5db5",
                      backgroundColor:
                        "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  Editar
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    eliminarEmpleado(empleado.id)
                  }
                  sx={{
                    borderColor: "#a45b79",
                    color: "#7b4058",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: "bold",

                    "&:hover": {
                      borderColor: "#8e4564",
                      backgroundColor:
                        "rgba(255,255,255,0.15)",
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

      {/* =========================
          SIN RESULTADOS
      ========================== */}

      {empleadosFiltrados.length === 0 && (
        <Card
          sx={{
            mt: 4,
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #c8a2e8, #d8b9f0)",
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

      {/* =========================
          MODAL
      ========================== */}

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
          {modoEdicion
            ? "Editar empleado"
            : "Nuevo empleado"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="Ej: Juan"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Apellido"
            placeholder="Ej: Pérez"
            value={apellido}
            onChange={(e) =>
              setApellido(e.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Usuario"
            placeholder="Ej: jperez"
            value={usuario}
            onChange={(e) =>
              setUsuario(e.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Cargo"
            placeholder="Ej: Farmacéutico"
            value={cargo}
            onChange={(e) =>
              setCargo(e.target.value)
            }
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={cerrarModal}
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
            sx={{
              background:
                "linear-gradient(90deg, #a978d1, #c8a2e8)",
              color: "#3d2850",
              fontWeight: "bold",
              borderRadius: "10px",
              textTransform: "none",

              "&:hover": {
                background:
                  "linear-gradient(90deg, #9b68c7, #b98add)",
              },
            }}
          >
            {modoEdicion
              ? "Guardar cambios"
              : "Agregar empleado"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Empleados;