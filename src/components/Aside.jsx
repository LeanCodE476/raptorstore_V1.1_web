// src/components/Aside.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { supabase } from "../supabaseClient";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";

const Aside = ({ handleTypeSelection }) => {
  const [tiposUnicos, setTiposUnicos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const { data, error } = await supabase.from("products").select("tipo");
        if (error) throw error;

        const tipos = Array.from(new Set(data.map((product) => product.tipo)));
        setTiposUnicos(tipos);
      } catch (error) {
        console.error("Error fetching product types:", error);
      }
    };

    fetchTipos();
  }, []);

  return (
    <Hidden lgDown>
      <Box
        sx={{
          mt: "1rem",
          width: "15%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: 0,
          left: 0,
          zIndex: 1,
          paddingTop: "1rem",
        }}
      >
        <List
          sx={{
            width: "100%",
            bgcolor: "white",
            borderRadius: "0 .5rem .5rem 0",
          }}
        >
          <ListItem>
            <ListItemButton onClick={() => handleTypeSelection(null)}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  color: "red",
                }}
              >
                Inicio
              </Typography>
            </ListItemButton>
          </ListItem>
          <Typography variant="h6" fontSize={'1rem'} textAlign={'center'}>
            Presiona en el articulo que buscas para filtrarlo :D
          </Typography>
          {tiposUnicos.map((tipo, index) => (
            <ListItem
              key={index}
              onClick={() => handleTypeSelection(tipo)}
              sx={{ borderBottom: "1px solid gray" }}
            >
              <ListItemButton sx={{bgcolor:'#ECF0F1 ',borderRadius:'.5rem'}}>
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    textTransform: "capitalize",
                    fontWeight:'bold'
                  }}
                >
                  {tipo}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Hidden>
  );
};

export default Aside;
