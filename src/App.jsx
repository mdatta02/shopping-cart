import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductList from "./components/ProductList";
import Layout from "./components/Layout";
import AddToCartList from "./components/AddToCartList";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ProductList />,
        index: true,
      },
      {
        path: "add-to-cart",
        element: <AddToCartList />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
