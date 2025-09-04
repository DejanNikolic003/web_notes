import API from ".";

export const getNotes = () => API.get("/notes/");
export const createNote = (formData) => API.post("/notes/create", formData);
export const deleteNote = (noteId) => API.delete(`/notes/${noteId}`);
