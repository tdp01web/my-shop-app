import express from "express";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { getOneAbout, createAbout, getAllAbout, removeAbout, updateAbout } from "../controllers/about.js";
const RouterAbout = express.Router();

RouterAbout.get("/", getAllAbout);
RouterAbout.get("/:id", getOneAbout);
RouterAbout.post("/", createAbout);
RouterAbout.put("/:id",checkPermission, updateAbout);
RouterAbout.delete("/:id",checkPermission, removeAbout);

export default RouterAbout; 