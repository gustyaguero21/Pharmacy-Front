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
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        background:
          "linear-gradient(135deg, #eaf8fc 0%, #f5fbfc 50%, #fff8ee 100%)",
        position: "relative",
        overflow: "hidden",

        px: {
          xs: 1.5,
          sm: 2,
          md: 3,
        },

        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* ==================================================
          DECORACIONES DE FONDO
      ================================================== */}

      {/* CÁPSULA IZQUIERDA */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 110,
            sm: 150,
            md: 180,
          },

          height: {
            xs: 40,
            sm: 50,
            md: 65,
          },

          borderRadius: "50px",

          background:
            "linear-gradient(90deg, rgba(66,185,212,0.10) 50%, rgba(255,190,110,0.10) 50%)",

          transform: "rotate(-25deg)",

          top: {
            xs: 40,
            sm: 70,
            md: 100,
          },

          left: {
            xs: -45,
            sm: -35,
            md: -40,
          },
        }}
      />

      {/* PASTILLA DERECHA */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 55,
            sm: 70,
            md: 80,
          },

          height: {
            xs: 55,
            sm: 70,
            md: 80,
          },

          borderRadius: "50%",

          border: {
            xs: "8px solid rgba(66,185,212,0.07)",
            sm: "10px solid rgba(66,185,212,0.07)",
            md: "12px solid rgba(66,185,212,0.07)",
          },

          right: {
            xs: 25,
            sm: 60,
            md: 100,
          },

          top: {
            xs: 45,
            sm: 80,
            md: 120,
          },
        }}
      />

      {/* CÁPSULA INFERIOR */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 100,
            sm: 120,
            md: 140,
          },

          height: {
            xs: 36,
            sm: 43,
            md: 50,
          },

          borderRadius: "50px",

          background:
            "linear-gradient(90deg, rgba(66,185,212,0.07) 50%, rgba(255,190,110,0.08) 50%)",

          transform: "rotate(25deg)",

          bottom: {
            xs: 40,
            sm: 70,
            md: 100,
          },

          right: {
            xs: -35,
            sm: -25,
            md: -30,
          },
        }}
      />

      {/* CÍRCULO DECORATIVO */}

      <Box
        sx={{
          position: "absolute",

          width: {
            xs: 90,
            sm: 140,
            md: 200,
          },

          height: {
            xs: 90,
            sm: 140,
            md: 200,
          },

          borderRadius: "50%",

          border: {
            xs: "2px solid rgba(255,190,110,0.08)",
            md: "3px solid rgba(255,190,110,0.08)",
          },

          bottom: {
            xs: -30,
            sm: -50,
            md: -70,
          },

          left: {
            xs: -30,
            sm: -40,
            md: -60,
          },
        }}
      />

      {/* ==================================================
          LOGIN
      ================================================== */}

      <Card
        sx={{
          width: "100%",

          maxWidth: {
            xs: 370,
            sm: 430,
          },

          borderRadius: {
            xs: "18px",
            sm: "22px",
            md: "24px",
          },

          boxShadow:
            "0 20px 60px rgba(40,120,150,0.15)",

          border:
            "1px solid rgba(66,185,212,0.12)",

          position: "relative",
          zIndex: 2,

          overflow: "hidden",
        }}
      >
        {/* LÍNEA SUPERIOR */}

        <Box
          sx={{
            height: {
              xs: 4,
              sm: 5,
              md: 6,
            },

            background:
              "linear-gradient(90deg, #42b9d4, #7bd5df, #ffbe6e)",
          }}
        />

        <CardContent
          sx={{
            px: {
              xs: 2.5,
              sm: 4,
              md: 5,
            },

            py: {
              xs: 3,
              sm: 4,
              md: 5,
            },
          }}
        >
          {/* ==================================================
              LOGO
          ================================================== */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: {
                xs: 1.5,
                sm: 2,
              },
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 55,
                  sm: 65,
                  md: 70,
                },

                height: {
                  xs: 55,
                  sm: 65,
                  md: 70,
                },

                borderRadius: {
                  xs: "16px",
                  sm: "18px",
                  md: "20px",
                },

                background:
                  "linear-gradient(135deg, #42b9d4, #73cfdd)",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: {
                  xs: 28,
                  sm: 32,
                  md: 36,
                },

                boxShadow:
                  "0 10px 25px rgba(66,185,212,0.25)",
              }}
            >
              💊
            </Box>
          </Box>

          {/* ==================================================
              TÍTULO
          ================================================== */}

          <Typography
            variant="h4"
            fontWeight="800"
            textAlign="center"
            sx={{
              color: "#12344d",

              fontSize: {
                xs: "1.8rem",
                sm: "2.1rem",
                md: "2.125rem",
              },
            }}
          >
            Farmacia
          </Typography>

          <Typography
            textAlign="center"
            sx={{
              color: "#607d8b",

              marginTop: 0.5,

              marginBottom: {
                xs: 2.5,
                sm: 3,
                md: 4,
              },

              fontSize: {
                xs: "0.85rem",
                sm: "0.95rem",
                md: "1rem",
              },
            }}
          >
            Ingresá al sistema de gestión
          </Typography>

          {/* ==================================================
              USUARIO
          ================================================== */}

          <TextField
            fullWidth
            label="Usuario"
            placeholder="Ingresá tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            sx={{
              marginBottom: 2,

              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",

                "&:hover fieldset": {
                  borderColor: "#42b9d4",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#42b9d4",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#42b9d4",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon
                    sx={{
                      color: "#75b9c7",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* ==================================================
              CONTRASEÑA
          ================================================== */}

          <TextField
            fullWidth
            label="Contraseña"
            placeholder="Ingresá tu contraseña"
            type={
              mostrarPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",

                "&:hover fieldset": {
                  borderColor: "#42b9d4",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#42b9d4",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: "#42b9d4",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon
                    sx={{
                      color: "#75b9c7",
                    }}
                  />
                </InputAdornment>
              ),

              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setMostrarPassword(
                        !mostrarPassword
                      )
                    }
                    edge="end"
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

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <Typography
              sx={{
                color: "#d32f2f",

                marginTop: 2,

                textAlign: "center",

                fontSize: {
                  xs: 12,
                  sm: 14,
                },
              }}
            >
              {error}
            </Typography>
          )}

          {/* ==================================================
              BOTÓN
          ================================================== */}

          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              marginTop: 3,

              height: {
                xs: 46,
                sm: 48,
                md: 50,
              },

              borderRadius: "12px",

              textTransform: "none",

              fontSize: {
                xs: 14,
                sm: 15,
                md: 16,
              },

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

          {/* ==================================================
              PIE
          ================================================== */}

          <Typography
            textAlign="center"
            sx={{
              marginTop: 3,

              fontSize: {
                xs: 11,
                sm: 12,
                md: 13,
              },

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