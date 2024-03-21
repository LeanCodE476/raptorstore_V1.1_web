import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Detalle = ({ products }) => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);
  const [markedIndex, setMarkedIndex] = React.useState(0);

  let product = null;

  for (const categoryKey in products.productos) {
    if (Object.prototype.hasOwnProperty.call(products.productos, categoryKey)) {
      const category = products.productos[categoryKey];
      const currentProduct = category.find(item => item.codigo === codigo);
      if (currentProduct) {
        product = currentProduct;
        break;
      }
    }
  }

  const changeIndex = newIndex => {
    setIndex(newIndex);
  };

  const markImage = newIndex => {
    setMarkedIndex(newIndex);
    setIndex(newIndex);
  };

  const formattedPrice = product ? product.precio.toFixed(3) : '';

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const sendMessage = () => {
    const message = `Hola!, quiero este producto:\n\nCódigo: ${product.codigo}\nNombre: ${product.nombre}\nPrecio:$ ${formattedPrice}`;
    const phoneNumber = '3755503038'; // Número de teléfono de WhatsApp al que deseas enviar el mensaje
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL);
  };
  return (
    <Container sx={{ mt: '2rem' }}>
      <Button
        sx={{
          m: ' 0rem 0 0 1rem',
          color: 'white',
          outline: '1px solid white',
          '&:hover': {
            transition: '0s all',
            backgroundColor: 'black',
          },
        }}
        onClick={() => navigate('/')}
      >
        <ArrowBackIcon />
        Volver
      </Button>
      <Box
        sx={{
          m: '1rem auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '1rem',
          marginBottom: '1rem',
          width: '100%',
          maxWidth: '40rem',
          bgcolor: 'white',
          borderRadius: '.5rem',
          borderTop: '2px solid #ff0000',
          borderBottom: '2px solid #ff0000',
        }}
      >
        <Typography variant="h6">{product.nombre}</Typography>
        <Box sx={{ display: 'flex', width: '90%', alignItems: 'center' }}>
          <Typography
            variant="h5"
            fontWeight={'bold'}
            color={'#ff0000'}
            width={'90%'}
            mt={'1rem'}
          >
            ${formattedPrice}
          </Typography>
          <Typography variant="p" color={'gray'} marginTop={' 1rem'}>
            Cod:{product.codigo}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: '1rem',
            minHeight: '5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={`../src/images/${product.imagenes[index]}`}
            style={{
              minWidth: '22rem',
              maxWidth: '90%',
              boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.5)',
              borderRadius: '.5rem ',
            }}
            alt={product.nombre}
          />
          <Box
            sx={{
              width: '18rem',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
            }}
          >
            {product.imagenes.map((img, i) => (
              <img
                className="imagen-miniatura"
                src={`../src/images/${img}`}
                key={i}
                style={{
                  width: '5rem',
                  cursor: 'pointer',
                  borderRadius: '.5rem',
                  outline: i === markedIndex ? '3px solid #ff0000' : '2px solid gray',
                }}
                onClick={() => {
                  changeIndex(i);
                  markImage(i);
                }}
                onMouseOver={() => markImage(i)}
                alt={product.nombre}
              />
            ))}
          </Box>
        </Box>

        <Typography
          variant="h5"
          width={'90%'}
          mt={'1rem'}
          textAlign={'center'}
          fontWeight={'bold'}
        >
          Caracteristicas
        </Typography>
        <Box sx={{ width: '90%' }}>
          <ul
            style={{
              listStyle: 'none',
              marginTop: '1rem',
              fontSize: '1.1rem',
              fontWeight: '500',
            }}
          >
            {product.descripcion.map((desc, i) => (
              <li key={i} style={{ marginTop: '.5rem' }}>
                -{desc}
              </li>
            ))}
          </ul>
        </Box>
        <Button
          sx={{
            bgcolor: '#F1C40F',
            color: 'black',
            width: '15rem',
            outline: '2px solid black',
            mt: '3rem',
            borderRadius: '1rem',
            textTransform: 'capitalize',
            fontSize: '1rem',
            '&:hover': {
              transition: '0s all',
              backgroundColor: 'green',
              color: 'white',
            },
          }}
          onClick={sendMessage}
        >
          Comprar Ahora <WhatsAppIcon sx={{ marginLeft: '1rem' }} />
        </Button>
      </Box>
    </Container>
  );
};

export default Detalle;
