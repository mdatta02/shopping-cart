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
import { removeFromCart } from "../reducers/ProductsSlice";

const AddToCartList = () => {
  let dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);
  let addToCartProductList = useSelector(
    (state) => state.products.cartProducts
  );
  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }
  useEffect(() => {
    if (addToCartProductList && addToCartProductList.length) {
      setCartProducts(addToCartProductList);
    } else {
      setCartProducts([]);
    }
  }, [addToCartProductList]);
  return (
    <Grid container spacing={3}>
      {cartProducts && cartProducts.length ? (
        cartProducts.map((product) => {
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
                  <Typography gutterBottom variant="h6" component="div">
                    ({"$" + product.price}){"x"}
                    {product.count} ={" $"}
                    {product.price * product.count}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => removeFromCartHandler(product)}
                  >
                    Remove from cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Typography variant="h6">Your cart is empty</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default AddToCartList;
