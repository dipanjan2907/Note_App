import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);

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
        `}
      </style>
      <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
        <div className="flex items-start justify-center pt-10 pb-5">
          <form
            onSubmit={submitHandler}
            className="flex flex-col gap-6 p-10 rounded-2xl w-full max-w-xl shadow-2xl bg-slate-800 border border-slate-700"
          >
            <input
              type="text"
              className="h-16 font-medium px-4 rounded-xl bg-zinc-900 text-amber-100 border border-amber-500/30 placeholder-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500 text-2xl transition-all"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows="5"
              className="px-4 py-3 rounded-xl bg-zinc-900 text-xl text-cyan-100 border border-cyan-500/30 placeholder-cyan-500/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all scrollbar-hide"
              placeholder="Enter Details"
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
          <div className="h-px bg-cyan-700 grow"></div>
          <h3 className="text-cyan-400 text-3xl font-bold tracking-wide">
            Your Notes
          </h3>
          <div className="h-px bg-cyan-700 grow"></div>
        </div>

        <div className="p-10 flex flex-wrap justify-center gap-20 h-full w-full">
          {task.map(function (elem, i) {
            const bgnote =
              i % 2 === 0
                ? "bg-gradient-to-br from-cyan-900/90 to-slate-900"
                : "bg-gradient-to-br from-pink-900/90 to-slate-900";
            return (
              <div
                key={i}
                className={`flex flex-col rounded-3xl h-[40rem] w-[30rem] backdrop-blur-md border border-white/10 shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-300 ease-in-out ${bgnote}`}
              >
                <div className="p-6 pb-2">
                  <h2 className="font-bold text-4xl text-center text-amber-100 break-words line-clamp-2 leading-tight">
                    {elem.title}
                  </h2>
                </div>

                <div className="w-3/4 h-[1px] bg-white/10 mx-auto my-2"></div>

                <div className="flex-grow overflow-hidden px-6 py-2">
                  <div className="h-full overflow-y-auto scrollbar-hide text-slate-300 text-2xl leading-relaxed text-center break-words">
                    {elem.details}
                  </div>
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
