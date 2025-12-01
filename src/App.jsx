import React, { useState, useEffect, useRef } from "react";
const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  const scrollContainerRef = useRef(null);
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("my-notes-app");
      if (savedNotes) {
        setTask(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  }, []);

  useEffect(() => {
    if (task.length > 0) {
      localStorage.setItem("my-notes-app", JSON.stringify(task));
    }
  }, [task]);
  function createRipple(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title && !details) return;
    setTask([...task, { title, details }]);
    setDetails("");
    setTitle("");
  };

  const deleteNote = (i) => {
    const copyTask = [...task];
    copyTask.splice(i, 1);
    setTask(copyTask);
  };

  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <>
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
          .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
          .custom-scrollbar::-webkit-scrollbar {
              height: 6px;
              width: 0px; 
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgba(245, 158, 11, 0.3);
              border-radius: 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: rgba(245, 158, 11, 0.6);
          }
          .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(245, 158, 11, 0.3) transparent;
          }
        `}
      </style>
      <div className="h-screen overflow-hidden flex flex-col font-sans">
        <div className="flex items-start justify-center pt-3 pb-1 ">
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-6 p-6 rounded-2xl w-full max-w-xl shadow-2xl bg-[#10141f] border border-b-indigo-500 active:border-fuchsia-900"
          >
            <input
              type="text"
              className="h-16 font-medium px-4 rounded-xl bg-zinc-900 text-amber-100 border border-amber-500/30 placeholder-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-2xl transition-all shadow-2xl"
              placeholder="Note Title.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows="5"
              className="px-4 py-3 rounded-xl bg-zinc-900 text-xl text-cyan-100 border border-cyan-500/30 placeholder-cyan-500/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all scrollbar-hide"
              placeholder="Note Details...."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button
              type="submit"
              className="self-end px-8 py-3 bg-violet-600 text-white text-xl font-semibold rounded-lg transition-all duration-200 hover:bg-violet-500 active:scale-95 shadow-lg shadow-violet-500/20"
              onClick={createRipple}
            >
              Add Note
            </button>
          </form>
        </div>

        <div className="flex items-center gap-4 px-10 py-5">
          <div className="h-px bg-amber-700 grow"></div>
          <h3 className="text-amber-500 text-xl font-extrabold tracking-wide">
            {task.length === 0
              ? "No Notes"
              : task.length === 1
              ? "1 Note"
              : `${task.length} Notes`}
          </h3>
          <div className="h-px bg-amber-700 grow"></div>
        </div>
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="p-10 flex items-center gap-7 md:gap-10 flex-1 w-full overflow-x-auto overflow-y-hidden custom-scrollbar"
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
              <div
                key={i}
                className={`flex flex-col shrink-0 rounded-3xl h-[20rem] w-[15rem] md:h-[25rem] md:w-[22rem] backdrop-blur-md border border-white/10 shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 ease-in-out ${bgnote}`}
              >
                <div className="p-6 pb-2">
                  <p className="font-bold overflow-y-auto text-2xl text-center text-amber-100 break-words line-clamp-2 leading-tight scrollbar-hide">
                    {elem.title}
                  </p>
                </div>

                <div className="w-3/4 h-[1px] bg-white/10 mx-auto my-2"></div>

                <div className="overflow-hidden px-6 py-2">
                  <p className="h-full overflow-y-auto scrollbar-hide text-slate-300 text-[22px] leading-relaxed text-left m-4 break-words">
                    {elem.details}
                  </p>
                </div>

                <div className="p-6 mt-auto flex justify-center">
                  <button
                    onClick={() => deleteNote(i)}
                    className="px-6 py-2 rounded-full border border-red-500/50 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
