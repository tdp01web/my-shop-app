import express from "express";
import { Signin, Signup, forgotPassword } from "../controllers/auth.js";

const routerAuth = express.Router();

routerAuth.post("/signup", Signup);
routerAuth.post("/signin", Signin);
routerAuth.post("/forgotpassword", forgotPassword);
export default routerAuth; 