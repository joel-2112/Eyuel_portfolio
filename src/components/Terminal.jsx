import React, { useState, useEffect, useRef } from "react";
import { Minus, Maximize2, X } from "lucide-react"; // Using Lucide icons for Windows style
import { Rnd } from "react-rnd";

const Terminal = ({ onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: Math.min(600, window.innerWidth - 20),
    height: Math.min(400, window.innerHeight - 60),
  });
  const [windowPosition, setWindowPosition] = useState({
    x: (window.innerWidth - Math.min(600, window.innerWidth - 20)) / 2,
    y: (window.innerHeight - Math.min(400, window.innerHeight - 60)) / 2,
  });
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState("C:\\Users\\Eyuel\\");
  const terminalBodyRef = useRef(null);

  const taskbarHeight = 48;

  const directoryStructure = {
    "C:\\Users\\Eyuel\\": {
      projects: ["web-app", "mobile-app"],
      documents: ["resume.pdf", "notes.txt"],
      images: ["photo1.jpg", "photo2.png"],
    },
  };

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [output]);

  const handleResize = () => {
    if (!isMaximized) {
      const newWidth = Math.min(600, window.innerWidth - 20);
      const newHeight = Math.min(400, window.innerHeight - taskbarHeight - 20);
      setWindowSize({ width: newWidth, height: newHeight });
      setWindowPosition({
        x: (window.innerWidth - newWidth) / 2,
        y: (window.innerHeight - newHeight - taskbarHeight) / 2,
      });
    } else {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
      setWindowPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized]);

  const handleMinimize = () => setIsMinimized(true);

  const handleMaximize = () => {
    if (isMaximized) {
      setWindowSize({ width: Math.min(600, window.innerWidth - 20), height: Math.min(400, window.innerHeight - 60) });
      setWindowPosition({
        x: (window.innerWidth - Math.min(600, window.innerWidth - 20)) / 2,
        y: (window.innerHeight - Math.min(400, window.innerHeight - 60) - taskbarHeight) / 2,
      });
    } else {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
      setWindowPosition({ x: 0, y: 0 });
    }
    setIsMaximized((prev) => !prev);
  };

  const handleClose = () => onClose();

  const handleCommand = (e) => {
    e.preventDefault();
    setOutput((prev) => [...prev, `${currentPath}> ${command}`]);

    if (command.trim() === "") {
      // Do nothing
    } else if (command === "cls") { // Changed "clear" to "cls" for Windows CMD
      setOutput([]);
    } else if (command === "help") {
      setOutput((prev) => [
        ...prev,
        "Available commands:",
        "___________________",
        "  about       -- Display information about me",
        "  projects    -- List my projects",
        "  education   -- Display my education background",
        "  experience  -- Display my work experience",
        "  cls         -- Clear the terminal",
        "  dir         -- List files and folders in the current directory",
        "  cd <path>   -- Change directory",
      ]);
    } else if (command === "about") {
      setOutput((prev) => [
        ...prev,
        "My Name is Eyuel Kassahun",
        "I am a software engineer and full stack developer",
        "with expertise in web and mobile app development",
        "using technologies MERN stack, Python Django, DRF, and Flutter for mobile app development.",
      ]);
    } else if (command === "projects") {
      setOutput((prev) => [
        ...prev,
        "My projects:",
        "___________________",
        "  - Web App: EthioExplore, Athlix, TechTalk, InternHub",
        "  - Mobile App: DoMore, GebiGubae, JoelGPT, EthioExplore, GESH-Delivery",
      ]);
    } else if (command === "education") {
      setOutput((prev) => [
        ...prev,
        "Education:",
        "_________________",
        "  - Bachelor of Science in Software Engineering",
        "  - Experienced Software Developer",
      ]);
    } else if (command === "experience") {
      setOutput((prev) => [
        ...prev,
        "Work Experience:",
        "_________________",
        "  - MERN stack developer at STC (4 months)",
        "  - Flutter Developer at BIT (2022-2024)",
        "  - Backend Instructor & TM at Training Team (2016 - 2 months)",
        "  - Django Developer - Self-experienced (2024 - present)",
      ]);
    } else if (command === "dir") { // Changed "ls" to "dir" for Windows CMD
      const pathParts = currentPath.split("\\").filter((part) => part !== "");
      let currentDir = directoryStructure;
      for (const part of pathParts) {
        currentDir = currentDir[part];
      }
      const filesAndFolders =
        typeof currentDir === "object"
          ? Object.keys(currentDir).join("  ")
          : currentDir.join("  ");
      setOutput((prev) => [...prev, filesAndFolders]);
    } else if (command.startsWith("cd")) {
      const path = command.split(" ")[1];
      if (path === "..") {
        const newPath = currentPath.split("\\").slice(0, -1).join("\\") || "C:\\Users\\Eyuel";
        setCurrentPath(newPath);
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else if (directoryStructure[path] && currentPath === "C:\\Users\\Eyuel") {
        const newPath = `${currentPath}\\${path}`;
        setCurrentPath(newPath);
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else {
        setOutput((prev) => [...prev, `Error: No such file or directory: ${path}`]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `Command not found: ${command}`,
        "Type 'help' for a list of available commands.",
      ]);
    }
    setCommand("");
  };

  return (
    <Rnd
      size={{ width: windowSize.width, height: windowSize.height }}
      position={{ x: windowPosition.x, y: windowPosition.y }}
      onDragStop={(e, d) => setWindowPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWindowSize({ width: parseInt(ref.style.width), height: parseInt(ref.style.height) });
        setWindowPosition(position);
      }}
      minWidth={300}
      minHeight={200}
      maxWidth="100vw"
      maxHeight={`calc(100vh - ${taskbarHeight}px)`}
      bounds="window"
      dragHandleClassName="drag-handle"
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      className={`z-50 shadow-xl rounded-t-lg overflow-hidden border border-gray-800 ${isMinimized ? "hidden" : ""}`}
    >
      <div className="w-full h-full bg-black text-white font-mono flex flex-col">
        {/* Terminal Header */}
        <div className="drag-handle flex items-center justify-between bg-gray-800 px-2 sm:px-3 py-1 sm:py-1.5 border-b border-gray-700">
          <span className="text-xs sm:text-sm text-gray-300">C:\Windows\System32\cmd.exe</span>
          <div className="flex space-x-1 sm:space-x-2">
            <button
              onClick={handleMinimize}
              className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded hover:bg-gray-700 text-gray-300 transition-colors duration-150"
              title="Minimize"
            >
              <Minus size={14} className="sm:size-16" />
            </button>
            <button
              onClick={handleMaximize}
              className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded hover:bg-gray-700 text-gray-300 transition-colors duration-150"
              title="Maximize/Restore"
            >
              <Maximize2 size={14} className="sm:size-16" />
            </button>
            <button
              onClick={handleClose}
              className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded hover:bg-red-600 text-gray-300 transition-colors duration-150"
              title="Close"
            >
              <X size={14} className="sm:size-16" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4 text-xs sm:text-sm lg:text-base"
        >
          {output.map((line, index) => (
            <div className="text-gray-200 break-words" key={index}>
              {line}
            </div>
          ))}
          <div className="flex items-center mt-1">
            <span className="text-gray-300">{currentPath} </span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(e)}
              className="bg-transparent text-white outline-none flex-1"
              autoFocus
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Terminal;