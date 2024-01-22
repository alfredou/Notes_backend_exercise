import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";

const router = Router();

// Routes
router.get("/categories", getAllCategories)
router.post("/category", createCategory);


export default router;