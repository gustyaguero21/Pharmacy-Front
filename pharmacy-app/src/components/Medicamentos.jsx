import { useState } from "react";

import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Medicamentos({ setPagina }) {
  // =========================
  // DATOS DE PRUEBA
  // =========================

  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      nombre: "Paracetamol",
      precio: 1500,
      stock: 20,
      categoria: "Analgésicos",
    },
    {
      id: 2,
      nombre: "Ibuprofeno",
      precio: 2000,
      stock: 15,
      categoria: "Antiinflamatorios",
    },
    {
      id: 3,
      nombre: "Amoxicilina",
      precio: 3500,
      stock: 10,
      categoria: "Antibióticos",
    },
    {
      id: 4,
      nombre: "Diclofenac",
      precio: 1800,
      stock: 8,
      categoria: "Antiinflamatorios",
    },
    {
      id: 5,
      nombre: "Loratadina",
      precio: 2500,
      stock: 25,
      categoria: "Antialérgicos",
    },
    {
      id: 6,
      nombre: "Aspirina",
      precio: 1200,
      stock: 30,
      categoria: "Analgésicos",
    },
  ]);

  // =========================
  // BUSQUEDA Y FILTROS
  // =========================

  const [busqueda, setBusqueda] = useState("");

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todos");

  // =========================
  // MODAL
  // =========================

  const [modalAbierto, setModalAbierto] = useState(false);

  const [modoEdicion, setModoEdicion] = useState(false);

  const [medicamentoEditando, setMedicamentoEditando] =
    useState(null);

  // =========================
  // FORMULARIO
  // =========================

  const [nombre, setNombre] = useState("");

  const [precio, setPrecio] = useState("");

  const [stock, setStock] = useState("");

  const [categoria, setCategoria] =
    useState("Analgésicos");

  // =========================
  // FILTRAR MEDICAMENTOS
  // =========================

  const medicamentosFiltrados = medicamentos.filter(
    (medicamento) => {
      const coincideNombre = medicamento.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideCategoria =
        categoriaSeleccionada === "Todos" ||
        medicamento.categoria === categoriaSeleccionada;

      return coincideNombre && coincideCategoria;
    }
  );

  // =========================
  // ABRIR NUEVO MEDICAMENTO
  // =========================

  const abrirNuevoMedicamento = () => {
    setModoEdicion(false);

    setMedicamentoEditando(null);

    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("Analgésicos");

    setModalAbierto(true);
  };

  // =========================
  // ABRIR EDITAR
  // =========================

  const abrirEditarMedicamento = (medicamento) => {
    setModoEdicion(true);

    setMedicamentoEditando(medicamento);

    setNombre(medicamento.nombre);
    setPrecio(medicamento.precio);
    setStock(medicamento.stock);
    setCategoria(medicamento.categoria);

    setModalAbierto(true);
  };

  // =========================
  // GUARDAR MEDICAMENTO
  // =========================

  const guardarMedicamento = () => {
    if (
      !nombre.trim() ||
      precio === "" ||
      stock === "" ||
      !categoria
    ) {
      window.alert("Completá todos los campos.");
      return;
    }

    if (Number(precio) < 0) {
      window.alert("El precio no puede ser negativo.");
      return;
    }

    if (Number(stock) < 0) {
      window.alert("El stock no puede ser negativo.");
      return;
    }

    // EDITAR
    if (modoEdicion && medicamentoEditando) {
      setMedicamentos(
        medicamentos.map((medicamento) =>
          medicamento.id === medicamentoEditando.id
            ? {
                ...medicamento,
                nombre: nombre.trim(),
                precio: Number(precio),
                stock: Number(stock),
                categoria: categoria,
              }
            : medicamento
        )
      );
    }

    // NUEVO
    else {
      const nuevoMedicamento = {
        id: Date.now(),
        nombre: nombre.trim(),
        precio: Number(precio),
        stock: Number(stock),
        categoria: categoria,
      };

      setMedicamentos([
        ...medicamentos,
        nuevoMedicamento,
      ]);
    }

    cerrarModal();
  };

  // =========================
  // CERRAR MODAL
  // =========================

  const cerrarModal = () => {
    setModalAbierto(false);

    setModoEdicion(false);

    setMedicamentoEditando(null);

    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("Analgésicos");
  };

  // =========================
  // ELIMINAR
  // =========================

  const eliminarMedicamento = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este medicamento?"
    );

    if (!confirmar) {
      return;
    }

    setMedicamentos(
      medicamentos.filter(
        (medicamento) => medicamento.id !== id
      )
    );
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
          marginBottom: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          onClick={() => setPagina("dashboard")}
          sx={{
            mb: 2,
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
          variant="outlined"
        >
          ← Volver al Dashboard
        </Button>

        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#4a315e",
            }}
          >
            Medicamentos
          </Typography>

          <Typography
            sx={{
              color: "#6d5580",
              marginTop: 0.5,
            }}
          >
            Administración de medicamentos de la farmacia
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={abrirNuevoMedicamento}
          sx={{
            background:
              "linear-gradient(90deg, #a978d1, #c8a2e8)",
            color: "#3d2850",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
            py: 1.2,
            boxShadow:
              "0 5px 15px rgba(100, 60, 130, 0.18)",

            "&:hover": {
              background:
                "linear-gradient(90deg, #9b68c7, #b98add)",
              boxShadow:
                "0 7px 18px rgba(100, 60, 130, 0.25)",
            },
          }}
        >
          + Nuevo medicamento
        </Button>
      </Box>

      {/* =========================
          BUSCADOR
      ========================== */}

      <Card
        sx={{
          borderRadius: "20px",
          background:
            "rgba(255,255,255,0.92)",
          boxShadow:
            "0 8px 25px rgba(130, 80, 170, 0.08)",
          border:
            "1px solid rgba(130,80,170,0.08)",
          marginBottom: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <TextField
            fullWidth
            label="Buscar medicamento"
            placeholder="Ej: Paracetamol"
            value={busqueda}
            onChange={(e) =>
              setBusqueda(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: "#9b68c7",
                    }}
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
          CATEGORIAS
      ========================== */}

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          marginBottom: 2,
          color: "#4a315e",
        }}
      >
        Categorías
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        {[
          "Todos",
          "Analgésicos",
          "Antibióticos",
          "Antiinflamatorios",
          "Antialérgicos",
        ].map((nombreCategoria) => (
          <Button
            key={nombreCategoria}
            variant={
              categoriaSeleccionada === nombreCategoria
                ? "contained"
                : "outlined"
            }
            onClick={() =>
              setCategoriaSeleccionada(nombreCategoria)
            }
            sx={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",

              ...(categoriaSeleccionada ===
              nombreCategoria
                ? {
                    background:
                      "linear-gradient(90deg, #a978d1, #c8a2e8)",
                    color: "#3d2850",

                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #9b68c7, #b98add)",
                    },
                  }
                : {
                    borderColor: "#c8a2e8",
                    color: "#6d4d82",

                    "&:hover": {
                      borderColor: "#a978d1",
                      backgroundColor:
                        "rgba(200,162,232,0.10)",
                    },
                  }),
            }}
          >
            {nombreCategoria}
          </Button>
        ))}
      </Box>

      {/* =========================
          RESULTADOS
      ========================== */}

      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          marginBottom: 2,
          color: "#4a315e",
        }}
      >
        Medicamentos encontrados:{" "}
        {medicamentosFiltrados.length}
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
        {medicamentosFiltrados.map(
          (medicamento) => (
            <Card
              key={medicamento.id}
              sx={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
                boxShadow:
                  "0 8px 25px rgba(130, 80, 170, 0.15)",
                border:
                  "1px solid rgba(255,255,255,0.35)",
                overflow: "hidden",
                transition: "0.25s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 12px 30px rgba(130,80,170,0.22)",
                },
              }}
            >
              {/* DETALLE SUPERIOR */}

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
                  {medicamento.nombre}
                </Typography>

                <Chip
                  label={medicamento.categoria}
                  sx={{
                    marginTop: 1,
                    marginBottom: 2,
                    backgroundColor:
                      "rgba(255,255,255,0.38)",
                    color: "#5a3b70",
                    fontWeight: "bold",
                    border:
                      "1px solid rgba(255,255,255,0.35)",
                  }}
                />

                <Typography
                  sx={{
                    color: "#5f4770",
                    fontWeight: 500,
                  }}
                >
                  Precio: ${medicamento.precio}
                </Typography>

                <Typography
                  sx={{
                    color: "#5f4770",
                    fontWeight: 500,
                    marginTop: 0.5,
                  }}
                >
                  Stock: {medicamento.stock}
                </Typography>

                {/* BOTONES */}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      abrirEditarMedicamento(
                        medicamento
                      )
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
                      eliminarMedicamento(
                        medicamento.id
                      )
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
          )
        )}
      </Box>

      {/* =========================
          SIN RESULTADOS
      ========================== */}

      {medicamentosFiltrados.length === 0 && (
        <Card
          sx={{
            marginTop: 4,
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #c8a2e8, #d8b9f0)",
            boxShadow:
              "0 8px 25px rgba(130,80,170,0.12)",
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
              No se encontraron medicamentos.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* =========================
          MODAL AGREGAR / EDITAR
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
            ? "Editar medicamento"
            : "Nuevo medicamento"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="Ej: Paracetamol"
            value={nombre}
            onChange={(e) =>
              setNombre(e.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={precio}
            onChange={(e) =>
              setPrecio(e.target.value)
            }
            margin="normal"
            inputProps={{
              min: 0,
            }}
          />

          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            margin="normal"
            inputProps={{
              min: 0,
            }}
          />

          <TextField
            fullWidth
            select
            label="Categoría"
            value={categoria}
            onChange={(e) =>
              setCategoria(e.target.value)
            }
            margin="normal"
          >
            <MenuItem value="Analgésicos">
              Analgésicos
            </MenuItem>

            <MenuItem value="Antibióticos">
              Antibióticos
            </MenuItem>

            <MenuItem value="Antiinflamatorios">
              Antiinflamatorios
            </MenuItem>

            <MenuItem value="Antialérgicos">
              Antialérgicos
            </MenuItem>
          </TextField>
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
            onClick={guardarMedicamento}
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
              : "Agregar medicamento"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Medicamentos;