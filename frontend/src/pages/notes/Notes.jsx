import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNotes } from "../../actions/notes";
import Badge from "../../components/Badge";

const Notes = () => {
  const { data } = useSelector((state) => state.auth);
  const { notes, isLoading } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleDelete = (note) => {
    dispatch(deleteNote(note._id));
  };

  return (
    <>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id || note._id}>
          <h1 className="text-3xl">{note.title}</h1>
          <p>{note.content}</p>
          <p>
            Shared:{" "}
            <Badge
              text={note.shared ? "Yes" : "No"}
              badgeType={note.shared ? "success" : "danger"}
            />
          </p>
          <p>
            Pinned:{" "}
            <Badge
              text={note.pinned ? "Yes" : "No"}
              badgeType={note.pinned ? "success" : "danger"}
            />
          </p>
          <h1>{note.user}</h1>
          <h1>{data.user_id}</h1>
          {note.user === data.user_id && (
            <button
              type="button"
              className="bg-red-500 text-white text-sm p-2 rounded-md mt-2 cursor-pointer hover:bg-red-600 trasition-all duration-300"
              onClick={() => handleDelete(note)}
            >
              Delete
            </button>
          )}
          {/* <button
            type="button"
            className="bg-red-500 text-white text-sm p-2 rounded-md mt-2 cursor-pointer hover:bg-red-600 trasition-all duration-300"
            onClick={handleDelete(note)}
          >
            Delete
          </button> */}
        </div>
      ))}
    </>
  );
};

export default Notes;
