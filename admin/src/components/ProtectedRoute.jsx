import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext";

const ProtectedRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext);

  if (!aToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
