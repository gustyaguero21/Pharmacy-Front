import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login({ iniciarSesion }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    // USUARIO DE PRUEBA
    if (usuario === "admin" && password === "1234") {
      iniciarSesion();
      return;
    }

    setError("Usuario o contraseña incorrectos");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eaf8fc 0%, #f5fbfc 50%, #fff8ee 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =========================
          DECORACIONES
      ========================== */}

      {/* Cápsula */}
      <Box
        sx={{
          position: "absolute",
          width: 180,
          height: 65,
          borderRadius: "50px",
          background:
            "linear-gradient(90deg, rgba(66,185,212,0.10) 50%, rgba(255,190,110,0.10) 50%)",
          transform: "rotate(-25deg)",
          top: 100,
          left: -40,
        }}
      />

      {/* Pastilla */}
      <Box
        sx={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: "12px solid rgba(66,185,212,0.07)",
          right: 100,
          top: 120,
        }}
      />

      {/* Otra cápsula */}
      <Box
        sx={{
          position: "absolute",
          width: 140,
          height: 50,
          borderRadius: "50px",
          background:
            "linear-gradient(90deg, rgba(66,185,212,0.07) 50%, rgba(255,190,110,0.08) 50%)",
          transform: "rotate(25deg)",
          bottom: 100,
          right: -30,
        }}
      />

      {/* =========================
          LOGIN
      ========================== */}

      <Card
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: "24px",
          boxShadow:
            "0 20px 60px rgba(40,120,150,0.15)",
          border: "1px solid rgba(66,185,212,0.12)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Línea superior */}
        <Box
          sx={{
            height: 6,
            background:
              "linear-gradient(90deg, #42b9d4, #7bd5df, #ffbe6e)",
          }}
        />

        <CardContent sx={{ padding: 5 }}>
          {/* Logo */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, #42b9d4, #73cfdd)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 36,
                boxShadow:
                  "0 10px 25px rgba(66,185,212,0.25)",
              }}
            >
              💊
            </Box>
          </Box>

          <Typography
            variant="h4"
            fontWeight="800"
            textAlign="center"
            sx={{
              color: "#12344d",
            }}
          >
            Farmacia
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              color: "#607d8b",
              marginTop: 0.5,
              marginBottom: 4,
            }}
          >
            Ingresá al sistema de gestión
          </Typography>

          {/* Usuario */}

          <TextField
            fullWidth
            label="Usuario"
            placeholder="Ingresá tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Contraseña */}

          <TextField
            fullWidth
            label="Contraseña"
            placeholder="Ingresá tu contraseña"
            type={mostrarPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setMostrarPassword(!mostrarPassword)
                    }
                  >
                    {mostrarPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error */}

          {error && (
            <Typography
              sx={{
                color: "#d32f2f",
                marginTop: 2,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {error}
            </Typography>
          )}

          {/* Botón */}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              marginTop: 3,
              height: 48,
              borderRadius: "12px",
              textTransform: "none",
              fontSize: 16,
              fontWeight: "bold",
              background:
                "linear-gradient(90deg, #42b9d4, #55c5d9)",

              boxShadow:
                "0 8px 20px rgba(66,185,212,0.25)",

              "&:hover": {
                background:
                  "linear-gradient(90deg, #35abc7, #48bacf)",
                boxShadow:
                  "0 10px 25px rgba(66,185,212,0.35)",
              },
            }}
          >
            Iniciar sesión
          </Button>

          <Typography
            textAlign="center"
            sx={{
              marginTop: 3,
              fontSize: 13,
              color: "#90a4ae",
            }}
          >
            Sistema de gestión farmacéutica
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;