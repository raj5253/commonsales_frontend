import React from "react";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      {/*outlet to render child routes   */}
    </>
  );
};

export default SharedLayout;
