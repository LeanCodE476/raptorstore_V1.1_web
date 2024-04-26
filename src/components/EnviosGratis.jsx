import { Box, Typography } from "@mui/material";
import React from "react";

const EnviosGratis = () => {
  return (
    <Box
      sx={{
        bgcolor: "yellow",
        m: "1rem auto",
        height: "2rem auto",
        width: "93%",
        borderRadius: ".3rem",
        boxShadow: "0px 4px 5px 0px rgba(0,0,0,0.5)",
        maxWidth: "50rem",
        outline: "2px solid black",
      }}
    >
      <Typography
        variant="h6"
        textAlign={"center"}
        color={"black"}
        fontWeight={"bold"}
      >
        {" "}
        Envios Gratis a todo el Pais en compras mayores a $65.000!
      </Typography>
    </Box>
  );
};

export default EnviosGratis;
