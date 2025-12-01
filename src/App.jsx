import React, { useState, useEffect, useRef } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState([]);
  const [shouldScroll, setShouldScroll] = useState(false);

  const scrollContainerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(
    new Audio("https://cdn.pixabay.com/audio/2022/04/26/audio_40302f854a.mp3")
  );

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = volume;

    if (isPlaying) {
      audio.play().catch((error) => console.log("Playback blocked:", error));
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

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

  useEffect(() => {
    if (shouldScroll && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [task, shouldScroll]);

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
    setShouldScroll(true);
  };

  const deleteNote = (i) => {
    const copyTask = [...task];
    copyTask.splice(i, 1);
    setTask(copyTask);

    if (copyTask.length === 0) {
      localStorage.removeItem("my-notes-app");
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
          
          .custom-scrollbar {
              scrollbar-width: auto;
              scrollbar-color: #f59e0b #1f2937;
          }

          .custom-scrollbar::-webkit-scrollbar {
              height: 14px; 
              width: 14px; 
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: #1f2937;
              border-radius: 8px;
              margin: 0px 20px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: rgba(245, 158, 11, 1);
          }
          .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(245, 158, 11, 0.3) rgba(255, 255, 255, 0.05);
          }
        `}
      </style>
      <div className="body-bg h-screen bg-[#10141f] flex flex-col font-sans relative overflow-hidden">
        <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
          <div className="flex items-center gap-2 p-2 rounded-full bg-zinc-800 border border-white/10 shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none"
              style={{ "--tw-ring-color": "#f59e0b" }}
            />
          </div>

          <button
            onClick={toggleMusic}
            className={`p-3 rounded-full shadow-xl border border-white/10 transition-all duration-300 
                ${
                  isPlaying
                    ? "bg-green-500/20 text-green-400 animate-pulse"
                    : "bg-zinc-800 text-zinc-400"
                }`}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            )}
          </button>
        </div>

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
            className="px-6 py-2 rounded-full border border-red-500/50 text-red-400 font-bold hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-90 text-sm sm:text-base"
          >
            Delete All (Double Click)
          </button>
        </div>

        <div className="flex items-center gap-4 px-6 sm:px-10 py-1">
          <div className="h-px bg-amber-700 grow"></div>
          <h3 className="text-amber-500 text-lg sm:text-xl font-bold tracking-wide whitespace-nowrap">
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
          className="flex-1 px-4 sm:px-10 py-4 pb-8 flex flex-wrap justify-center md:items-start gap-6 md:gap-10 w-full overflow-y-auto custom-scrollbar"
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
                className={`flex flex-col shrink-0 rounded-3xl h-[20rem] w-full md:w-[20rem] md:h-[25rem] 
                    backdrop-blur-md border border-white md:border-white/70 shadow-xl 
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
