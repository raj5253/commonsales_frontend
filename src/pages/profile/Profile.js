import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import profileImg from "./profilepicture.webp";
import NotLogedIn from "../../components/shared/NotLogedIn";
import { Navigate, useNavigate } from "react-router-dom";
// import ReactLoading from "react-loading";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth?.user; //error when auth is null
  // const token = localStorage.getItem("token");
  const [profiledata, setProfiledata] = useState("");
  const [searching, setSearching] = useState(true);

  const navigate = useNavigate();
  //use effect call

  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    setSearching(true);
    const fetchProfile = async () => {
      // console.log(token); // debug
      axios
        .get(`${BASE_URL}/profiledata`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          setProfiledata(res.data.userData);
          console.log(res.data.userData);
        })
        .catch((error) => {
          console.log("error while making server call", error);
          navigate("/error", {
            state: { mssg: "could not connect to the server", code: "503" },
          }); //automatic route , substitute of naviage(to, state)
        });
    };
    fetchProfile();
    setSearching(false);
  }, []);
  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: "center" }}>Your profile 🧑🏽‍💼</h1>

      {searching && (
        <div style={{ textAlign: "center" }}>
          <p>Please wait. Fetching...</p>
        </div>
      )}

      {!token && !searching && <NotLogedIn />}

      {profiledata && !searching && (
        <section className={styles.profilecontainer}>
          <div className={styles.generalinfo}>
            <div className={styles.pimg}>
              <img src={profileImg} alt="profile" />
            </div>
            <div className={styles.gencontact}>
              <p>
                email <span>{profiledata?.email}</span>
              </p>
              <p>
                name <span>{profiledata?.fullname}</span>
                <p>
                  <span> {auth.isAdmin ? "Administartor" : "User"}</span>
                </p>
              </p>
            </div>
          </div>
          <div className={styles.personalinfo}>
            <h3>Address</h3>
            <div className={styles.address}>
              <p>
                city <span>{profiledata?.address?.city}</span>
              </p>
              <p>
                postal <span>{profiledata?.address?.postal}</span>
              </p>
              <p>
                street
                <span> {profiledata?.address?.street}</span>
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;
