import express from "express";
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/notesController.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authorize, getAllNotes);
router.get("/:id", authorize, getNote);
router.post("/", authorize, createNote);
router.put("/:id", authorize, updateNote);
router.delete("/:id", authorize, deleteNote);

export default router;
