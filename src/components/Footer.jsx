import React from "react";
import { Box, Button, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  const openWhatsApp = () => {
    const telefono = "3755503038";
    const mensaje = "Hola, quiero consultar acerca de...";
    window.open(
      `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "black",
        pb: "1rem",
      }}
      textAlign={"center"}
      borderTop={"2px solid #FF0000"}
      position={"relative"}
      overflow={"hidden"}
    >
      <Typography
        color={"#FF0000"}
        fontSize={"1rem"}
        position={"absolute"}
        fontWeight={"bold"}
        left={"1rem"}
        top={".8rem"}
        sx={{ "@media (max-width: 375px)": { fontSize: ".8rem" } }}
      >
        V 1.0
      </Typography>
      <Typography color={"#FF0000"} pt={"1rem"} fontSize={".8rem"}>
        Todos los derechos reservados ©raptorstore
      </Typography>
      <Typography
        fontWeight={"bold"}
        textAlign={"center"}
        color={"#FF0000"}
        mt={"2rem"}
        sx={{ "@media (max-width: 375px)": { fontSize: "1rem" } }}
      >
        Contactanos
      </Typography>
      <Box
        sx={{
          m: "1rem auto",
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          maxWidth: "50rem",
        }}
      >
        <Box
          color={"#FF0000"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "10rem",
            width: "16rem",
          }}
        >
          <Button
            sx={{
              color: "#ff0000",
              fontSize: ".9rem",
              "@media (max-width: 375px)": { fontSize: ".5rem" },
            }}
            onClick={openWhatsApp}
          >
            <WhatsAppIcon
              sx={{
                paddingRight: "1rem",
                fontSize: "2.5rem",
                "@media (max-width: 375px)": {
                  fontSize: "1rem",
                  paddingRight: "0rem",
                },
              }}
            />
            +54 3755 503038
          </Button>

          <Button
            sx={{
              color: "#ff0000",
              fontSize: ".9rem",
              textTransform: "lowercase",
              "@media (max-width: 375px)": { fontSize: ".5rem" },
            }}
          >
            <EmailIcon
              sx={{
                paddingRight: "1rem",
                fontSize: "2.5rem",
                "@media (max-width: 375px)": {
                  fontSize: "1rem",
                  paddingRight: "0rem",
                },
              }}
            />
            raptorstoreventas@gmail.com
          </Button>

          <Button
            sx={{
              color: "#ff0000",
              fontSize: ".9rem",
              textTransform: "capitalize",
              "@media (max-width: 375px)": { fontSize: ".5rem" },
            }}
          >
            <LocationOnIcon
              sx={{
                paddingRight: "1rem",
                fontSize: "2.5rem",
                "@media (max-width: 375px)": {
                  fontSize: "1rem",
                  paddingRight: "0rem",
                },
              }}
            />
            Obera, Misiones,Argentina
          </Button>
        </Box>
        <Box
          color={"#FF0000"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
            height: "10rem",
          }}
        >
          <Button
            sx={{
              color: "#ff0000",
              fontSize: ".9rem",
              textTransform: "lowercase",
            }}
            href="https://www.instagram.com/raptor_store_ventas/?hl=es"
            target="blank"
          >
            <InstagramIcon
              sx={{
                paddingRight: "1rem",
                fontSize: "2.5rem",
                "@media (max-width: 375px)": {
                  fontSize: "1rem",
                  paddingRight: "0rem",
                },
              }}
            />
            raptorstore
          </Button>

          <Button
            sx={{
              color: "#ff0000",
              fontSize: ".9rem",
              textTransform: "lowercase",
            }}
            href="https://www.facebook.com/profile.php?id=61557818861437"
            target="blank"
          >
            <FacebookIcon
              sx={{
                paddingRight: "1rem",
                fontSize: "2.5rem",
                "@media (max-width: 375px)": {
                  fontSize: "1rem",
                  paddingRight: "0rem",
                },
              }}
            />{" "}
            raptorstore
          </Button>
        </Box>
      </Box>
      <Button
        sx={{
          color: "#F1C40F",
          textTransform: "capitalize",
          fontSize: ".8rem",
        }}
        href="https://github.com/LeanCodE476"
        target="blank"
      >
        <GitHubIcon
          sx={{
            paddingRight: "1rem",
            fontSize: "2.4rem",
            "@media (max-width: 375px)": {
              fontSize: "2rem",
              paddingRight: "1rem",
            },
          }}
        />
        developed and designed by leandro balmaceda
      </Button>
      {/* Botón para copiar el correo */}
    </Box>
  );
};

export default Footer;
