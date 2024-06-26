import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  IconButton
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import CardProductos from "./CardProductos";
import Navbar from "./navbar/Navbar";
import FormaPago from "./FormaPago";
import { useNavigate, useLocation } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import Aside from "./Aside"; // Importa el nuevo componente Aside
import { createTheme } from "@mui/material/styles";
import { supabase } from "../supabaseClient"; // Importa supabaseClient si no está ya importado

const theme = createTheme();

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(location.state?.selectedType || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceOrderChange = (event) => {
    setPriceOrder(event.target.value);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const filteredProducts = selectedType
    ? products.filter(
        (product) =>
          product.tipo === selectedType &&
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products.filter((product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const sortedProducts = priceOrder === "random"
    ? shuffleArray(filteredProducts)
    : [...filteredProducts].sort((a, b) => {
        if (priceOrder === "asc") {
          return a.precio - b.precio;
        } else if (priceOrder === "desc") {
          return b.precio - a.precio;
        } else {
          const stockOrder = {
            "nuevo ingreso": 1,
            "stock disponible": 2,
            agotado: 3,
          };
          if (stockOrder[a.stock] < stockOrder[b.stock]) return -1;
          if (stockOrder[a.stock] > stockOrder[b.stock]) return 1;
          return new Date(b.created_at) - new Date(a.created_at);
        }
      });

  const justifyContentValue = selectedType ? "space-between" : "center";

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (

    <Box display="flex" minHeight="100vh" borderBottom="2px solid transparent">
      {isLargeScreen && <Aside handleTypeSelection={handleTypeSelection} selectedType={selectedType} />}
      <Box flex={1} width={"100%"}>
        <Navbar handleTypeSelection={handleTypeSelection} />
        <FormaPago />

        <Typography
          sx={{ color: "yellow", textAlign: "center", fontWeight: "bold" }}
        >
          Como son los envios?{" "}
          <Button
            sx={{
              textTransform: "capitalize",
              color: "red",
              borderBottom: "1px solid yellow",
            }}
            onClick={() => navigate("/Envios")}
          >
            Click Aca
          </Button>
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" m="1rem auto">
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              width: "95%",
              maxWidth: "40rem",
              backgroundColor: "white",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />
        </Box>

        <Box m="1.5rem auto" maxWidth="80rem" overflow="hidden" pb={'2rem'} >
          <Box
            display="flex"
            justifyContent={justifyContentValue}
            width="90%"
            height="2rem"
            m="1rem auto"
          >
            <Typography
              color={"white"}
              variant="h6"
              fontSize={"1.2rem"}
              width={"100%"}
              fontWeight={"bold"}
            >
              Sección{" "}
              <span style={{ textTransform: "capitalize" }}>
                {selectedType ? selectedType : "Principal"}
              </span>{" "}
            </Typography>
            {selectedType ? (
              <Button
                sx={{
                  m: "0rem 0 0 1rem",
                  color: "white",
                  outline: "1px solid white",
                  width: "10rem",
                  fontSize: ".7rem",
                  "&:hover": {
                    transition: "0s all",
                    backgroundColor: "black", 
                  },
                }}
                onClick={() => handleTypeSelection(null)}
              >
                Ver Todo
                <FilterAltIcon />
              </Button>
            ) : null}
          </Box>
          <Box sx={{mt:'2rem', display: "inline-block", pt: '1rem', bgcolor: 'white', borderRadius: '.5rem', width: '10rem',ml:'.5rem' }}>
            <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1, width: '100%' }}>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={priceOrder}
                onChange={handlePriceOrderChange}
                label="Ordenar por"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
              >
                <MenuItem value="asc">Precio: Menor a Mayor</MenuItem>
                <MenuItem value="desc">Precio: Mayor a Menor</MenuItem>
                <MenuItem value="random">Aleatorio</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Typography color="white" textAlign="center">
              Cargando productos...
            </Typography>
          ) : (
            <Grid
              container
              rowSpacing={3}
              columnSpacing={0}
              marginTop={"auto"}
            >
              {sortedProducts.map((product, index) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={3}
                  sx={{ display: "flex", justifyContent: "center" }}
                  key={index}
                >
                  <CardProductos product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          {showScrollButton && (
            <IconButton
              sx={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                bgcolor: "white",
                color: "red",
                zIndex: "9",
                "&:hover": {
                  bgcolor: "black",
                },
              }}
              onClick={handleScrollToTop}
            >
              <ArrowUpwardIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
