import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../actions/notes";

const Notes = () => {
  const { notes, isLoading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id || note._id}>
          <h1>{note.content}</h1>
        </div>
      ))}
    </>
  );
};

export default Notes;
