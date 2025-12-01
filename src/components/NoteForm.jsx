import React from "react";

const NoteForm = ({
  title,
  setTitle,
  details,
  setDetails,
  submitHandler,
  createRipple,
}) => {
  return (
    <div className="flex h-[22rem] w-[200vh] self-center items-start justify-center pt-6 px-4">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl w-full max-w-xl lg:max-w-2xl shadow-2xl bg-[#10141f] border border-b-indigo-500 active:border-fuchsia-900"
      >
        <input
          type="text"
          className="h-12 sm:h-16 font-medium px-4 rounded-xl bg-zinc-900 text-amber-100 border border-amber-500/30 placeholder-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg sm:text-2xl lg:text-3xl transition-all shadow-2xl"
          placeholder="Note Title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="4"
          className="px-4 py-3 rounded-xl bg-zinc-900 text-lg sm:text-xl lg:text-2xl text-cyan-100 border border-cyan-500/30 placeholder-cyan-500/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all scrollbar-hide"
          placeholder="Note Details...."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button
          type="submit"
          className="self-end px-6 py-2 sm:px-8 sm:py-3 lg:px-8 lg:py-3 lg:text-xl bg-violet-600 text-white text-lg sm:text-xl font-semibold rounded-lg transition-all duration-200 hover:bg-violet-500 active:scale-95 shadow-lg shadow-violet-500/20"
          onClick={createRipple}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
