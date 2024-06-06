import React, { useState, useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { supabase } from "../../supabaseClient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NavListDrawer = ({ setOpen, handleTypeSelection }) => {
  const [tiposUnicos, setTiposUnicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const { data, error } = await supabase.from("products").select("tipo");
        if (error) throw error;

        const tipos = Array.from(new Set(data.map((product) => product.tipo)));
        setTiposUnicos(tipos);
      } catch (error) {
        console.error("Error fetching product types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipos();
  }, []);

  return (
    <>
      <Box sx={{ borderBottom: "2px solid #FF0000" }}>
        <Typography
          variant="h5"
          textAlign={"center"}
          color={"#ff0000"}
          bgcolor={"black"}
          height={"3rem"}
          lineHeight={"3rem"}
          onClick={() => setOpen(false)}
        >
          Cerrar{" "}
        </Typography>
        <hr />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          tiposUnicos.map((tipo, index) => (
            <Button
              key={index}
              sx={{
                width: "100%",
                textTransform: "capitalize",
                bgcolor: "#F2F3F4",
                color: "#626567 ",
                borderBottom: "1px solid #D7DBDD",
                fontSize: "1rem",
              }}
              onClick={() => {
                setOpen(false);
                handleTypeSelection(tipo);
              }}
            >
              {tipo}
            </Button>
          ))
        )}
        <Button
          sx={{
            width: "100%",
            textTransform: "capitalize",
            bgcolor: "black",
            color: "#ff0000",
            borderBottom: "1px solid #D7DBDD",
            fontSize: "1rem",
            borderRadius: "0px",
          }}
          onClick={() => {
            setOpen(false);
            handleTypeSelection(null);
          }}
        >
          <ArrowBackIcon />
          Volver al Inicio
        </Button>
      </Box>
    </>
  );
};

export default NavListDrawer;
