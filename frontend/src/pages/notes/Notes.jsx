import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNotes } from "../../actions/notes";

import CreateNote from "./CreateNote";
import NotFound from "../../components/NotFound";
import Note from "./Note";
import Loading from "../../components/Loading";

const Notes = () => {
  const { notes, isLoading } = useSelector((state) => state.notes);
  const [currentNote, setCurrentNote] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleDelete = (note) => {
    dispatch(deleteNote(note._id));
  };

  const selectNote = (note) => {
    setCurrentNote(note);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <header className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
            <p className="mt-1 text-slate-400">
              Capture ideas, organize thoughts, and stay on top of your work.
            </p>
          </div>
        </header>

        <CreateNote setCurrentNote={setCurrentNote} currentNote={currentNote} />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-200">Your notes</h2>
            {isLoading && <Loading />}
          </div>

          {notes.length === 0 && !isLoading ? (
            <NotFound text={"No notes yet. Create your first note above."} />
          ) : (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Note
                  note={note}
                  handleDelete={handleDelete}
                  selectNote={selectNote}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notes;
