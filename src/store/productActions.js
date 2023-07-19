// import { GetRequest } from "../utils/API";
import { productActions } from "./productSlice";
// import axios from "axios";

export const fetchProductsData = () => {
  // return a function
  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(`${BASE_URL}/`);
      const data = await res.json();
      // console.log(data);
      return data.products; //i wrote data.produts and resolving this took1hr
    };
    try {
      const productData = await fetchHandler(); // array of products
      dispatch(productActions.replaceData(productData)); //a reducer in productSlice
    } catch (error) {
      console.log("error in ProductActions.js", error);
    }
  };
};
