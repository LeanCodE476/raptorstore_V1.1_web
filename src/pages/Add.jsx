import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ClipLoader } from "react-spinners";

const Add = () => {
  const [isView, setIsView] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para el spinner
  const [loadingImage, setLoadingImage] = useState(false); // Estado para el spinner de imagen
  const [codigo, setCodigo] = useState("");
  const [marca, setMarca] = useState("");
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState([""]);
  const [stock, setStock] = useState("");
  const [envioGratis, setEnvioGratis] = useState("");
  const [precio, setPrecio] = useState(0);
  const [editing, setEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true); // Inicia el spinner
    try {
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;

      console.log("Fetched Products:", data);
      setProducts(data || []);
    } catch (error) {
      console.log("Get Products Error:", error.message);
    } finally {
      setLoading(false); // Detiene el spinner
    }
  };

  const uploadImage = async (image, imageName) => {
    try {
      const { data, error } = await supabase.storage
        .from("product-images")
        .upload(imageName, image);

      if (error) {
        console.error("Error uploading image:", error);
        throw error;
      }

      console.log("Image uploaded:", data);
      return null;
    } catch (error) {
      console.error("Upload Error:", error.message);
      return null;
    }
  };

  const getImage = async (imageName) => {
    try {
      const { data, error } = await supabase.storage
        .from("product-images")
        .getPublicUrl(imageName);

      if (error) {
        console.error("Error getting public URL:", error);
        throw error;
      }

      console.log("Public URL:", data);
      return data.publicUrl;
    } catch (error) {
      console.error("Upload Error:", error.message);
      return null;
    }
  };

  const createProduct = async () => {
    setLoadingImage(true); // Inicia el spinner de imagen
    try {
      let imagen1_url = "";
      let imagen2_url = "";
      let imagen3_url = "";
      const date = Date.now();
      if (image1) {
        console.log("Uploading image1...");
        await uploadImage(image1, `image1-${date}.webp`);
        imagen1_url = await getImage(`image1-${date}.webp`);
        console.log("Image1 URL:", imagen1_url);
      }

      if (image2) {
        console.log("Uploading image2...");
        await uploadImage(image2, `image2-${date}.webp`);
        imagen2_url = await getImage(`image2-${date}.webp`);
        console.log("Image2 URL:", imagen2_url);
      }

      if (image3) {
        console.log("Uploading image3...");
        await uploadImage(image3, `image3-${date}.webp`);
        imagen3_url = await getImage(`image3-${date}.webp`);
        console.log("Image3 URL:", imagen3_url);
      }

      console.log("Image URLs:", { imagen1_url, imagen2_url, imagen3_url });

      const { data, error } = await supabase
        .from("products")
        .insert({
          codigo,
          marca,
          tipo,
          nombre,
          descripcion,
          stock,
          enviogratis: envioGratis,
          precio,
          imagen1_url,
          imagen2_url,
          imagen3_url,
        })
        .single();

      if (error) throw error;
      console.log("Inserted Product:", data);
      setProducts([...products, data]);
      setIsView(false);
      clearForm();
      window.location.reload(); // Recargar la página
    } catch (error) {
      console.log("Create Product Error:", error.message);
    } finally {
      setLoadingImage(false); // Detiene el spinner de imagen
    }
  };

  const updateProduct = async () => {
    setLoadingImage(true); // Inicia el spinner de imagen
    try {
      let newImage1Url = image1Url;
      let newImage2Url = image2Url;
      let newImage3Url = image3Url;
      const date = Date.now()
      if (image1) {
        await uploadImage(image1, `image1-${date}.webp`);
        newImage1Url = await getImage(`image1-${date}.webp`);
      }
      if (image2) {
        await uploadImage(image2, `image2-${date}.webp`);
        newImage2Url = await getImage(`image2-${date}.webp`);
      }
      if (image3) {
        await uploadImage(image3, `image3-${date}.webp`);
        newImage3Url = await getImage(`image3-${date}.webp`);
      }

      const { data, error } = await supabase
        .from("products")
        .update({
          codigo,
          marca,
          tipo,
          nombre,
          descripcion,
          stock,
          enviogratis: envioGratis,
          precio,
          imagen1_url: newImage1Url || image1Url,
          imagen2_url: newImage2Url || image2Url,
          imagen3_url: newImage3Url || image3Url,
        })
        .eq("id", selectedProduct.id)
        .select();

      if (error) throw error;
      console.log("Updated Product:", data);

      if (data) {
        setProducts(
          products.map((product) => (product.id === data.id ? data : product))
        );
        console.log("Soy el console despues de actualizar");
        setIsView(false);
        clearForm();
        window.location.reload(); // Recargar la página
      } else {
        console.log("Update Product Error: Data is null");
      }
    } catch (error) {
      console.log("Update Product Error:", error.message);
    } finally {
      setLoadingImage(false); // Detiene el spinner de imagen
    }
  };

  const deleteProduct = async (id) => {
    try {
      const product = products.find((product) => product.id === id);
      if (product) {
        const { imagen1_url, imagen2_url, imagen3_url } = product;

        const deleteImage = async (url) => {
          if (url) {
            // Extraer la parte relativa de la URL
            const regex = /product-images\/.*/;
            const match = url.match(regex);
            if (match) {
              const urlImage = match[0];
              console.log('Original URL:', url);
              console.log('Processed URL for deletion:', urlImage);

              const { data, error } = await supabase
                .storage
                .from('product-images')
                .remove([urlImage]);

              console.log('Deletion response:', data, error);

              if (error) {
                console.error("Error deleting image:", error);
                throw error;
              }

              console.log("Image deleted successfully:", data);
            } else {
              console.error("No match for regex in URL:", url);
            }
          }
        };

        await Promise.all([
          deleteImage(imagen1_url),
          deleteImage(imagen2_url),
          deleteImage(imagen3_url)
        ]);
      }

      const { error } = await supabase.from("products").delete().match({ id });

      if (error) throw error;

      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setCodigo(product.codigo);
    setMarca(product.marca);
    setTipo(product.tipo.trim());
    setNombre(product.nombre);
    setDescripcion(
      Array.isArray(product.descripcion)
        ? product.descripcion
        : JSON.parse(product.descripcion)
    );
    setStock(product.stock);
    setEnvioGratis(product.enviogratis);
    setPrecio(product.precio);
    setImage1Url(product.imagen1_url);
    setImage2Url(product.imagen2_url);
    setImage3Url(product.imagen3_url);
    setEditing(true);
    setIsView(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setConfirmOpen(true);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = Array.isArray(descripcion)
      ? [...descripcion]
      : [""];
    updatedDescriptions[index] = value;
    setDescripcion(updatedDescriptions);
  };

  const handleAddDescription = () => {
    setDescripcion(Array.isArray(descripcion) ? [...descripcion, ""] : [""]);
  };

  const handleRemoveDescription = (index) => {
    const updatedDescriptions = Array.isArray(descripcion)
      ? [...descripcion]
      : [""];
    updatedDescriptions.splice(index, 1);
    setDescripcion(updatedDescriptions);
  };

  const handleFormSubmit = async () => {
    if (editing) {
      await updateProduct();
    } else {
      await createProduct();
    }
  };

  const handleImageChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    setter(file);
    previewSetter(URL.createObjectURL(file));
  };

  const handleRemoveImage = (setter, previewSetter) => () => {
    setter(null);
    previewSetter("");
  };

  const clearForm = () => {
    setSelectedProduct(null);
    setCodigo("");
    setMarca("");
    setTipo("");
    setNombre("");
    setDescripcion([""]);
    setStock("");
    setEnvioGratis("");
    setPrecio(0);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage1Url("");
    setImage2Url("");
    setImage3Url("");
    setEditing(false);
  };

  const handleClose = () => {
    clearForm();
    setIsView(false);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          onClick={() => handleClose()}
        >
          Cerrar
          <CancelIcon />
        </Button>
      )}
      <Dialog open={isView} onClose={handleClose} maxWidth="md" fullWidth>
        <Button
          onClick={handleClose}
          sx={{ bgcolor: "black", color: "white", width: "3rem", margin: "1rem" }}
        >
          Cerrar
        </Button>
        <DialogTitle sx={{ textAlign: "center", fontSize: "1.7rem", fontStyle: "italic" }}>
          {editing ? "Actualizar Producto" : "Agregar Producto"}
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".7rem",
              bgcolor: "white",
              p: "1rem",
              width: "100%",
            }}
          >
            <TextField
              label="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
            />
            <TextField
              label="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
            <TextField
              label="Tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            />
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <Typography color={'red'} variant="h6">Agrega o elimina una Descripcion</Typography>
            {descripcion.map((desc, index) => (
              <Box key={index} display="flex" alignItems="center">
                <TextField
                  label="Descripción"
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  sx={{ width: '80%' }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemoveDescription(index)}
                  startIcon={<CancelIcon />}
                >
                </Button>
              </Box>
            ))}
            <Button
              onClick={handleAddDescription}
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "blue",
                color: "white",
                textTransform: "capitalize",
                mt: "1rem",
                "&:hover": {
                  backgroundColor: "green",
                  color: "black",
                },
              }}
            >
              Agregar Descripción
            </Button>
            <FormControl fullWidth>
              <InputLabel id="stock-label">Stock</InputLabel>
              <Select
                labelId="stock-label"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                label="Stock"
              >
              <MenuItem value="nuevo ingreso">nuevo ingreso</MenuItem>
                <MenuItem value="stock disponible">stock disponible</MenuItem>
                <MenuItem value="agotado">agotado</MenuItem>
                <MenuItem value="proximamente">próximamente</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Envio Gratis"
              value={envioGratis}
              onChange={(e) => setEnvioGratis(e.target.value)}
            />
            <TextField
              label="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            <Box>
              <input
                type="file"
                accept=".webp"
                onChange={handleImageChange(setImage1, setImage1Url)}
              />
              {image1Url && (
                <Box>
                  <img src={image1Url} alt="Imagen 1" width={50} />
                  <Button onClick={handleRemoveImage(setImage1, setImage1Url)}>
                    Eliminar Imagen 1
                  </Button>
                </Box>
              )}
            </Box>
            <Box>
              <input
                type="file"
                accept=".webp"
                onChange={handleImageChange(setImage2, setImage2Url)}
              />
              {image2Url && (
                <Box>
                  <img src={image2Url} alt="Imagen 2" width={50} />
                  <Button onClick={handleRemoveImage(setImage2, setImage2Url)}>
                    Eliminar Imagen 2
                  </Button>
                </Box>
              )}
            </Box>
            <Box>
              <input
                type="file"
                accept=".webp"
                onChange={handleImageChange(setImage3, setImage3Url)}
              />
              {image3Url && (
                <Box>
                  <img src={image3Url} alt="Imagen 3" width={50} />
                  <Button onClick={handleRemoveImage(setImage3, setImage3Url)}>
                    Eliminar Imagen 3
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormSubmit} sx={{ outline: '1px solid black', color: 'white', bgcolor: 'green', m: '.5rem auto' }}>
            {loadingImage ? (
              <ClipLoader color="white" size={20} />
            ) : (
              editing ? "Actualizar Producto" : "Agregar Producto"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" mt={"1rem"} >
        Listado de Productos
      </Typography>
      <TextField
        label="Buscar producto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ width: "90%", mt: "1rem" }}
      />
      {loading ? ( // Mostrar spinner mientras se cargan los productos
        <ClipLoader color="black" size={70} />
      ) : (
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".3rem",
            mt: "1rem",
            width: "90%",
          }}
        >
          {filteredProducts.length < 1 && (
            <Typography variant="h6" color={"red"} textAlign={"center"}>
              No hay productos para mostrar :/
            </Typography>
          )}
          {filteredProducts.map(
            (product) =>
              product && ( // Añadir verificación de null
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    bgcolor: "white",
                    boxShadow: "1px 1px 3px gray",
                    borderRadius: ".4rem",
                    p: ".5rem",
                    mt: "1rem",
                  }}
                >
                  <Box>
                    <Typography fontWeight={"bold"}>
                      Codigo: {product.codigo}
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      Nombre: {product.nombre}
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      Marca: {product.marca}
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      Tipo: {product.tipo}
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      Precio: {product.precio}
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      Stock: {product.stock}
                    </Typography>
                    <Box>
                      <Typography variant="h6">Descripcion:</Typography>
                      <ul>
                        {Array.isArray(product.descripcion)
                          ? product.descripcion.map((desc, index) => (
                              <li key={index} style={{ listStyle: "none" }}>
                                -{desc}
                              </li>
                            ))
                          : JSON.parse(product.descripcion).map(
                              (desc, index) => (
                                <li key={index} style={{ listStyle: "none" }}>
                                  -{desc}
                                </li>
                              )
                            )}
                      </ul>
                    </Box>
                    <Box display="flex" gap=".5rem" mt={"1rem"}>
                      {product.imagen1_url && (
                        <img
                          src={product.imagen1_url}
                          alt="Imagen 1"
                          width={90}
                        />
                      )}
                      {product.imagen2_url && (
                        <img
                          src={product.imagen2_url}
                          alt="Imagen 2"
                          width={90}
                        />
                      )}
                      {product.imagen3_url && (
                        <img
                          src={product.imagen3_url}
                          alt="Imagen 3"
                          width={90}
                        />
                      )}
                    </Box>
                    <Box sx={{ mt: "1rem" }}>
                      <Button
                        onClick={() => handleEditClick(product)}
                        sx={{
                          bgcolor: "yellow",
                          color: "black",
                          textTransform: "capitalize",
                          "&:hover": {
                            backgroundColor: "green",
                            color: "black",
                          },
                        }}
                      >
                        Editar
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(product)}
                        sx={{
                          bgcolor: "red",
                          color: "white",
                          textTransform: "capitalize",
                          ml: "1rem",
                          "&:hover": {
                            backgroundColor: "green",
                            color: "black",
                          },
                        }}
                      >
                        Eliminar
                        <DeleteIcon />
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )
          )}
        </List>
      )}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar eliminación"}</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={async () => {
              await deleteProduct(productToDelete.id);
              setConfirmOpen(false);
            }}
            color="secondary"
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Add;
