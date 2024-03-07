// import { Button, Container, Grid } from "@mui/material";
// import CardProductos from "./CardProductos";
// import productosData from "../productos.json";
// import { useEffect, useState } from "react";

// const GridProductos = () => {
//   const { pesca, electronica } = productosData.productos;
//   const allProducts = [...pesca, ...electronica];
//   const [category, setCategory] = useState("all");
//   const [subCategory, setSubCategory] = useState(null);
//   const [view, setView] = useState("home");
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     let filtered;

//     if (view === "home") {
//       filtered = category === "all" ? allProducts : allProducts.filter((product) => product.tipo === category);
//     } else if (view === "pesca") {
//       filtered = subCategory ? pesca.filter((product) => product.tipo === subCategory) : pesca;
//     }

//     setFilteredProducts(filtered.sort(() => Math.random() - 0.5));
//   }, [category, view, subCategory]);

//   const getStockCount = (category) => {
//     if (category === "all") return allProducts.length;
//     return allProducts.filter((product) => product.tipo === category).length;
//   };

//   const handleBackButtonClick = () => {
//     if (view === "pesca") {
//       setView("home");
//       setSubCategory(null);
//     }
//   };

//   const handleCategoryButtonClick = (category) => {
//     setCategory(category);
//     setView("home");
//   };

//   const handleSubCategoryButtonClick = (subCategory) => {
//     setView("pesca");
//     setSubCategory(subCategory);
//   };

//   return (
//     <>
//       {view === "home" && (
//         <div>
//           <Button variant="outlined" onClick={() => handleCategoryButtonClick("all")}>
//             Todos
//           </Button>
//           <Button variant="outlined" onClick={() => handleCategoryButtonClick("pesca")}>
//             Pesca ({getStockCount("pesca")})
//           </Button>
//           <Button variant="outlined" onClick={() => handleCategoryButtonClick("electronica")}>
//             Electrónica ({getStockCount("electronica")})
//           </Button>
//         </div>
//       )}

//       {view === "pesca" && (
//         <div>
//           <Button variant="outlined" onClick={() => handleBackButtonClick()}>
//             Volver
//           </Button>
//           <Button variant="outlined" onClick={() => handleSubCategoryButtonClick("senuelos")}>
//             Señuelos ({getStockCount("senuelos")})
//           </Button>
//           <Button variant="outlined" onClick={() => handleSubCategoryButtonClick("canas")}>
//             Cañas ({getStockCount("canas")})
//           </Button>
//           {/** Agrega más botones según las subcategorías de pesca */}
//         </div>
//       )}

//       <Container sx={{ mt: "4rem" }}>
//         <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           {filteredProducts.map((product, index) => (
//             <Grid item xs={6} sm={4} lg={2} sx={{ display: "flex", justifyContent: "center" }} key={index}>
//               <CardProductos
//                 url={product.imagenes[0]}
//                 price={product.precio}
//                 stock={product.stock}
//                 name={product.nombre}
//                 codigo={product.codigo}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default GridProductos;
