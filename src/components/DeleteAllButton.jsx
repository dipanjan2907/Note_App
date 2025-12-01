import React from "react";

const DeleteAllButton = ({ handleDoubleTap, clearAllNotes }) => {
  return (
    <div className="flex justify-end px-1 sm:px-4 sm:mr-">
      <button
        onClick={() =>
          handleDoubleTap(() => {
            clearAllNotes();
          })
        }
        className="mt-4 px-3 py-2 rounded-2xl border border-red-500/50 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 sm:text-base"
      >
        Delete All
        <p>(Double Click)</p>
      </button>
    </div>
  );
};

export default DeleteAllButton;
