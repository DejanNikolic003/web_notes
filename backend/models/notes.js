import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    id: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, maxLength: 50 },
    content: { type: String },
    pinned: { type: Boolean, default: false },
    shared: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Note = mongoose.model("Note", noteSchema);

export default Note;
