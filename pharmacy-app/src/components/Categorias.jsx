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
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const API_URL = "http://localhost:5000/api/v1/categories";

function Categorias({ setPagina }) {
  const [categorias, setCategorias] = useState([]);

  // =========================
  // BUSQUEDA LOCAL
  // =========================
  const [busqueda, setBusqueda] = useState("");

  // =========================
  // MODAL
  // =========================
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);

  // =========================
  // FORMULARIO
  // =========================
  const [nombre, setNombre] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // =========================
  // FILTRAR LOCALMENTE
  // =========================
  const categoriasFiltradas = categorias.filter((categoria) => {
    const termino = busqueda.toLowerCase();
    return (
      (categoria.nombre && categoria.nombre.toLowerCase().includes(termino)) ||
      (categoria.descripcion && categoria.descripcion.toLowerCase().includes(termino)) ||
      (categoria.codigo && categoria.codigo.toLowerCase().includes(termino))
    );
  });

  // =========================
  // OBTENER TODAS LAS CATEGORÍAS
  // =========================
  const cargarCategorias = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("La respuesta no es una lista/array:", data);
          return;
        }

        const transformedData = data.map((item) => {
          if (Array.isArray(item)) {
            const [id, codigo, nombre, descripcion] = item;
            return { id, codigo, nombre, descripcion };
          }
          return {
            id: item.id || item[0],
            codigo: item.code || item.codigo || item[1],
            nombre: item.name || item.nombre || item[2],
            descripcion: item.description || item.descripcion || item[3],
          };
        });

        setCategorias(transformedData);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
      });
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  // =========================
  // ABRIR MODAL: NUEVA CATEGORÍA
  // =========================
  const abrirNuevaCategoria = () => {
    setModoEdicion(false);
    setCategoriaEditando(null);

    setCodigo("");
    setNombre("");
    setDescripcion("");

    setModalAbierto(true);
  };

  // =========================
  // ABRIR MODAL: EDITAR CATEGORÍA
  // =========================
  const abrirEditarCategoria = (categoria) => {
    setModoEdicion(true);
    setCategoriaEditando(categoria);

    setCodigo(categoria.codigo || "");
    setNombre(categoria.nombre || "");
    setDescripcion(categoria.descripcion || "");

    setModalAbierto(true);
  };

  // =========================
  // BÚSQUEDA DIRECTA EN BACKEND POR CÓDIGO
  // =========================
  const buscarPorCodigoBackend = (codigoABuscar) => {
    if (!codigoABuscar.trim()) return;

    fetch(`${API_URL}/${codigoABuscar.trim()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Categoría no encontrada");
        return res.json();
      })
      .then((data) => {
        const catMap = {
          id: data.id,
          codigo: data.code || data.codigo,
          nombre: data.name || data.nombre,
          descripcion: data.description || data.descripcion,
        };
        setCategorias([catMap]);
      })
      .catch((err) => {
        console.error(err);
        window.alert(`No se encontró ninguna categoría con el código "${codigoABuscar}"`);
      });
  };

  // =========================
  // GUARDAR (CREAR / EDITAR)
  // =========================
  const guardarCategoria = () => {
    if (!nombre.trim() || (!modoEdicion && !codigo.trim())) {
      window.alert("Por favor completa los campos requeridos.");
      return;
    }

    // =========================
    // CASO 1: EDITAR CATEGORÍA
    // =========================
    if (modoEdicion && categoriaEditando) {
      const codigoTarget = categoriaEditando.codigo;

      // JSON específico para edición
      const payloadEditar = {
        name: nombre.trim(),
        description: descripcion.trim(),
      };

      fetch(`${API_URL}/${codigoTarget}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadEditar),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar la categoría");
          }
          return response.json().catch(() => ({}));
        })
        .then(() => {
          setCategorias((prev) =>
            prev.map((cat) =>
              cat.codigo === codigoTarget
                ? {
                    ...cat,
                    nombre: payloadEditar.name,
                    descripcion: payloadEditar.description,
                  }
                : cat
            )
          );
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al actualizar la categoría:", error);
          window.alert("Error al actualizar la categoría.");
        });
    }

    // =========================
    // CASO 2: CREAR CATEGORÍA
    // =========================
    else {
      // JSON específico para creación
      const payloadCrear = {
        code: codigo.trim(),
        name: nombre.trim(),
        description: descripcion.trim(),
      };

      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadCrear),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al crear la categoría");
          }
          return response.json().catch(() => null);
        })
        .then((data) => {
          if (data && (data.id || data.code)) {
            setCategorias((prev) => [
              ...prev,
              {
                id: data.id,
                codigo: payloadCrear.code,
                nombre: payloadCrear.name,
                descripcion: payloadCrear.description,
              },
            ]);
          } else {
            cargarCategorias();
          }
          cerrarModal();
        })
        .catch((error) => {
          console.error("Error al crear la categoría:", error);
          window.alert("Error al crear la categoría.");
        });
    }
  };

  // =========================
  // ELIMINAR CATEGORÍA
  // =========================
  const eliminarCategoria = (categoria) => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar la categoría ${categoria.codigo}?`
    );

    if (!confirmar) return;

    fetch(`${API_URL}/${categoria.codigo}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar la categoría");
        }
        setCategorias((prev) => prev.filter((cat) => cat.codigo !== categoria.codigo));
      })
      .catch((error) => {
        console.error("Error al eliminar la categoría:", error);
        window.alert("Error al eliminar la categoría.");
      });
  };

  // =========================
  // CERRAR MODAL
  // =========================
  const cerrarModal = () => {
    setModalAbierto(false);
    setModoEdicion(false);
    setCategoriaEditando(null);

    setCodigo("");
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
          + Agregar categoría
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
        <CardContent sx={{ p: 2.5, display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Buscar categoría"
            placeholder="Ej: Analgésicos o ANALG01"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              if (e.target.value === "") cargarCategorias();
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
          <Button
            variant="outlined"
            onClick={() => buscarPorCodigoBackend(busqueda)}
            sx={{
              borderRadius: "12px",
              borderColor: "#a978d1",
              color: "#5f3d76",
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
            }}
          >
            Buscar Código
          </Button>
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
        Categorías encontradas: {categoriasFiltradas.length}
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
        {categoriasFiltradas.map((categoria) => (
          <Card
            key={categoria.codigo || categoria.id}
            sx={{
              borderRadius: "20px",
              background: "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
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
                background: "linear-gradient(90deg, #b98add, #e5c9f7)",
              }}
            />

            <CardContent sx={{ p: 3 }}>
              {categoria.codigo && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    color: "#6d4385",
                    backgroundColor: "rgba(255,255,255,0.4)",
                    px: 1,
                    py: 0.3,
                    borderRadius: "6px",
                    display: "inline-block",
                    mb: 1,
                  }}
                >
                  {categoria.codigo}
                </Typography>
              )}

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
                {categoria.descripcion || "Sin descripción."}
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
                  onClick={() => abrirEditarCategoria(categoria)}
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
                  onClick={() => eliminarCategoria(categoria)}
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

      {/* SIN RESULTADOS */}
      {categoriasFiltradas.length === 0 && (
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
              No se encontraron categorías.
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* MODAL */}
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
          {modoEdicion ? "Editar categoría" : "Nueva categoría"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Código"
            placeholder="Ej: ANALG01"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            disabled={modoEdicion}
            margin="normal"
            required={!modoEdicion}
          />

          <TextField
            fullWidth
            label="Nombre"
            placeholder="Ej: Analgésicos"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descripción"
            placeholder="Descripción de la categoría"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
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
            {modoEdicion ? "Guardar cambios" : "Agregar categoría"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Categorias;
