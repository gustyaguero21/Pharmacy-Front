import { useState, useEffect, useCallback } from "react";

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
  CircularProgress,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const API_URL = "http://localhost:5000/api/v1/medications";

// Mapeo entre los códigos de categoría de la BD y etiquetas legibles
const CATEGORIAS_MAP = {
  ANALG01: "Analgésicos",
  ANTIB01: "Antibióticos",
  ANTIINF01: "Antiinflamatorios",
  ANTIAL01: "Antialérgicos",
};

function Medicamentos({ setPagina }) {
  const [medicamentos, setMedicamentos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // BÚSQUEDA Y FILTROS
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  // MODAL Y MODO EDICIÓN
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [medicamentoEditando, setMedicamentoEditando] = useState(null);

  // FORMULARIO
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoria, setCategoria] = useState("ANALG01");
  const [fechaExpiracion, setFechaExpiracion] = useState("");

  // Helper para convertir el array que devuelve Flask en un objeto JavaScript
  const transformarMedicamento = (item) => {
    if (!item) return null;
    if (Array.isArray(item)) {
      // Formato: [id, nombre, precio, stock, categoria, expiration_date]
      const fecha = item[5] ? new Date(item[5]) : null;
      const fechaFormateada = fecha && !isNaN(fecha)
        ? fecha.toISOString().split("T")[0]
        : "";

      return {
        id: item[0],
        nombre: item[1],
        precio: parseFloat(item[2]),
        stock: item[3],
        categoria: item[4],
        fechaExpiracion: fechaFormateada,
      };
    }
    return item;
  };

  // =========================
  // OBTENER TODOS LOS MEDICAMENTOS (GET)
  // =========================
  const cargarMedicamentos = useCallback(async () => {
    try {
      setCargando(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener los medicamentos");

      const data = await response.json();
      const medicamentosFormateados = data.map(transformarMedicamento);
      setMedicamentos(medicamentosFormateados);
    } catch (error) {
      console.error(error);
      window.alert("No se pudo conectar con el servidor para obtener los medicamentos.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarMedicamentos();
  }, [cargarMedicamentos]);

  // =========================
  // BÚSQUEDA INDIVIDUAL POR API (GET /api/v1/medications/<nombre>)
  // =========================
  const buscarMedicamentoPorNombre = async () => {
    const termino = busqueda.trim();
    if (!termino) {
      cargarMedicamentos();
      return;
    }

    try {
      setCargando(true);
      const response = await fetch(`${API_URL}/${encodeURIComponent(termino)}`);

      if (response.status === 404) {
        setMedicamentos([]);
        return;
      }

      if (!response.ok) throw new Error("Error en la búsqueda");

      const data = await response.json();
      const itemFormateado = transformarMedicamento(data);
      setMedicamentos(itemFormateado ? [itemFormateado] : []);
    } catch (error) {
      console.error(error);
      window.alert("Ocurrió un error al buscar el medicamento.");
    } finally {
      setCargando(false);
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda("");
    cargarMedicamentos();
  };

  // =========================
  // FILTRADO LOCAL POR CATEGORÍA
  // =========================
  const medicamentosFiltrados = medicamentos.filter((med) => {
    if (categoriaSeleccionada === "Todos") return true;
    return med.categoria === categoriaSeleccionada;
  });

  // =========================
  // CONTROLES MODAL
  // =========================
  const abrirNuevoMedicamento = () => {
    setModoEdicion(false);
    setMedicamentoEditando(null);
    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("ANALG01");
    setFechaExpiracion("");
    setModalAbierto(true);
  };

  const abrirEditarMedicamento = (medicamento) => {
    setModoEdicion(true);
    setMedicamentoEditando(medicamento);
    setNombre(medicamento.nombre);
    setPrecio(medicamento.precio);
    setStock(medicamento.stock);
    setCategoria(medicamento.categoria);
    setFechaExpiracion(medicamento.fechaExpiracion || "");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setModoEdicion(false);
    setMedicamentoEditando(null);
    setNombre("");
    setPrecio("");
    setStock("");
    setCategoria("ANALG01");
    setFechaExpiracion("");
  };

  // =========================
  // GUARDAR (POST / PUT)
  // =========================
  const guardarMedicamento = async () => {
    if (!nombre.trim() || precio === "" || stock === "" || !categoria || !fechaExpiracion) {
      window.alert("Completá todos los campos, incluida la fecha de expiración.");
      return;
    }

    if (Number(precio) < 0 || Number(stock) < 0) {
      window.alert("El precio y el stock no pueden ser negativos.");
      return;
    }

    try {
      if (modoEdicion && medicamentoEditando) {
        // ACTUALIZAR (PUT) -> No requiere enviar el 'name' en el JSON
        const payloadPut = {
          price: Number(precio),
          stock: Number(stock),
          category: categoria,
          expiration_date: fechaExpiracion,
        };

        const response = await fetch(`${API_URL}/${encodeURIComponent(medicamentoEditando.nombre)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadPut),
        });

        if (!response.ok) throw new Error("Error al actualizar medicamento");
      } else {
        // CREAR (POST) -> Requiere el objeto completo con 'name'
        const payloadPost = {
          name: nombre.trim(),
          price: Number(precio),
          stock: Number(stock),
          category: categoria,
          expiration_date: fechaExpiracion,
        };

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadPost),
        });

        if (!response.ok) throw new Error("Error al agregar medicamento");
      }

      await cargarMedicamentos();
      cerrarModal();
    } catch (error) {
      console.error(error);
      window.alert("Ocurrió un error al guardar los datos.");
    }
  };

  // =========================
  // ELIMINAR (DELETE)
  // =========================
  const eliminarMedicamento = async (medicamento) => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar "${medicamento.nombre}"?`
    );

    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(medicamento.nombre)}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar medicamento");

      await cargarMedicamentos();
    } catch (error) {
      console.error(error);
      window.alert("No se pudo eliminar el medicamento.");
    }
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
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#4a315e" }}>
            Medicamentos
          </Typography>
          <Typography sx={{ color: "#6d5580", marginTop: 0.5 }}>
            Administración de medicamentos de la farmacia
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={abrirNuevoMedicamento}
          sx={{
            background: "linear-gradient(90deg, #a978d1, #c8a2e8)",
            color: "#3d2850",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            px: 3,
            py: 1.2,
            boxShadow: "0 5px 15px rgba(100, 60, 130, 0.18)",
            "&:hover": {
              background: "linear-gradient(90deg, #9b68c7, #b98add)",
              boxShadow: "0 7px 18px rgba(100, 60, 130, 0.25)",
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
          background: "rgba(255,255,255,0.92)",
          boxShadow: "0 8px 25px rgba(130, 80, 170, 0.08)",
          border: "1px solid rgba(130,80,170,0.08)",
          marginBottom: 3,
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              label="Buscar medicamento por nombre"
              placeholder="Ej: Ibuprofeno"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") buscarMedicamentoPorNombre();
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9b68c7" }} />
                  </InputAdornment>
                ),
                endAdornment: busqueda && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={limpiarBusqueda}>
                      <ClearIcon />
                    </IconButton>
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
              variant="contained"
              onClick={buscarMedicamentoPorNombre}
              sx={{
                borderRadius: "12px",
                background: "#a978d1",
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
                "&:hover": { backgroundColor: "#9b68c7" },
              }}
            >
              Buscar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* FILTRO CATEGORÍAS */}
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2, color: "#4a315e" }}>
        Categorías
      </Typography>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginBottom: 4 }}>
        {["Todos", ...Object.keys(CATEGORIAS_MAP)].map((catKey) => {
          const etiqueta = catKey === "Todos" ? "Todos" : CATEGORIAS_MAP[catKey];
          const seleccionada = categoriaSeleccionada === catKey;

          return (
            <Button
              key={catKey}
              variant={seleccionada ? "contained" : "outlined"}
              onClick={() => setCategoriaSeleccionada(catKey)}
              sx={{
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
                ...(seleccionada
                  ? {
                      background: "linear-gradient(90deg, #a978d1, #c8a2e8)",
                      color: "#3d2850",
                      "&:hover": {
                        background: "linear-gradient(90deg, #9b68c7, #b98add)",
                      },
                    }
                  : {
                      borderColor: "#c8a2e8",
                      color: "#6d4d82",
                      "&:hover": {
                        borderColor: "#a978d1",
                        backgroundColor: "rgba(200,162,232,0.10)",
                      },
                    }),
              }}
            >
              {etiqueta}
            </Button>
          );
        })}
      </Box>

      {/* LISTADO O MENSAJE */}
      {cargando ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <CircularProgress sx={{ color: "#a978d1" }} />
        </Box>
      ) : (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2, color: "#4a315e" }}>
            Medicamentos encontrados: {medicamentosFiltrados.length}
          </Typography>

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
                  background: "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
                  boxShadow: "0 8px 25px rgba(130, 80, 170, 0.15)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  overflow: "hidden",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(130,80,170,0.22)",
                  },
                }}
              >
                <Box sx={{ height: 5, background: "linear-gradient(90deg, #b98add, #e5c9f7)" }} />

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#4a315e" }}>
                    {medicamento.nombre}
                  </Typography>

                  <Chip
                    label={CATEGORIAS_MAP[medicamento.categoria] || medicamento.categoria}
                    sx={{
                      marginTop: 1,
                      marginBottom: 2,
                      backgroundColor: "rgba(255,255,255,0.38)",
                      color: "#5a3b70",
                      fontWeight: "bold",
                      border: "1px solid rgba(255,255,255,0.35)",
                    }}
                  />

                  <Typography sx={{ color: "#5f4770", fontWeight: 500 }}>
                    Precio: ${medicamento.precio.toFixed(2)}
                  </Typography>

                  <Typography sx={{ color: "#5f4770", fontWeight: 500, marginTop: 0.5 }}>
                    Stock: {medicamento.stock} u.
                  </Typography>

                  <Typography sx={{ color: "#5f4770", fontSize: "0.85rem", marginTop: 0.5 }}>
                    Vence: {medicamento.fechaExpiracion || "Sin fecha"}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => abrirEditarMedicamento(medicamento)}
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
                      onClick={() => eliminarMedicamento(medicamento)}
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

          {medicamentosFiltrados.length === 0 && (
            <Card
              sx={{
                marginTop: 4,
                borderRadius: "20px",
                background: "linear-gradient(135deg, #c8a2e8, #d8b9f0)",
                boxShadow: "0 8px 25px rgba(130,80,170,0.12)",
              }}
            >
              <CardContent>
                <Typography sx={{ textAlign: "center", color: "#5f4770", fontWeight: 500 }}>
                  No se encontraron medicamentos.
                </Typography>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* MODAL CREAR / EDITAR */}
      <Dialog open={modalAbierto} onClose={cerrarModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", color: "#4a315e" }}>
          {modoEdicion ? `Editar "${medicamentoEditando?.nombre}"` : "Nuevo medicamento"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Nombre"
            placeholder="Ej: Ibuprofeno"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            margin="normal"
            disabled={modoEdicion}
          />

          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            margin="normal"
            slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
          />

          <TextField
            fullWidth
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            margin="normal"
            slotProps={{ htmlInput: { min: 0 } }}
          />

          <TextField
            fullWidth
            select
            label="Categoría"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            margin="normal"
          >
            {Object.entries(CATEGORIAS_MAP).map(([code, name]) => (
              <MenuItem key={code} value={code}>
                {name} ({code})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Fecha de Expiración"
            type="date"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
            margin="normal"
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={cerrarModal}
            sx={{ color: "#6d5580", textTransform: "none", fontWeight: "bold" }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={guardarMedicamento}
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
            {modoEdicion ? "Guardar cambios" : "Agregar medicamento"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Medicamentos;
