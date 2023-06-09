import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/*outlet to render child routes   */}
    </>
  );
};

export default SharedLayout;
