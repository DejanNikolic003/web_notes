import API from ".";

export const getNotes = () => API.get("/notes/");
export const deleteNote = (noteId) => API.delete(`/notes/${noteId}`);
