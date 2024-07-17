import express from "express";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { createCategory, getAllCategory, getOneCategory, removeCategory, updateCategory } from "../controllers/category.js";
const RouterCategory = express.Router();

RouterCategory.get("/", getAllCategory);
RouterCategory.get("/:id", getOneCategory);
RouterCategory.post("/", checkPermission, createCategory);
RouterCategory.put("/:id", checkPermission, updateCategory);
RouterCategory.delete("/:id", checkPermission, removeCategory);

export default RouterCategory; 