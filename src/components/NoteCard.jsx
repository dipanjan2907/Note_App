import React from "react";

const NoteCard = ({ note, index, deleteNote, bgnote }) => {
  return (
    <div
      className={`flex flex-col shrink-0 rounded-3xl h-[20rem] w-full md:w-[20rem] md:h-[25rem] 
          backdrop-blur-md border border-white md:border-white/70 shadow-xl 
          hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 ease-in-out ${bgnote}`}
    >
      <div className="p-6 pb-2">
        <p className="font-bold overflow-y-auto text-xl sm:text-2xl text-center text-amber-100 break-words line-clamp-2 leading-tight scrollbar-hide">
          {note.title}
        </p>
      </div>

      <div className="w-3/4 h-[1px] bg-white/10 mx-auto my-2"></div>

      <div className="overflow-hidden px-6 py-2 h-full">
        <p className="h-full overflow-y-auto scrollbar-hide text-slate-300 text-lg sm:text-[22px] leading-relaxed text-left m-2 break-words">
          {note.details}
        </p>
      </div>

      <div className="p-6 mt-auto flex justify-center">
        <button
          onClick={() => deleteNote(index)}
          className="px-6 py-2 rounded-full border border-red-500/50 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
