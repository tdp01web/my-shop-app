import { ToastContainer } from "react-toastify";
import Router from "./routes";
import "./styles/App.css";

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
