import { ToastContainer } from "react-toastify";
import Router from "./routes";
import "./styles/App.css";
import {App as AntdApp} from 'antd'
function App() {
  return (
    <AntdApp>
      <Router />
      <ToastContainer />
    </AntdApp>
  );
}

export default App;
