import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

function PrivateRoutes({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);
  // console.log(user);
  //   if (loading) {
  //     return (
  //       <div className="max-w-sm mx-auto">
  //         <span className="loading loading-spinner loading-sm "></span>
  //         <span className="loading loading-spinner loading-sm "></span>
  //       </div>
  //     );
  //   }
  if (!user) {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
  return children;
}

export default PrivateRoutes;
