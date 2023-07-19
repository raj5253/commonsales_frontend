import React, { useState, useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import styles from "./Product.module.css";
import axios from "axios";

const Product = () => {
  const { pid } = useParams();
  console.log(pid);
  const [prevalue, setPrevalue] = useState("");

  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const prefectch = () => {
      axios
        .get(`${BASE_URL}/products/${pid}`)
        .then((res) => {
          if (res.data.status === "error") {
            console.log("error from server ");
            navigate("/error");
            return;
          }
          setPrevalue(res.data.product);
          console.log(res.data);
        })
        .catch((error) => {
          console.log("Error in fetching  product data from backned", error);
        });
    };

    prefectch();
  }, [pid]);

  // const location = useLocation();
  // const pdata = location.state; // state sent by Link inside of ProductItem
  const pdata = prevalue;
  const cart = useSelector((state) => state.cart);

  const { discription, id, image, imageUrl, price, summary, title } = pdata;

  const [quantity, setQuantity] = useState(1);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuy = (e) => {
    e.preventDefault();
    console.log(isLoggedIn);
    // check from selecter and localStorage if user is logedin
    if (!isLoggedIn) {
      navigate("/login");
    }
    dispatch(cartActions.addToCart({ pdata, quantity }));
    // ye niche k do line bahut conconfusion create kiya tha. ye dono previosu data dikhate hai, current data nahi.
    // console.log(cart); //not inside any useEffect(dependency: cart), so old value displayed. in background item was added to cart successfuly.
    // localStorage.setItem("cart", JSON.stringify(cart)); /this also stores old value, back, so is of no use.
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.product}>
          <div className={styles.imgContainer}>
            <img src={imageUrl} alt={title} className={styles.image} />
          </div>
          <div>
            <ol>
              <li>
                <h1>{title}</h1>
              </li>
              <li>
                <h2>{summary}</h2>
              </li>
              <li>
                <h2>{discription}</h2>
              </li>
              <li>
                <h2> ₹ {price}</h2>
              </li>
            </ol>
            <div className={styles.buyContainer}>
              <Button
                variant="contained"
                onClick={handleBuy}
                // disableElevation ={true}
                elevation={0}
              >
                BUY
              </Button>{" "}
              <Button
                variant="outlined"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </Button>
              <span> {quantity} </span>
              <Button
                variant="outlined"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
              {/* {console.log(cart)} debug */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;

/* render all product my mapping */
