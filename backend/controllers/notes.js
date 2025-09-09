import Note from "../models/notes.js";

export const listNotes = async (req, res) => {
  try {
    const { user } = req;
    // TODO: Add order by pinned
    const notes = await Note.find({ user: user._id }).sort({ pinned: -1 });

    res.status(200).json({ message: "Successfully retrieved!", notes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found!" });

    res.status(200).json({ message: "Successfully retrieved!", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content, pinned, shared } = req.body;
    const { user } = req;
    console.log(req.body);

    const note = await Note.create({
      user: user._id,
      title: title,
      content: content,
      pinned: pinned,
    });
    res.status(200).json({ message: "Successfully created!", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, pinned, shared } = req.body;
    const { user } = req;

    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found!" });

    if (!note.user.equals(user._id)) {
      return res.status(403).json({ message: "You can't edit this note!" });
    }

    note.title = title;
    note.content = content;
    note.pinned = pinned;
    await note.save();

    res.status(200).json({ message: "Successfully edited!", note });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found!" });

    if (!note.user.equals(user._id)) {
      return res.status(403).json({ message: "You can't delete this note!" });
    }

    await note.deleteOne();

    res.status(200).json({ message: "Successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
