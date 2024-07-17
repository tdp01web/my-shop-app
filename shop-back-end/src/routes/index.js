import express from "express";
import RouterCategory from "./category.js";
import routerAuth from "./auth.js";
import RouterContact from "./contact.js";
import RouterUser from "./user.js";
import RouterAbout from "./about.js";
import RouterProduct from "./product.js";
const Router = express.Router();

Router.use("/products", RouterProduct);
Router.use("/categories", RouterCategory);
Router.use("/contacts", RouterContact);
Router.use("/abouts", RouterAbout);
Router.use("/auth", routerAuth);
Router.use("/users", RouterUser);
export default Router;