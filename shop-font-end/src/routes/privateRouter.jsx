import { message } from "antd";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = token && user;

  const hasAccess = isAuthenticated && (allowedRoles.includes(user.role));

  if (!hasAccess) {
    message.error("Bạn không có quyền để truy cập");
  }

  return hasAccess ? children : <Navigate to="/login" />;
};

export default PrivateRoute;