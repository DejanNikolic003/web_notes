import { Router } from "express";
import {
  listNotes,
  getNoteById,
  createNote,
  editNote,
  deleteNote,
} from "../controllers/notes.js";

const noteRouter = Router();

noteRouter.get("/", listNotes);
noteRouter.get("/:id", getNoteById);
noteRouter.post("/create", createNote);
noteRouter.put("/:id", editNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;
