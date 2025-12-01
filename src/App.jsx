import React, { useState, useEffect, useRef } from "react";
import MusicPlayer from "./components/MusicPlayer";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import DeleteAllButton from "./components/DeleteAllButton";

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
    audio.loop = true; // Make it repeat
    audio.volume = volume; // Set initial volume

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

  const clearAllNotes = () => {
    localStorage.removeItem("my-notes-app");
    setTask([]);
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
          

          /* 1. Standard (Firefox) */
          .custom-scrollbar {
              scrollbar-width: auto; /* 'auto' shows a thicker bar than 'thin' */
              scrollbar-color: #f59e0b #1f2937; /* Amber Thumb, Dark Grey Track */
          }

          /* 2. Webkit (Chrome, Edge, Safari) */
          .custom-scrollbar::-webkit-scrollbar {
              height: 14px; /* Made taller so it's very obvious */
              width: 14px; 
          }
          .custom-scrollbar::-webkit-scrollbar-track {
              background: #1f2937; /* DARK GREY BACKGROUND - Makes the track visible */
              border-radius: 8px;
              margin: 0px 20px; /* Adds some spacing from the edges */
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
      <div className="body-bg h-screen bg-[#10141f] flex flex-col font-sans relative">
        <MusicPlayer
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          isPlaying={isPlaying}
          toggleMusic={toggleMusic}
        />

        <NoteForm
          title={title}
          setTitle={setTitle}
          details={details}
          setDetails={setDetails}
          submitHandler={submitHandler}
          createRipple={createRipple}
        />

        <DeleteAllButton
          handleDoubleTap={handleDoubleTap}
          clearAllNotes={clearAllNotes}
        />

        <div className="flex gap-4 px-6 sm:px-10 py-1">
          <div className="h-px bg-amber-700 grow"></div>
          <h3 className="text-amber-500 text-sm sm:text-xl font-bold tracking-wide whitespace-nowrap">
            {task.length === 0
              ? "No Notes"
              : task.length === 1
              ? "1 Note"
              : `${task.length} Notes`}
          </h3>
          <div className="h-px bg-amber-700 grow"></div>
        </div>

        <NoteList task={task} deleteNote={deleteNote} />
      </div>
    </>
  );
};

export default App;
