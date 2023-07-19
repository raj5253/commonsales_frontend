import { useState } from "react";
import styles from "./Order.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { json } from "react-router-dom";

const Order = ({ props }) => {
  const formattedDate = props?.formattedDate; //according to what you get in console.log, don't check database, will take too much time.
  const id = props?.id;
  const status = props?.status;
  const items = props?.productData?.items;
  const totalPrice = props?.productData?.totalPrice;
  // console.log(props); //finding keys in props

  const token = useSelector((state) => state.auth).user;
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  const [currStatus, setCurrStatus] = useState(status);
  const [prevStatus, setPrevStatus] = useState(status);
  const [serror, setSerror] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSerror("");
    setCurrStatus(e.target.value);
  };

  const orderUpdate = (e) => {
    e.preventDefault();
    // const formdata = new FormData();
    // formdata.append("newStatus", currStatus); //problem in this.dont use it.
    // console.log(formdata)

    axios
      .post(
        `${BASE_URL}/admin/orders/${id}`,
        { newStatus: currStatus },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.status !== "ok") {
          setSerror(res.data.mssg);
          setCurrStatus(prevStatus); //update failed, then show prevStatus
        } else if (res.data.status === "ok") {
          setSerror("");
          setCurrStatus(res.data.newStatus); //update successfull , then show newStatus
          setPrevStatus(res.data.newStatus);
        }
      })
      .catch((error) => {
        setCurrStatus(prevStatus);
        setSerror("error in updating order");
        console.log("error in updating order", error);
      });
  };

  return (
    <div className={styles.container}>
      <form>
        <div className={styles.info}>
          <div>{formattedDate}</div>
          <div className={styles.invoice}>
            Invoice
            <i>#{id}</i>
          </div>
          <div className={styles.parentStatus}>
            <span className={styles.status}>
              <select name="status" id="status" onChange={handleChange}>
                <option value="cancelled" selected={status === "cancelled"}>
                  Cancelled
                </option>
                <option value="pending" selected={status === "pending"}>
                  Pending
                </option>
                <option value="fulfilled" selected={status === "fulfilled"}>
                  Fulfilled
                </option>
              </select>
              {/* {status}  */}
            </span>
          </div>
        </div>
        <ul className={styles.orderItems}>
          {items &&
            items.map((item, i) => {
              return (
                <li key={i + 101}>
                  <span>{item.product.title}</span>
                </li>
              );
            })}
          {items?.length === 0 && <li>No items!</li>}
        </ul>
        <p className={styles.address}>
          shipped to : {props?.userData.address.city} -{" "}
          <i>{props?.userData.address.postal}</i>
        </p>
        <h5 className={styles.totlprc}>totalPrice : ₹ {totalPrice}</h5>
        <div className={styles.bottom}>
          <p className={styles.error}>{serror} </p>
          <p>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={orderUpdate}
            >
              Update
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Order;

//color attribute of Button in material ui : 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
