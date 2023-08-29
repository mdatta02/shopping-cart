import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Layout = () => {
  let addToCartProductList = useSelector(
    (state) => state.products.cartProducts
  );

  let [cartCount, SetCartCount] = useState(0);
  useEffect(() => {
    if (addToCartProductList && addToCartProductList.length) {
      SetCartCount(addToCartProductList.length);
    } else {
      SetCartCount(0);
    }
  }, [addToCartProductList]);
  return (
    <>
      {/* <Container> */}
      <Grid container spacing={1}>
        {/* Navbar */}
        <Grid item xs={12}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Products
                  </Link>
                </Typography>
                <Link
                  to="/add-to-cart"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <AddShoppingCartIcon style={{ color: "white" }} />
                  <p
                    style={{
                      backgroundColor: " gray",
                      color: "white",
                      width: "20px",
                      height: "20px",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {cartCount || 0}
                  </p>
                </Link>
              </Toolbar>
            </AppBar>
          </Box>
        </Grid>

        {/* Page content */}
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </Grid>
      {/* </Container> */}
    </>
  );
};

export default Layout;
