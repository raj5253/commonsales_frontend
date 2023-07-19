// product will be displayed inside this
import React, { useEffect } from "react";
import Products from "../components/products/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../store/productActions";

function Home() {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const products = useSelector((state) => state.products.productsData);
  // let first = true;
  // if (products) {
  //   first = false;
  // }
  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All products</h1>
      <div>
        <Products />
      </div>
    </div>
  );
}

export default Home;

// passing productsData in the props is not worth.
//it can be accessed by sotre in Products.js itself
