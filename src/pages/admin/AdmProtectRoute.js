import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdmProtectRoute = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/error", {
        mssg: "You are not authorized to access this page.",
      });
    }
  }, []);

  return <>{user.isAdmin && <Outlet />}</>;
};

export default AdmProtectRoute;

// this component is to protect admin pages from invalid access  by any non-admin(unauthorised)

//  arguments in navigate() :
// name - A destination name of the route that has been defined somewhere
// params - Params to pass to the destination route.
