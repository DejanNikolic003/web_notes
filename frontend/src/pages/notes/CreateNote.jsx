import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { createNote, editNotes } from "../../actions/notes";

import Input from "../../components/Input";
import TextArea from "../../components/Textarea";
import { useEffect } from "react";

const CreateNote = ({ setCurrentNote, currentNote }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    if (currentNote) {
      dispatch(editNotes(currentNote._id, data));
      setCurrentNote(null);
    } else {
      dispatch(createNote(data));
    }

    reset();
  };

  useEffect(() => {
    if (currentNote) {
      setValue("title", currentNote.title);
      setValue("pinned", currentNote.pinned);
      setValue("content", currentNote.content);
    }
  }, [currentNote]);

  return (
    <>
      <section className="mb-10">
        <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-6 shadow-lg shadow-slate-950/30">
          <h2 className="mb-4 text-lg font-semibold text-slate-200">
            {currentNote ? "Edit note" : "Create note"}
          </h2>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              name="title"
              placeholder="Enter a title..."
              type="text"
              register={register}
              validationRules={{ required: true }}
            />
            <TextArea
              name="content"
              placeholder="Enter content..."
              register={register}
              validationRules={{ required: true }}
            />
            <div className="flex items-center justify-start gap-2">
              <input type="checkbox" name="pinned" {...register("pinned")} />
              <label for="pinned" className="text-slate-400">
                Pinned
              </label>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm ring-1 ring-sky-400/30 transition hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
              >
                {currentNote ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateNote;
