import React, { useState, useEffect, useRef } from "react";
import { Minus, Square, X } from "lucide-react"; // Updated icons for Windows 11 style
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
  const [currentPath, setCurrentPath] = useState("C:\\Users\\Eyuel");
  const terminalBodyRef = useRef(null);

  const taskbarHeight = 48;

  const directoryStructure = {
    "C:\\Users\\Eyuel": {
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
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight,
      });
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
      setWindowSize({
        width: Math.min(600, window.innerWidth - 20),
        height: Math.min(400, window.innerHeight - 60),
      });
      setWindowPosition({
        x: (window.innerWidth - Math.min(600, window.innerWidth - 20)) / 2,
        y:
          (window.innerHeight -
            Math.min(400, window.innerHeight - 60) -
            taskbarHeight) /
          2,
      });
    } else {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight,
      });
      setWindowPosition({ x: 0, y: 0 });
    }
    setIsMaximized((prev) => !prev);
  };

  const handleClose = () => onClose();

  const handleCommand = (e) => {
    e.preventDefault();
    setOutput((prev) => [...prev, `${currentPath}>${command}`]); // Removed extra space after ">"

    if (command.trim() === "") {
      // Do nothing
    } else if (command === "cls") {
      setOutput([]);
    } else if (command === "help") {
      setOutput((prev) => [
        ...prev,
        "Available commands:",
        "--------------------",
        "  about  --     Display information about me",
        "  projects  --  List my projects",
        "  education  -- Display my education background",
        "  experience -- Display my work experience",
        "  cls    --     Clear the terminal",
        "  dir      --   List files and folders in the current directory",
        "  cd <path> --  Change directory",
      ]);
    } else if (command === "about") {
      setOutput((prev) => [
        ...prev,
        "About Me:",
        "----------------",
        "My Name is Eyuel Kassahun",
        "I am a software engineer and full stack developer",
        "with expertise in web and mobile app development",
        "using technologies MERN stack, Python Django, DRF, and Flutter for mobile app development. CI/CD piplines with GitHub Actions and Docker.",
        "-----------------",
      ]);
    } else if (command === "projects") {
      setOutput((prev) => [
        ...prev,
        "My projects:",
        "----------------",
        "  - Web App: EthioExplore, Athlix, TechTalk, InternHub, gainhopes.org.et, teamworcsc.com",
        "  - Mobile App: DoMore, GebiGubae, JoelGPT, EthioExplore, GESH-Delivery",
        "----------------",
        "For more details, visit my GitHub profile:",
        " https://github.com/joel-2112",
        "----------------",
      ]);
    } else if (command === "education") {
      setOutput((prev) => [
        ...prev,
        "Education:",
        "----------------",
        "  - Bachelor of Science in Software Engineering",
        "  - with 3.74 CGPA and 71% in national exit exam",
        "  - from Bahir Dar University(BIT) (2019-2024)",
        "----------------",
      ]);
    } else if (command === "experience") {
      setOutput((prev) => [
        ...prev,
        "Work Experience:",
        "----------------",
        "  - MERN stack developer at STC (4 months)",
        "  - Flutter Developer at BIT (1 year)",
        "  - Backend Instructor & TM at Training Team (2 months)",
        "  - Django Developer - prodigy Info Tech(1 month)",
        "  - Flutter Developer at Gerizan Technology Plc (2 months)",
        "  - Backend Developer at Teamwork IT solution  Plc (Currently)",
        "----------------",
      ]);
    } else if (command === "dir") {
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
        const newPath =
          currentPath.split("\\").slice(0, -1).join("\\") || "C:\\Users\\Eyuel";
        setCurrentPath(newPath + (newPath.endsWith("\\") ? "" : "\\")); // Ensure trailing backslash
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else if (directoryStructure[`${currentPath}\\${path}`]) {
        const newPath = `${currentPath}\\${path}`;
        setCurrentPath(newPath);
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else {
        setOutput((prev) => [
          ...prev,
          `'${command}' is not recognized as an internal or external command,`,
        ]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `'${command}' is not recognized as an internal or external command,`,
        "pls type 'help' for a list of available commands.",
      ]);
    }
    setCommand("");
  };

  if (isMinimized) return null;

  return (
    <Rnd
      size={{ width: windowSize.width, height: windowSize.height }}
      position={{ x: windowPosition.x, y: windowPosition.y }}
      onDragStop={(e, d) => setWindowPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWindowSize({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
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
      className="z-50 shadow-md rounded-t-md overflow-hidden border border-gray-600"
    >
      <div className="w-full h-full bg-black text-white font-[Consolas,'Courier New',monospace] flex flex-col">
        {/* Terminal Header */}
        <div className="drag-handle flex items-center justify-between bg-[#1A1A1A] px-3 py-1.5 border-b border-gray-700">
          <span className="text-sm text-white">Command Prompt</span>
          <div className="flex space-x-2">
            <button
              onClick={handleMinimize}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 text-white transition-colors duration-150"
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={handleMaximize}
              className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 text-white transition-colors duration-150"
              title="Maximize/Restore"
            >
              <Square size={16} /> {/* Square icon for maximize/restore */}
            </button>
            <button
              onClick={handleClose}
              className="w-6 h-6 flex items-center justify-center hover:bg-red-600 text-white transition-colors duration-150"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          className="flex-1 overflow-y-auto p-3 text-sm"
        >
          <div className="text-white">Microsoft Windows [Version 10]</div>
          <div className="text-white">
            (c) Microsoft Corporation. All rights reserved.
          </div>
          <div className="text-white">&nbsp;</div> {/* Empty line */}
          {output.map((line, index) => (
            <div className="text-white break-words" key={index}>
              {line}
            </div>
          ))}
          <div className="flex items-center mt-1">
            <span className="text-white">{currentPath}&gt;</span>{" "}
            {/* Windows CMD uses ">" */}
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommand(e)}
              className="bg-black text-white outline-none flex-1 border-none caret-white"
              autoFocus
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Terminal;
