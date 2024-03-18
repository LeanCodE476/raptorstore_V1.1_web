import { Box, Button, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ width: "100%", backgroundColor: "black", pb: "1rem" }}
      textAlign={"center"}
      borderTop={"2px solid #FF0000"}
    >
      <Typography color={"#FF0000"} pt={"1rem"} fontSize={".8rem"}>
        Todos los derechos reservados ©raptorstore
      </Typography>
      <Typography
        fontWeight={"bold"}
        textAlign={"center"}
        color={"#FF0000"}
        mt={"2rem"}
      >
        Contactanos
      </Typography>
      <Box
        sx={{
          m: "1rem auto",
          display: "flex",
          justifyContent: "space-around",
          maxWidth: "50rem",
        }}
      >
        {" "}
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
          <Button sx={{ color: "#ff0000", fontSize: ".7rem" }}>
            <WhatsAppIcon sx={{ paddingRight: "1rem", fontSize: "2.5rem" }} />
            +54 3755 503038
          </Button>

          <Button sx={{ color: "#ff0000", fontSize: ".7rem" }}>
            <EmailIcon sx={{ paddingRight: "1rem", fontSize: "2.5rem" }} />
            raptorstoreventas@gmail.com
          </Button>

          <Button sx={{ color: "#ff0000", fontSize: ".7rem" }}>
            <LocationOnIcon sx={{ paddingRight: "1rem", fontSize: "2.5rem" }} />
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
          <Button sx={{ color: "#ff0000", fontSize: ".7rem" }}>
            <InstagramIcon sx={{ paddingRight: "1rem", fontSize: "2.5rem" }} />
            RaptorStore
          </Button>
          <Button sx={{ color: "#ff0000", fontSize: ".7rem" }}>
            <FacebookIcon sx={{ paddingRight: "1rem", fontSize: "2.5rem" }} />{" "}
            RaptorStore
          </Button>
        </Box>
      </Box>
      <Button
        sx={{
          color: "#F1C40F",
          textTransform: "capitalize",
          fontSize: ".8rem",
        }}
      >
        <GitHubIcon sx={{ paddingRight: "1rem", fontSize: "2.4rem" }} />
        developed and designed by leandro balmaceda
      </Button>
    </Box>
  );
};

export default Footer;
