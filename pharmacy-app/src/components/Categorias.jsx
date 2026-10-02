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

function Categorias({ setPagina }) {
  // =========================
  // DATOS DE PRUEBA
  // =========================

  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nombre: "Analgésicos",
      descripcion: "Medicamentos para aliviar el dolor.",
    },
    {
      id: 2,
      nombre: "Antibióticos",
      descripcion:
        "Medicamentos utilizados para tratar infecciones bacterianas.",
    },
    {
      id: 3,
      nombre: "Antiinflamatorios",
      descripcion:
        "Medicamentos utilizados para reducir la inflamación.",
    },
    {
      id: 4,
      nombre: "Antialérgicos",
      descripcion:
        "Medicamentos utilizados para tratar síntomas de alergias.",
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

  const [categoriaEditando, setCategoriaEditando] =
    useState(null);

  // =========================
  // FORMULARIO
  // =========================

  const [nombre, setNombre] = useState("");

  const [descripcion, setDescripcion] = useState("");

  // =========================
  // FILTRAR
  // =========================

  const categoriasFiltradas = categorias.filter(
    (categoria) =>
      categoria.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      categoria.descripcion
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

  // =========================
  // NUEVA CATEGORIA
  // =========================

  const abrirNuevaCategoria = () => {
    setModoEdicion(false);

    setCategoriaEditando(null);

    setNombre("");
    setDescripcion("");

    setModalAbierto(true);
  };

  // =========================
  // EDITAR CATEGORIA
  // =========================

  const abrirEditarCategoria = (categoria) => {
    setModoEdicion(true);

    setCategoriaEditando(categoria);

    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);

    setModalAbierto(true);
  };

  // =========================
  // GUARDAR
  // =========================

  const guardarCategoria = () => {
    if (!nombre.trim()) {
      window.alert("Ingresá el nombre de la categoría.");
      return;
    }

    // EDITAR
    if (modoEdicion && categoriaEditando) {
      setCategorias(
        categorias.map((categoria) =>
          categoria.id === categoriaEditando.id
            ? {
                ...categoria,
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
              }
            : categoria
        )
      );
    }

    // NUEVA
    else {
      const nuevaCategoria = {
        id: Date.now(),
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
      };

      setCategorias([
        ...categorias,
        nuevaCategoria,
      ]);
    }

    cerrarModal();
  };

  // =========================
  // ELIMINAR
  // =========================

  const eliminarCategoria = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar esta categoría?"
    );

    if (!confirmar) {
      return;
    }

    setCategorias(
      categorias.filter(
        (categoria) => categoria.id !== id
      )
    );
  };

  // =========================
  // CERRAR MODAL
  // =========================

  const cerrarModal = () => {
    setModalAbierto(false);

    setModoEdicion(false);

    setCategoriaEditando(null);

    setNombre("");
    setDescripcion("");
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
            Categorías
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              color: "#6d5580",
            }}
          >
            Administración de categorías de medicamentos
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={abrirNuevaCategoria}
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
          + Agregar categoría
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
            label="Buscar categoría"
            placeholder="Ej: Analgésicos"
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
        Categorías encontradas:{" "}
        {categoriasFiltradas.length}
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
        {categoriasFiltradas.map((categoria) => (
          <Card
            key={categoria.id}
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
                {categoria.nombre}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#5f4770",
                  minHeight: 45,
                }}
              >
                {categoria.descripcion ||
                  "Sin descripción."}
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
                    abrirEditarCategoria(categoria)
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
                    eliminarCategoria(categoria.id)
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

      {categoriasFiltradas.length === 0 && (
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
              No se encontraron categorías.
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
            ? "Editar categoría"
            : "Nueva categoría"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="Ej: Analgésicos"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descripción"
            placeholder="Descripción de la categoría"
            value={descripcion}
            onChange={(e) =>
              setDescripcion(e.target.value)
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
            onClick={guardarCategoria}
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
              : "Agregar categoría"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Categorias;