import { Router } from "express";
import {
  addNote,
  deleteNote,
  getAllNotes,
  getNote,
  updateNote,
} from "../handlers/notes";
import {
  validateIdParam,
  validateNoteBody,
  validateNoteTitle,
} from "../lib/validator-functions.js";

const notesRouter = Router();

notesRouter.get("/:id", validateIdParam(), getNote);
notesRouter.get("/", getAllNotes);
notesRouter.post("/", validateNoteBody(), validateNoteTitle(), addNote);
notesRouter.put(
  "/:id",
  validateIdParam(),
  validateNoteBody(),
  validateNoteTitle(),
  updateNote
);
notesRouter.delete("/:id", validateIdParam(), deleteNote);

export default notesRouter;
