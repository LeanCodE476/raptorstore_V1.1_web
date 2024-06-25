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

     <Typography variant="h4" textAlign={'center'} color={'white'} mt={'2rem'}>Actualizando precios vuelve mas tarde...</Typography>
    </Box>
  );
};

export default Home;
