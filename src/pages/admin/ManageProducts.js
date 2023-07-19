import React, { useEffect, useState } from "react";
import Products from "../../components/products/Products";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const ManageProducts = () => {
  let products = useSelector((state) => state.products.productsData);

  let first = true;
  if (products) {
    //abhi tak prdouctsData nahi hai redux state me , tabhi server se products mango.
    first = false;
  } else {
    first = true;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}> ManageProducts</h1>
      <Products first={first} />
    </div>
  );
};

export default ManageProducts;
