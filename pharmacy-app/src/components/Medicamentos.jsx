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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Medicamentos({ setPagina }) {
  // DATOS DE PRUEBA
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

  const [busqueda, setBusqueda] = useState("");

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todos");

  // FILTRAR MEDICAMENTOS
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

  // ELIMINAR MEDICAMENTO
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
      {/* ENCABEZADO */}

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
      backgroundColor: "rgba(200,162,232,0.12)",
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

      {/* BUSCADOR */}

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
            onChange={(e) => setBusqueda(e.target.value)}
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

      {/* CATEGORÍAS */}

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
        <Button
          variant={
            categoriaSeleccionada === "Todos"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setCategoriaSeleccionada("Todos")
          }
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",

            ...(categoriaSeleccionada === "Todos"
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
          Todos
        </Button>

        <Button
          variant={
            categoriaSeleccionada === "Analgésicos"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setCategoriaSeleccionada("Analgésicos")
          }
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",

            ...(categoriaSeleccionada === "Analgésicos"
              ? {
                  background:
                    "linear-gradient(90deg, #a978d1, #c8a2e8)",
                  color: "#3d2850",
                }
              : {
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                }),
          }}
        >
          Analgésicos
        </Button>

        <Button
          variant={
            categoriaSeleccionada === "Antibióticos"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setCategoriaSeleccionada("Antibióticos")
          }
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",

            ...(categoriaSeleccionada === "Antibióticos"
              ? {
                  background:
                    "linear-gradient(90deg, #a978d1, #c8a2e8)",
                  color: "#3d2850",
                }
              : {
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                }),
          }}
        >
          Antibióticos
        </Button>

        <Button
          variant={
            categoriaSeleccionada === "Antiinflamatorios"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setCategoriaSeleccionada(
              "Antiinflamatorios"
            )
          }
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",

            ...(categoriaSeleccionada ===
            "Antiinflamatorios"
              ? {
                  background:
                    "linear-gradient(90deg, #a978d1, #c8a2e8)",
                  color: "#3d2850",
                }
              : {
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                }),
          }}
        >
          Antiinflamatorios
        </Button>

        <Button
          variant={
            categoriaSeleccionada === "Antialérgicos"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setCategoriaSeleccionada("Antialérgicos")
          }
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",

            ...(categoriaSeleccionada === "Antialérgicos"
              ? {
                  background:
                    "linear-gradient(90deg, #a978d1, #c8a2e8)",
                  color: "#3d2850",
                }
              : {
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                }),
          }}
        >
          Antialérgicos
        </Button>
      </Box>

      {/* RESULTADOS */}

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

      {/* TARJETAS */}

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
        {medicamentosFiltrados.map((medicamento) => (
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
                    eliminarMedicamento(medicamento.id)
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

      {/* SIN RESULTADOS */}

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
    </Box>
  );
}

export default Medicamentos;