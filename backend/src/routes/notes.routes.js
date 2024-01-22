import { Router } from "express";
import { getAllNotes, createNote, updateNote, deleteNote, getOneNote } from "../controllers/notes.controller.js";

const router = Router();


// Routes
router.get("/notes", getAllNotes);
router.get("/notes/:id", getOneNote)
router.post("/notes", createNote);
router.delete("/note/:id", deleteNote);
router.put("/notes/:id", updateNote);

export default router;