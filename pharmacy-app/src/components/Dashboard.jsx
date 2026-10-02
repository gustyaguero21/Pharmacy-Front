import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MedicationIcon from "@mui/icons-material/Medication";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import VaccinesIcon from "@mui/icons-material/Vaccines";

import { useEffect } from "react";

function Dashboard({ setPagina }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // =========================
  // CANTIDADES
  // =========================

  const [cantidadMedicamentos, setCantidadMedicamentos] =
    useState(6);

  const [cantidadCategorias, setCantidadCategorias] =
    useState(4);

  const [cantidadEmpleados, setCantidadEmpleados] =
    useState(3);

  // =========================
  // NAVEGACION
  // =========================

  const navegar = (pagina) => {
    setPagina(pagina);
    setMenuAbierto(false);
  };

  // =========================
  // MENU
  // =========================

  const opcionesMenu = [
    {
      nombre: "Medicamentos",
      icono: <MedicationIcon />,
      pagina: "medicamentos",
    },
    {
      nombre: "Categorías",
      icono: <CategoryIcon />,
      pagina: "categorias",
    },
    {
      nombre: "Empleados",
      icono: <PeopleIcon />,
      pagina: "empleados",
    },
  ];

  // =========================
  // CANTIDADES DE PRUEBA
  // =========================

  useEffect(() => {
    /*
      Por ahora usamos las cantidades
      de los datos de prueba:

      Medicamentos = 6
      Categorías = 4
      Empleados = 3

      Cuando conectemos Flask + MySQL,
      estas cantidades van a salir
      directamente de la base de datos.
    */
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #f4f9fc 0%, #eef7fa 50%, #f8fbfd 100%)",
      }}
    >
      {/* =========================
          BARRA SUPERIOR
      ========================== */}

      <Box
        sx={{
          height: 8,
          width: "100%",
          background:
            "linear-gradient(90deg, #7dd3fc, #a5d8ff, #f3c4a8)",
        }}
      />

      {/* =========================
          DECORACION DE FONDO
      ========================== */}

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "rgba(125,211,252,0.08)",
          top: -120,
          right: -100,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "rgba(200,162,232,0.08)",
          bottom: -100,
          left: -80,
          pointerEvents: "none",
        }}
      />

      {/* =========================
          ENCABEZADO
      ========================== */}

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, md: 5 },
          py: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #a978d1, #c8a2e8)",
              color: "#ffffff",
              boxShadow:
                "0 6px 18px rgba(100,60,130,0.18)",
            }}
          >
            <LocalHospitalIcon />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "#4a315e",
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              Farmacia
            </Typography>

            <Typography
              sx={{
                color: "#7b6689",
                fontSize: "0.8rem",
              }}
            >
              Sistema de gestión
            </Typography>
          </Box>
        </Box>

        {/* MENU DESKTOP */}

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
          }}
        >
          {opcionesMenu.map((opcion) => (
            <Button
              key={opcion.pagina}
              onClick={() => navegar(opcion.pagina)}
              startIcon={opcion.icono}
              sx={{
                color: "#5f4770",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "10px",
                px: 2,

                "&:hover": {
                  backgroundColor:
                    "rgba(200,162,232,0.12)",
                  color: "#7b4f9d",
                },
              }}
            >
              {opcion.nombre}
            </Button>
          ))}
        </Box>

        {/* MENU MOBILE */}

        <IconButton
          onClick={() => setMenuAbierto(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#5f4770",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* =========================
          DRAWER MOBILE
      ========================== */}

      <Drawer
        anchor="right"
        open={menuAbierto}
        onClose={() => setMenuAbierto(false)}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            background:
              "linear-gradient(180deg, #f8fbfd, #eef7fa)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography
              fontWeight="bold"
              sx={{
                color: "#4a315e",
              }}
            >
              Menú
            </Typography>

            <IconButton
              onClick={() => setMenuAbierto(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          <List>
            {opcionesMenu.map((opcion) => (
              <ListItem
                key={opcion.pagina}
                disablePadding
              >
                <ListItemButton
                  onClick={() =>
                    navegar(opcion.pagina)
                  }
                >
                  <ListItemIcon
                    sx={{
                      color: "#9b68c7",
                    }}
                  >
                    {opcion.icono}
                  </ListItemIcon>

                  <ListItemText
                    primary={opcion.nombre}
                    primaryTypographyProps={{
                      fontWeight: "bold",
                      color: "#5f4770",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* =========================
          CONTENIDO
      ========================== */}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 7 },
        }}
      >
        {/* TITULO */}

        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 70,
              height: 70,
              borderRadius: "22px",
              mb: 2,
              background:
                "linear-gradient(135deg, #a978d1, #c8a2e8)",
              color: "#ffffff",
              boxShadow:
                "0 10px 25px rgba(100,60,130,0.18)",
            }}
          >
            <VaccinesIcon
              sx={{
                fontSize: 38,
              }}
            />
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#4a315e",
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Dashboard
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: "#6d5580",
              fontSize: {
                xs: "0.95rem",
                md: "1.05rem",
              },
            }}
          >
            Bienvenido al sistema de gestión de la farmacia.
          </Typography>
        </Box>

        {/* =========================
            TARJETAS PRINCIPALES
        ========================== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {/* MEDICAMENTOS */}

          <Card
            onClick={() => navegar("medicamentos")}
            sx={{
              cursor: "pointer",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
              boxShadow:
                "0 10px 30px rgba(130,80,170,0.14)",
              border:
                "1px solid rgba(255,255,255,0.45)",
              overflow: "hidden",
              transition: "0.25s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  "0 15px 35px rgba(130,80,170,0.22)",
              },
            }}
          >
            <Box
              sx={{
                height: 6,
                background:
                  "linear-gradient(90deg, #a978d1, #e5c9f7)",
              }}
            />

            <CardContent
              sx={{
                p: 3.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(255,255,255,0.35)",
                    color: "#5f3d76",
                  }}
                >
                  <MedicationIcon
                    sx={{
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#4a315e",
                  }}
                >
                  {cantidadMedicamentos}
                </Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  color: "#4a315e",
                }}
              >
                Medicamentos
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#5f4770",
                }}
              >
                {cantidadMedicamentos === 1
                  ? "1 medicamento registrado"
                  : `${cantidadMedicamentos} medicamentos registrados`}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#6d5580",
                  fontSize: "0.9rem",
                }}
              >
                Administrar medicamentos, stock y precios.
              </Typography>
            </CardContent>
          </Card>

          {/* CATEGORIAS */}

          <Card
            onClick={() => navegar("categorias")}
            sx={{
              cursor: "pointer",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
              boxShadow:
                "0 10px 30px rgba(130,80,170,0.14)",
              border:
                "1px solid rgba(255,255,255,0.45)",
              overflow: "hidden",
              transition: "0.25s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  "0 15px 35px rgba(130,80,170,0.22)",
              },
            }}
          >
            <Box
              sx={{
                height: 6,
                background:
                  "linear-gradient(90deg, #a978d1, #e5c9f7)",
              }}
            />

            <CardContent
              sx={{
                p: 3.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(255,255,255,0.35)",
                    color: "#5f3d76",
                  }}
                >
                  <CategoryIcon
                    sx={{
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#4a315e",
                  }}
                >
                  {cantidadCategorias}
                </Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  color: "#4a315e",
                }}
              >
                Categorías
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#5f4770",
                }}
              >
                {cantidadCategorias === 1
                  ? "1 categoría registrada"
                  : `${cantidadCategorias} categorías registradas`}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#6d5580",
                  fontSize: "0.9rem",
                }}
              >
                Organizar y administrar categorías.
              </Typography>
            </CardContent>
          </Card>

          {/* EMPLEADOS */}

          <Card
            onClick={() => navegar("empleados")}
            sx={{
              cursor: "pointer",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg, #c8a2e8 0%, #d8b9f0 100%)",
              boxShadow:
                "0 10px 30px rgba(130,80,170,0.14)",
              border:
                "1px solid rgba(255,255,255,0.45)",
              overflow: "hidden",
              transition: "0.25s",

              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow:
                  "0 15px 35px rgba(130,80,170,0.22)",
              },
            }}
          >
            <Box
              sx={{
                height: 6,
                background:
                  "linear-gradient(90deg, #a978d1, #e5c9f7)",
              }}
            />

            <CardContent
              sx={{
                p: 3.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: 55,
                    height: 55,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "rgba(255,255,255,0.35)",
                    color: "#5f3d76",
                  }}
                >
                  <PeopleIcon
                    sx={{
                      fontSize: 32,
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#4a315e",
                  }}
                >
                  {cantidadEmpleados}
                </Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  color: "#4a315e",
                }}
              >
                Empleados
              </Typography>

              <Typography
                sx={{
                  mt: 0.8,
                  color: "#5f4770",
                }}
              >
                {cantidadEmpleados === 1
                  ? "1 empleado registrado"
                  : `${cantidadEmpleados} empleados registrados`}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  color: "#6d5580",
                  fontSize: "0.9rem",
                }}
              >
                Administrar empleados y usuarios.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* =========================
            ACCESOS RAPIDOS
        ========================== */}

        <Card
          sx={{
            mt: 5,
            borderRadius: "22px",
            background:
              "rgba(255,255,255,0.92)",
            border:
              "1px solid rgba(130,80,170,0.08)",
            boxShadow:
              "0 8px 25px rgba(130,80,170,0.08)",
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, md: 3.5 },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#4a315e",
                mb: 2,
              }}
            >
              Accesos rápidos
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1.5,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<MedicationIcon />}
                onClick={() => navegar("medicamentos")}
                sx={{
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",

                  "&:hover": {
                    borderColor: "#a978d1",
                    backgroundColor:
                      "rgba(200,162,232,0.10)",
                  },
                }}
              >
                Medicamentos
              </Button>

              <Button
                variant="outlined"
                startIcon={<CategoryIcon />}
                onClick={() => navegar("categorias")}
                sx={{
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",

                  "&:hover": {
                    borderColor: "#a978d1",
                    backgroundColor:
                      "rgba(200,162,232,0.10)",
                  },
                }}
              >
                Categorías
              </Button>

              <Button
                variant="outlined"
                startIcon={<PeopleIcon />}
                onClick={() => navegar("empleados")}
                sx={{
                  borderColor: "#c8a2e8",
                  color: "#6d4d82",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",

                  "&:hover": {
                    borderColor: "#a978d1",
                    backgroundColor:
                      "rgba(200,162,232,0.10)",
                  },
                }}
              >
                Empleados
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* =========================
            PIE
        ========================== */}

        <Box
          sx={{
            textAlign: "center",
            mt: 5,
          }}
        >
          <Typography
            sx={{
              color: "#8b7897",
              fontSize: "0.85rem",
            }}
          >
            Sistema de gestión de farmacia
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;