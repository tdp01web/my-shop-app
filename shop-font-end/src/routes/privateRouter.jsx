import { message } from "antd";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = token && user?.role === "admin";
  if (!isAuthenticated) {
    message.error("Bạn cần dùng quyền admin để truy cập");
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;