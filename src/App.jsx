import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detalle from "./components/Detalle";
import Envios from "./components/Envios";
import Add from "./pages/Add";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./Contexts/CartContext.jsx"; // Importa el CartProvider
import { AuthProvider } from "./Contexts/AuthContext.jsx"; // Importa el AuthProvider
import { supabase } from "./supabaseClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "@mui/material";
import theme from './theme/theme.js'
import Preloader from './components/Preloader.jsx'; // Importa el Preloader

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          {loading && <Preloader loading={loading} />}
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path="/"
                element={<Home products={products} loading={loading} />}
              />
              <Route
                path="/detalle/:codigo"
                element={<Detalle products={products} loading={loading} />}
              />
              <Route path="/envios" element={<Envios />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add" element={<ProtectedRoute element={<Add />} />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
