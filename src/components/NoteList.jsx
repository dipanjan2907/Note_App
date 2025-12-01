import React from "react";
import NoteCard from "./NoteCard";

const NoteList = ({ task, deleteNote, scrollContainerRef }) => {
  return (
    <div
      ref={scrollContainerRef}
      className="px-4 sm:px-10 py-4 pb-8 flex flex-wrap justify-center items-center md:items-start gap-6 md:gap-10 w-full overflow-y-auto custom-scrollbar"
    >
      {task.map(function (elem, i) {
        let bgnote;

        if (i % 4 === 0)
          bgnote =
            "bg-gradient-to-br from-[#0c2314] via-[#123b20] to-[#061208]";
        else if (i % 3 === 0)
          bgnote =
            "bg-gradient-to-br from-[#1e0c23] via-[#35123b] to-[#100612]";
        else if (i % 2 === 0)
          bgnote =
            "bg-gradient-to-br from-[#031d1e] via-[#06353a] to-[#010e11]";
        else
          bgnote =
            "bg-gradient-to-br from-[#230c0c] via-[#3b1512] to-[#120606]";

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
