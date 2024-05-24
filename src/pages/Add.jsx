import {
  Box,
  Button,
  Divider,
  List,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CancelIcon from "@mui/icons-material/Cancel";
import productos from "../productos.json";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { supabase } from "../supabaseClient";

const Add = () => {
  const navigate = useNavigate();
  const [isView, setIsView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState("");
  const [envioGratis, setEnvioGratis] = useState("");
  const [precio, setPrecio] = useState(0);
  const [editing, setEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (productos.productos && productos.productos.pesca) {
      const filtered = productos.productos.pesca.filter(
        (producto) =>
          (producto.nombre &&
            producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (producto.marca &&
            producto.marca.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(10);
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          codigo: codigo,
          marca: marca,
          tipo: tipo,
          nombre: nombre,
          descripcion: descripcion,
          stock: stock,
          enviogratis: envioGratis,
          precio: precio,
        })
        .single();

      if (error) throw error;

      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({
          codigo: codigo,
          marca: marca,
          tipo: tipo,
          nombre: nombre,
          descripcion: descripcion,
          stock: stock,
          enviogratis: envioGratis,
          precio: precio,
        })
        .eq('id', selectedProduct.id);

      if (error) throw error;

      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setCodigo(product.codigo);
    setMarca(product.marca);
    setTipo(product.tipo);
    setNombre(product.nombre);
    setDescripcion(product.descripcion);
    setStock(product.stock);
    setEnvioGratis(product.enviogratis);
    setPrecio(product.precio);
    setEditing(true);
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .match({ id: id });

      if (error) throw error;

      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        m: "1rem auto",
        minHeight: "50rem",
        bgcolor: "#F0F3F4 ",
        maxWidth: "50rem",
        width: "90%",
        borderRadius: ".5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: "2rem",
      }}
    >
      <Typography variant="h6" mt={"2rem"} fontStyle={"italic"}>
        Edita y agrega tus productos!
      </Typography>
      {!isView ? (
        <Button
          sx={{
            bgcolor: "green",
            color: "white",
            textTransform: "capitalize",
            mt: "1rem",
            "&:hover": {
              backgroundColor: "green",
              color: "black",
            },
          }}
          onClick={() => setIsView(true)}
        >
          Cargar productos
          <AddBusinessIcon />
        </Button>
      ) : (
        <Button
          sx={{
            bgcolor: "black",
            color: "white",
            textTransform: "capitalize",
            mt: "1rem",
            "&:hover": {
              backgroundColor: "red",
              color: "black",
            },
          }}
          onClick={() => setIsView(false)}
        >
          Cancelar <CancelIcon />
        </Button>
      )}

      {isView ? (
        <form
          action=""
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Ingresa el codigo del producto"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa la marca del producto"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa el tipo de articulo (reel, multifilamento, tanza, etc...)"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa el nombre del producto"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa la descripcion del producto"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa el stock del producto (stock disponible - agotado - proximamente)"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa si cuenta con envio gratis (si - no)"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={envioGratis}
            onChange={(e) => setEnvioGratis(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Ingresa el precio del producto"
            variant="outlined"
            sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <Button
            sx={{
              bgcolor: "green",
              color: "white",
              mt: "2rem",
              textTransform: "capitalize",
            }}
            onClick={() => (selectedProduct ? updateProduct() : createProduct())}
          >
            {selectedProduct ? "Guardar Cambios :D" : "Agregar este producto"}
            <AddIcon />
          </Button>
        </form>
      ) : null}

      <Box
        sx={{
          mt: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          height: "9rem",
          width: "90%",
        }}
      >
        <Typography variant="h6" textAlign={'center'}>
          Coloca el nombre del producto para encontrarlo más rápido!
        </Typography>
        <TextField
          id="outlined-basic"
          label="coloca el nombre del producto"
          variant="outlined"
          sx={{ maxWidth: "30rem", width: "90%" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box sx={{ width: "90%", minHeight: "30rem" }}>
        {products.map((product) => (
          <List
            sx={{
              width: "100%",
              minHeight: "20rem",
              outline: "2px solid blue",
              mt: "1rem",
              textAlign: "center",
              borderRadius: ".5rem",
            }}
            key={product.id}
          >
            {editing && selectedProduct?.id === product.id ? (
              <>
                <Button
                  sx={{
                    bgcolor: "black",
                    color: "white",
                    textTransform: "capitalize",
                    mt: "1rem",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "black",
                    },
                  }}
                  onClick={() => {
                    setEditing(false);
                    setSelectedProduct(null);
                    setCodigo("");
                    setMarca("");
                    setTipo("");
                    setNombre("");
                    setDescripcion("");
                    setStock("");
                    setEnvioGratis("");
                    setPrecio(0);
                  }}
                >
                  Cancelar <CancelIcon />
                </Button>
                <Typography variant="h6" mt={".5rem"}>
                  Edición del producto
                </Typography>

                <form
                  action=""
                  style={{
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Ingresa el codigo del producto"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa la marca del producto"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa el tipo de articulo (reel, multifilamento, tanza, etc...)"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa el nombre del producto"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa la descripcion del producto"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa el stock del producto (stock disponible - agotado - próximamente)"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa si cuenta con envío gratis (si - no)"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={envioGratis}
                    onChange={(e) => setEnvioGratis(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Ingresa el precio del producto"
                    variant="outlined"
                    sx={{ width: "90%", maxWidth: "35rem", mt: "1rem" }}
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                  <Button
                    sx={{
                      bgcolor: "green",
                      color: "white",
                      mt: "2rem",
                      textTransform: "capitalize",
                    }}
                    onClick={() => updateProduct()}
                  >
                    Guardar Cambios :D
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography>Nombre: {product.codigo}</Typography>
                <Typography>Nombre: {product.nombre}</Typography>
                <Typography>Precio: {product.precio}</Typography>
                <Typography>Marca: {product.marca}</Typography>
                <Typography>Stock: {product.stock}</Typography>
                <Typography>Descripcion: {product.descripcion}</Typography>
                <Typography>Envio gratis: {product.enviogratis}</Typography>
                <Box
                  sx={{
                    m: "2rem auto",
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    sx={{
                      bgcolor: "red",
                      color: "white",
                      textTransform: "capitalize",
                    }}
                    onClick={()=>deleteProduct(product.id)}
                  >
                    Eliminar Producto <DeleteIcon />
                  </Button>
                  <Button
                    sx={{
                      bgcolor: "green",
                      color: "white",
                      ml: "1rem",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleEditClick(product)}
                  >
                    Editar
                    <EditIcon />
                  </Button>
                </Box>
              </>
            )}
          </List>
        ))}
      </Box>
    </Box>
  );
};

export default Add;
