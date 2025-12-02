import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ task, deleteNote, scrollContainerRef }) => {
  return (
    <div
      ref={scrollContainerRef}
      className="px-4 sm:px-10 py-4 pb-8 flex flex-wrap justify-center items-center md:items-start gap-6 md:gap-10 w-full overflow-y-auto custom-scrollbar"
    >
      {task.map(function (elem, i) {
        const gradients = [
          "bg-gradient-to-br from-[#0c1423] via-[#122b3b] to-[#060812] border border-white/10 shadow-lg shadow-blue-900/50",

          "bg-gradient-to-br from-[#0c2314] via-[#123b20] to-[#061208] border border-white/10 shadow-lg shadow-emerald-900/40",

          "bg-gradient-to-br from-[#1e0c23] via-[#35123b] to-[#100612] border border-white/10 shadow-lg shadow-purple-900/40",

          "bg-gradient-to-br from-[#031d1e] via-[#06353a] to-[#010e11] border border-white/10 shadow-lg shadow-cyan-900/40",

          "bg-gradient-to-br from-[#230c0c] via-[#3b1512] to-[#120606] border border-white/10 shadow-lg shadow-red-900/40",
        ];

        const bgnote = gradients[i % gradients.length];

        return (
          <NoteCard
            key={i}
            note={elem}
            index={i}
            deleteNote={deleteNote}
            bgnote={bgnote}
          />
        );
      })}
    </div>
  );
};

export default NoteList;
