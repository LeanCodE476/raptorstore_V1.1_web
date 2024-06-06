import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  Pagination,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CardProductos from "./CardProductos";
import Navbar from "./navbar/Navbar";
import FormaPago from "./FormaPago";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import Aside from "./Aside"; // Importa el nuevo componente Aside
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { supabase } from "../supabaseClient"; // Importa supabaseClient si no está ya importado

const theme = createTheme();

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceOrder, setPriceOrder] = useState("");
  const productsPerPage = 15;

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
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page number when search changes
  };

  const handlePriceOrderChange = (event) => {
    setPriceOrder(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type === selectedType ? null : type);
    setCurrentPage(1); // Reset page number when filter changes
  };

  const justifyContentValue = selectedType ? "space-between" : "center";

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box display="flex" minHeight="100vh" borderBottom="2px solid transparent">
      {isLargeScreen && <Aside handleTypeSelection={handleTypeSelection} />}
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

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          m="1rem auto"
         
        >
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
              maxWidth:'40rem',
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

        <Box m="1.5rem auto" maxWidth="80rem" overflow="hidden">
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
          <Box
            sx={{
              p: "1rem 0 0 0",
              bgcolor: "white",
              display: "inline-block",
              borderRadius: ".5rem",
            }}
          >
            {" "}
            <FormControl
              variant="outlined"
              sx={{ ml: 2, minWidth: 120, width: "10rem" }}
            >
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={priceOrder}
                onChange={handlePriceOrderChange}
                label="Ordenar por"
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                <MenuItem value="asc">Precio: Menor a Mayor</MenuItem>
                <MenuItem value="desc">Precio: Mayor a Menor</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Typography color="white" textAlign="center">
              Cargando productos...
            </Typography>
          ) : (
            <>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={0}
                marginTop={"auto"}
              >
                {currentProducts.map((product, index) => (
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
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={Math.ceil(sortedProducts.length / productsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                  sx={{
                    bgcolor: "white",
                    padding: "1rem .5rem 1rem .5rem",
                    borderRadius: ".5rem",
                  }}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
