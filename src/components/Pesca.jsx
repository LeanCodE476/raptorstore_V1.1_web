import { Button, Container, Grid, Typography } from '@mui/material';
import CardProductos from './CardProductos';
import { useState, useEffect } from 'react';
import data from '../productos.json';
import PhishingIcon from '@mui/icons-material/Phishing';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {  useNavigate } from 'react-router-dom';
const Pesca = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosPesca = data.productos.pesca;
        setProductos(productosPesca);
        setProductosFiltrados(productosPesca);
      } catch (error) {
        console.error('Error al cargar los productos', error);
      }
    };

    fetchData();
  }, []);

  const handleTipoFiltro = (tipo) => {
    if (tipo === tipoFiltro) {
      setTipoFiltro(null); // Deseleccionar el filtro actual
      setProductosFiltrados(productos); // Mostrar todos los productos
    } else {
      const productosFiltradosPorTipo = productos.filter((producto) => producto.tipo === tipo);
      setTipoFiltro(tipo);
      setProductosFiltrados(productosFiltradosPorTipo);
    }
  };

  const mostrarTodos = () => {
    setTipoFiltro(null);
    setProductosFiltrados(productos);
  };
const navigate = useNavigate();
  return (
    <>
    <Button sx={{m:" 5rem 0 0 1rem",bgcolor: 'black', color: 'white' }} onClick={() => navigate("/")}>< ArrowBackIcon/>Volver </Button>
      <Typography variant='h4' sx={{ textAlign: 'center', mt: '1rem', bgcolor: 'white', fontWeight: '600' }} >
        Pesca <PhishingIcon sx={{ fontSize: '2rem' }} />
      </Typography>

      <div style={{ display: 'flex', justifyContent: "space-around", margin: '2rem auto', minWidth: '23rem', maxWidth: '30rem', flexWrap: 'wrap', gap: '1rem' }}>
        <Button sx={{ bgcolor: 'black', color: 'white' }} onClick={mostrarTodos}>
          Mostrar Todo
        </Button>

        {Array.from(new Set(productos.map((producto) => producto.tipo))).map((tipo, index) => (
          <Button
            key={index}
            sx={{ bgcolor: 'black', color: 'white' }}
            onClick={() => handleTipoFiltro(tipo)}
          >
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </Button>
        ))}
      </div>

      <Container sx={{ mt: "3rem" }}>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {productosFiltrados.map((product, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              lg={2}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              key={index}
            >
          
              <CardProductos
                product={product}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Pesca;
