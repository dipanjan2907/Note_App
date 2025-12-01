import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

  const scrollContainerRef = useRef(null);

  let lastTap = 0;
  function handleDoubleTap(callback) {
    const now = Date.now();
    if (now - lastTap < 300) {
      callback();
    }
    lastTap = now;
  }

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

    if (copyTask.length === 0) {
      localStorage.removeItem("my-notes-app");
    }
  };

  const handleWheel = (e) => {
    if (window.innerWidth >= 768 && scrollContainerRef.current) {
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
              width: 6px; 
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
      <div className="body-bg min-h-screen bg-[#10141f] flex flex-col font-sans pb-10">
        <div className="flex items-start justify-center pt-6 px-4">
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl w-full max-w-xl shadow-2xl bg-[#10141f] border border-b-indigo-500 active:border-fuchsia-900"
          >
            <input
              type="text"
              className="h-12 sm:h-16 font-medium px-4 rounded-xl bg-zinc-900 text-amber-100 border border-amber-500/30 placeholder-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg sm:text-2xl transition-all shadow-2xl"
              placeholder="Note Title.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows="4"
              className="px-4 py-3 rounded-xl bg-zinc-900 text-lg sm:text-xl text-cyan-100 border border-cyan-500/30 placeholder-cyan-500/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all scrollbar-hide"
              placeholder="Note Details...."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <button
              type="submit"
              className="self-end px-6 py-2 sm:px-8 sm:py-3 bg-violet-600 text-white text-lg sm:text-xl font-semibold rounded-lg transition-all duration-200 hover:bg-violet-500 active:scale-95 shadow-lg shadow-violet-500/20"
              onClick={createRipple}
            >
              Add Note
            </button>
          </form>
        </div>

        <div className="flex justify-end px-4 sm:px-0 sm:mr-10">
          <button
            onClick={() =>
              handleDoubleTap(() => {
                localStorage.removeItem("my-notes-app");
                setTask([]);
              })
            }
            className="mt-4 px-6 py-2 rounded-full border border-red-500/50 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 text-sm sm:text-base"
          >
            Delete All (Double Click)
          </button>
        </div>

        <div className="flex items-center gap-4 px-6 sm:px-10 py-5">
          <div className="h-px bg-amber-700 grow"></div>
          <h3 className="text-amber-500 text-lg sm:text-xl font-extrabold tracking-wide whitespace-nowrap">
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
          className="px-4 sm:px-10 py-4 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 w-full 
             md:overflow-x-auto md:overflow-y-hidden custom-scrollbar min-h-[50vh]"
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
                className={`flex flex-col shrink-0 rounded-3xl h-[20rem] w-full max-w-sm md:w-[22rem] md:h-[25rem] 
                    backdrop-blur-md border border-white/10 shadow-xl 
                    hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300 ease-in-out ${bgnote}`}
              >
                <div className="p-6 pb-2">
                  <p className="font-bold overflow-y-auto text-xl sm:text-2xl text-center text-amber-100 break-words line-clamp-2 leading-tight scrollbar-hide">
                    {elem.title}
                  </p>
                </div>

                <div className="w-3/4 h-[1px] bg-white/10 mx-auto my-2"></div>

                <div className="overflow-hidden px-6 py-2 h-full">
                  <p className="h-full overflow-y-auto scrollbar-hide text-slate-300 text-lg sm:text-[22px] leading-relaxed text-left m-2 break-words">
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
