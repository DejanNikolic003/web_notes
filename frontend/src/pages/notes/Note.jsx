import { useSelector } from "react-redux";
import { formatDate } from "../../utils/dateFormatter";
import Badge from "../../components/Badge";
const Note = ({ note, handleDelete, selectNote }) => {
  const { data } = useSelector((state) => state.auth);
  return (
    <>
      <article
        key={note._id || note.id}
        className="group rounded-xl border border-slate-800 bg-slate-800/60 p-5 shadow-md shadow-slate-950/20 transition hover:border-slate-700 hover:shadow-lg"
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-xl font-semibold text-slate-100">
            {note.title}
          </h3>
          <div className="shrink-0 text-right text-xs text-slate-400">
            <div>Created {formatDate(note.createdAt)}</div>
            <div>Updated {formatDate(note.updatedAt)}</div>
          </div>
        </div>

        <p className="mb-4 line-clamp-4 whitespace-pre-wrap text-slate-300">
          {note.content}
        </p>

        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Pinned:</span>
            <Badge
              text={note.pinned ? "Yes" : "No"}
              badgeType={note.pinned ? "success" : "danger"}
            />
          </div>
        </div>

        {note.user?.toString() === data.user_id?.toString() && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-red-400/30 transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400/60"
              onClick={() => handleDelete(note)}
            >
              Delete
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm ring-1 ring-emerald-400/30 transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
              onClick={() => selectNote(note)}
            >
              Edit
            </button>
          </div>
        )}
      </article>
    </>
  );
};

export default Note;
