import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

function Categorias({ setPagina }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 3,
        background:
          "linear-gradient(135deg, #f4f9fc 0%, #eef7fa 50%, #f8fbfd 100%)",
      }}
    >
      {/* BOTÓN VOLVER */}

      <Button
        onClick={() => setPagina("dashboard")}
        variant="outlined"
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
      >
        ← Volver al Dashboard
      </Button>

      {/* TÍTULO */}

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#4a315e",
          mb: 3,
        }}
      >
        Categorías
      </Typography>

      {/* TARJETA */}

      <Card
        sx={{
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
          boxShadow:
            "0 8px 25px rgba(130, 80, 170, 0.18)",
          border:
            "1px solid rgba(255, 255, 255, 0.35)",
          overflow: "hidden",
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
            sx={{
              fontWeight: "bold",
              color: "#4a315e",
            }}
          >
            Gestión de categorías
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#5f4770",
            }}
          >
            Desde aquí podrás administrar las categorías
            de los medicamentos.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 3,
              background:
                "linear-gradient(90deg, #a978d1, #c8a2e8)",
              color: "#3d2850",
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              px: 3,
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
            Agregar categoría
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Categorias;