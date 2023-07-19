import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Products.module.css";
import axios from "axios";

const Products = ({ first }) => {
  //take data from props//no not from props, instead of store.
  let products = useSelector((state) => state.products.productsData);

  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [prevalue, setPrevalue] = useState("");

  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  if (first) {
    //jab redux state me nahi hai, tabhi server se product mango.
    const prefectch = () => {
      axios
        .get(`${BASE_URL}/products`)
        .then((res) => {
          if (res.data.status === "error") {
            console.log("error from server ");
            navigate("/error");
            return;
          }
          setPrevalue(res.data.products);

          console.log(res.data);
        })
        .catch((error) => {
          console.log("Error in fetching products from backend", error);
        });
    };

    prefectch();

    products = prevalue;
  }

  // console.log(products); //debug

  return (
    <div>
      <section>
        {user?.isAdmin && (
          <div>
            <Link
              to={"/admin/addProduct"}
              // style={{ textDecoration: "none" }}
            >
              <Button variant="contained">Add product</Button>
            </Link>
          </div>
        )}
      </section>
      <ol className={styles.prodList}>
        {products &&
          products.map((item, i) => {
            return (
              <li key={item.id} className={styles.prodItem}>
                <ProductItem props={item} />
                {user?.isAdmin && (
                  <div>
                    <Link
                      to={`/admin/editProduct/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Edit</Button>
                    </Link>
                  </div>
                )}
              </li>
            );
          })}
        {!products && <div>Please wait! fetching the products</div>}
      </ol>
    </div>
  );
};

export default Products;

//NOTE: part for admin was added after client view was completed.
