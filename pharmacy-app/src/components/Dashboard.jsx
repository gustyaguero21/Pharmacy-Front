import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

function Dashboard({ setPagina }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f4f9fc 0%, #eef7fa 50%, #f8fbfd 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          DECORACIONES DE FONDO
      ====================================================== */}

      {/* CÁPSULA 1 */}
      <Box
        sx={{
          position: "absolute",
          width: 180,
          height: 70,
          borderRadius: "50px",
          background:
            "linear-gradient(90deg, rgba(25,118,210,0.08) 50%, rgba(0,188,212,0.08) 50%)",
          transform: "rotate(-25deg)",
          top: 130,
          right: -45,
          zIndex: 0,
          border: "2px solid rgba(25,118,210,0.06)",
        }}
      />

      {/* CÁPSULA 2 */}
      <Box
        sx={{
          position: "absolute",
          width: 150,
          height: 58,
          borderRadius: "50px",
          background:
            "linear-gradient(90deg, rgba(0,172,193,0.07) 50%, rgba(25,118,210,0.07) 50%)",
          transform: "rotate(30deg)",
          bottom: 100,
          left: -40,
          zIndex: 0,
          border: "2px solid rgba(0,172,193,0.05)",
        }}
      />

      {/* PASTILLA 1 */}
      <Box
        sx={{
          position: "absolute",
          width: 75,
          height: 75,
          borderRadius: "50%",
          backgroundColor: "rgba(25,118,210,0.055)",
          top: 330,
          right: 90,
          zIndex: 0,
          border: "2px solid rgba(25,118,210,0.05)",
        }}
      />

      {/* PASTILLA 2 */}
      <Box
        sx={{
          position: "absolute",
          width: 55,
          height: 55,
          borderRadius: "50%",
          backgroundColor: "rgba(0,188,212,0.06)",
          bottom: 180,
          right: 260,
          zIndex: 0,
          border: "2px solid rgba(0,188,212,0.05)",
        }}
      />

      {/* =====================================================
          JERINGA 1
      ====================================================== */}

      <Box
        sx={{
          position: "absolute",
          width: 190,
          height: 32,
          top: 210,
          left: -55,
          transform: "rotate(-28deg)",
          opacity: 0.12,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 35,
            top: 4,
            width: 110,
            height: 24,
            border: "3px solid #1976d2",
            borderRadius: "5px",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 5,
            top: 8,
            width: 35,
            height: 16,
            border: "3px solid #1976d2",
            borderRadius: "4px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: -45,
            top: 13,
            width: 50,
            height: 3,
            backgroundColor: "#1976d2",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: -55,
            top: 10,
            width: 15,
            height: 3,
            backgroundColor: "#1976d2",
            transform: "rotate(-8deg)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 55,
            top: 10,
            width: 2,
            height: 12,
            backgroundColor: "#1976d2",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 75,
            top: 10,
            width: 2,
            height: 12,
            backgroundColor: "#1976d2",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 95,
            top: 10,
            width: 2,
            height: 12,
            backgroundColor: "#1976d2",
          }}
        />
      </Box>

      {/* =====================================================
          JERINGA 2
      ====================================================== */}

      <Box
        sx={{
          position: "absolute",
          width: 170,
          height: 30,
          bottom: 40,
          right: -40,
          transform: "rotate(25deg)",
          opacity: 0.09,
          zIndex: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 30,
            top: 4,
            width: 105,
            height: 22,
            border: "3px solid #00acc1",
            borderRadius: "5px",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 8,
            width: 35,
            height: 14,
            border: "3px solid #00acc1",
            borderRadius: "4px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            right: -45,
            top: 13,
            width: 50,
            height: 3,
            backgroundColor: "#00acc1",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 52,
            top: 9,
            width: 2,
            height: 12,
            backgroundColor: "#00acc1",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 72,
            top: 9,
            width: 2,
            height: 12,
            backgroundColor: "#00acc1",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            left: 92,
            top: 9,
            width: 2,
            height: 12,
            backgroundColor: "#00acc1",
          }}
        />
      </Box>

      {/* PEQUEÑAS PASTILLAS */}

      <Box
        sx={{
          position: "absolute",
          width: 32,
          height: 15,
          borderRadius: "20px",
          backgroundColor: "rgba(25,118,210,0.08)",
          transform: "rotate(35deg)",
          top: 110,
          left: "38%",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 42,
          height: 18,
          borderRadius: "20px",
          backgroundColor: "rgba(0,188,212,0.08)",
          transform: "rotate(-20deg)",
          bottom: 90,
          left: "42%",
          zIndex: 0,
        }}
      />

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ====================================================== */}

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
        }}
      >
        {/* =====================================================
            MENÚ LATERAL
        ====================================================== */}

        <Box
          sx={{
            width: 245,
            minHeight: "100vh",
            background:
              "linear-gradient(180deg, #c8a2e8 0%, #d8b9f0 100%)",
            boxShadow: "4px 0 20px rgba(130,80,170,0.15)",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            padding: 2,
            zIndex: 10,
            overflow: "hidden",
          }}
        >
          {/* DETALLES DEL MENÚ */}

          <Box
            sx={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.16)",
              right: -55,
              top: 100,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: "2px solid rgba(255,190,110,0.20)",
              left: -45,
              bottom: 80,
            }}
          />

          {/* LOGO */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: 1.5,
              marginBottom: 3,
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "14px",
                backgroundColor: "rgba(255,255,255,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 25,
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              💊
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  lineHeight: 1,
                  color: "#4a315e",
                }}
              >
                Farmacia
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: "#5f4770",
                }}
              >
                Sistema de gestión
              </Typography>
            </Box>
          </Box>

          {/* SEPARADOR */}

          <Box
            sx={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.35)",
              marginBottom: 2,
            }}
          />

          {/* MENÚ */}

          <Typography
            sx={{
              color: "#654878",
              fontSize: "0.75rem",
              fontWeight: "bold",
              padding: "0 12px",
              marginBottom: 1,
              textTransform: "uppercase",
            }}
          >
            Menú principal
          </Typography>

          <Button
            sx={{
              justifyContent: "flex-start",
              color: "#4a315e",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              padding: "12px 15px",
              marginBottom: 0.7,
              backgroundColor: "rgba(255,255,255,0.28)",
              position: "relative",
              zIndex: 2,
            }}
          >
            🏠
            <Box component="span" sx={{ ml: 1.5 }}>
              Dashboard
            </Box>
          </Button>

          <Button
            onClick={() => setPagina("medicamentos")}
            sx={{
              justifyContent: "flex-start",
              color: "#4a315e",
              borderRadius: "12px",
              textTransform: "none",
              padding: "12px 15px",
              marginBottom: 0.7,
              position: "relative",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.20)",
              },
            }}
          >
            💊
            <Box component="span" sx={{ ml: 1.5 }}>
              Medicamentos
            </Box>
          </Button>

          <Button
            onClick={() => setPagina("categorias")}
            sx={{
              justifyContent: "flex-start",
              color: "#4a315e",
              borderRadius: "12px",
              textTransform: "none",
              padding: "12px 15px",
              marginBottom: 0.7,
              position: "relative",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.20)",
              },
            }}
          >
            📂
            <Box component="span" sx={{ ml: 1.5 }}>
              Categorías
            </Box>
          </Button>

          <Button
            onClick={() => setPagina("empleados")}
            sx={{
              justifyContent: "flex-start",
              color: "#4a315e",
              borderRadius: "12px",
              textTransform: "none",
              padding: "12px 15px",
              marginBottom: 0.7,
              position: "relative",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.20)",
              },
            }}
          >
            👨‍💼
            <Box component="span" sx={{ ml: 1.5 }}>
              Empleados
            </Box>
          </Button>

          {/* PARTE INFERIOR */}

          <Box
            sx={{
              marginTop: "auto",
              padding: 1.5,
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              sx={{
                color: "#654878",
                fontSize: "0.75rem",
                textAlign: "center",
              }}
            >
              Sistema de Farmacia
            </Typography>
          </Box>
        </Box>

        {/* =====================================================
            CONTENIDO
        ====================================================== */}

        <Box
          sx={{
            marginLeft: "245px",
            width: "calc(100% - 245px)",
            minHeight: "100vh",
          }}
        >
          {/* BARRA SUPERIOR */}

          <Box
            sx={{
              background:
                "linear-gradient(90deg, #c8a2e8, #d8b9f0)",
              boxShadow:
                "0 4px 20px rgba(130,80,170,0.20)",
              minHeight: 68,
              padding: "14px 30px",
              display: "flex",
              alignItems: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* LÍNEAS DECORATIVAS */}

            <Box
              sx={{
                position: "absolute",
                width: 220,
                height: 2,
                backgroundColor:
                  "rgba(255,255,255,0.25)",
                transform: "rotate(-18deg)",
                right: 320,
                top: 12,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 150,
                height: 2,
                backgroundColor:
                  "rgba(255,194,120,0.65)",
                transform: "rotate(-18deg)",
                right: 170,
                bottom: 13,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 100,
                height: 2,
                backgroundColor:
                  "rgba(255,255,255,0.20)",
                transform: "rotate(-18deg)",
                right: 80,
                top: 10,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: 75,
                height: 75,
                borderRadius: "50%",
                border:
                  "2px solid rgba(255,190,110,0.35)",
                right: -25,
                top: -25,
              }}
            />

            <Typography
              sx={{
                color: "#4a315e",
                fontWeight: "bold",
                position: "relative",
                zIndex: 2,
              }}
            >
              Panel de administración
            </Typography>
          </Box>

          {/* CONTENIDO */}

          <Box
            sx={{
              padding: {
                xs: 3,
                md: 5,
              },
              maxWidth: 1400,
              margin: "0 auto",
            }}
          >
            {/* ENCABEZADO */}

            <Box sx={{ marginBottom: 4 }}>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{
                  color: "#12344d",
                  fontSize: {
                    xs: "2rem",
                    md: "2.7rem",
                  },
                }}
              >
                Dashboard
              </Typography>

              <Typography
                sx={{
                  color: "#607d8b",
                  marginTop: 0.5,
                  fontSize: "1rem",
                }}
              >
                Administración y control de la farmacia
              </Typography>
            </Box>

            {/* TARJETAS */}

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
                sx={{
                  borderRadius: "20px",
                  border:
                    "1px solid rgba(33,150,243,0.10)",
                  boxShadow:
                    "0 10px 35px rgba(33,150,243,0.10)",
                  transition: "0.25s",
                  overflow: "hidden",

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 16px 40px rgba(33,150,243,0.18)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 5,
                    background:
                      "linear-gradient(90deg, #1976d2, #00acc1)",
                  }}
                />

                <CardContent sx={{ padding: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#607d8b",
                          fontWeight: 600,
                        }}
                      >
                        Medicamentos
                      </Typography>

                      <Typography
                        variant="h2"
                        fontWeight="800"
                        sx={{
                          color: "#12344d",
                          marginTop: 1,
                        }}
                      >
                        10
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "18px",
                        background:
                          "linear-gradient(135deg, #e3f2fd, #e0f7fa)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                      }}
                    >
                      💊
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      setPagina("medicamentos")
                    }
                    sx={{
                      marginTop: 3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: "bold",
                      background:
                        "linear-gradient(90deg, #1976d2, #00acc1)",
                      boxShadow: "none",

                      "&:hover": {
                        boxShadow:
                          "0 6px 18px rgba(25,118,210,0.25)",
                      },
                    }}
                  >
                    Ver medicamentos
                  </Button>
                </CardContent>
              </Card>

              {/* CATEGORÍAS */}

              <Card
                sx={{
                  borderRadius: "20px",
                  border:
                    "1px solid rgba(0,188,212,0.10)",
                  boxShadow:
                    "0 10px 35px rgba(0,188,212,0.08)",
                  transition: "0.25s",
                  overflow: "hidden",

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 16px 40px rgba(0,188,212,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 5,
                    background:
                      "linear-gradient(90deg, #00acc1, #26c6da)",
                  }}
                />

                <CardContent sx={{ padding: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#607d8b",
                          fontWeight: 600,
                        }}
                      >
                        Categorías
                      </Typography>

                      <Typography
                        variant="h2"
                        fontWeight="800"
                        sx={{
                          color: "#12344d",
                          marginTop: 1,
                        }}
                      >
                        5
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "18px",
                        background:
                          "linear-gradient(135deg, #e0f7fa, #e8f5e9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                      }}
                    >
                      📂
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      setPagina("categorias")
                    }
                    sx={{
                      marginTop: 3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: "bold",
                      borderColor: "#00acc1",
                      color: "#00838f",
                    }}
                  >
                    Ver categorías
                  </Button>
                </CardContent>
              </Card>

              {/* EMPLEADOS */}

              <Card
                sx={{
                  borderRadius: "20px",
                  border:
                    "1px solid rgba(46,125,50,0.10)",
                  boxShadow:
                    "0 10px 35px rgba(46,125,50,0.08)",
                  transition: "0.25s",
                  overflow: "hidden",

                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      "0 16px 40px rgba(46,125,50,0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    height: 5,
                    background:
                      "linear-gradient(90deg, #2e7d32, #66bb6a)",
                  }}
                />

                <CardContent sx={{ padding: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#607d8b",
                          fontWeight: 600,
                        }}
                      >
                        Empleados
                      </Typography>

                      <Typography
                        variant="h2"
                        fontWeight="800"
                        sx={{
                          color: "#12344d",
                          marginTop: 1,
                        }}
                      >
                        5
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "18px",
                        background:
                          "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                      }}
                    >
                      👨‍💼
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() =>
                      setPagina("empleados")
                    }
                    sx={{
                      marginTop: 3,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontWeight: "bold",
                      borderColor: "#43a047",
                      color: "#2e7d32",
                    }}
                  >
                    Ver empleados
                  </Button>
                </CardContent>
              </Card>
            </Box>

            {/* INFORMACIÓN */}

            <Box
              sx={{
                marginTop: 4,
                padding: 3,
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,252,0.9))",
                border:
                  "1px solid rgba(33,150,243,0.08)",
                boxShadow:
                  "0 8px 30px rgba(30,100,130,0.06)",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#12344d" }}
              >
                Sistema de gestión farmacéutica
              </Typography>

              <Typography
                sx={{
                  color: "#607d8b",
                  marginTop: 1,
                }}
              >
                Desde este panel podés administrar
                medicamentos, categorías y empleados de
                la farmacia.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
