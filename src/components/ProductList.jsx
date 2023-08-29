/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartList, productsList } from "../reducers/ProductsSlice";

const ProductList = () => {
  let dispatch = useDispatch();
  let allProducts = useSelector((state) => state.products.products);
  const [addToCart, setAddToCart] = useState([]);
  const [products, setProducts] = useState([]);

  function addToCartHandler(param) {
    setAddToCart((prevAddToCart) => {
      const updatedCart = [...prevAddToCart];
      const isExistIndex = updatedCart.findIndex(
        (product) => product.id === param.id
      );

      if (isExistIndex !== -1) {
        updatedCart[isExistIndex] = {
          ...updatedCart[isExistIndex],
          count: updatedCart[isExistIndex].count + 1,
        };
      } else {
        updatedCart.push({ ...param, count: 1 });
      }

      dispatch(addToCartList(updatedCart));
      return updatedCart;
    });
  }

  useEffect(() => {
    return () => {
      dispatch(productsList());
    };
  }, []);

  useEffect(() => {
    if (allProducts && allProducts.length) {
      setProducts(allProducts);
    }
  }, [allProducts]);
  return (
    <Grid container spacing={3}>
      {products &&
        products.map((product) => {
          return (
            <Grid key={`product_` + product.id} item xs={4}>
              <Card sx={{ maxWidth: "100%" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.image}
                  title={product.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title} ({"$" + product.price})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ProductList;
