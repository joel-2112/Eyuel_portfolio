import {  MinusIcon, Square } from "lucide-react";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { Rnd } from "react-rnd";

const Terminal = ({ onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState("/home");

  // Mock directory structure
  const directoryStructure = {
    home: {
      projects: ["web-app", "mobile-app"],
      documents: ["resume.pdf", "notes.txt"],
      images: ["photo1.jpg", "photo2.png"],
    },
  };

  const handleMinimize = () => setIsMinimized(true);
  const handleMaximize = () => setIsMaximized(!isMaximized);
  const handleClose = () => {
    onClose(); // Notify the parent component to close the terminal
  };

  const handleCommand = (e) => {
    e.preventDefault();

    // Add the command to the output
    setOutput((prev) => [...prev, `${currentPath}> ${command}`]);

    // Handle commands
    if (command.trim() === "") {
      // Do nothing if the command is empty
    } else if (command === "clear") {
      setOutput([]); // Clear the terminal
    } else if (command === "help") {
      setOutput((prev) => [
        ...prev,
        "Available commands:",
        '___________________',
        "  about       -- Display information about me",
        "  projects    -- List my projects",
        "  education   -- Display my education background",
        "  experience  -- Display my work experience",
        "  clear       -- Clear the terminal",
        "  ls          -- List files and folders in the current directory",
        "  cd <path>   -- Change directory",
      ]);
    } else if (command === "about") {
      setOutput((prev) => [
        ...prev,
        "My Name is Eyuel Kassahun \n " +  "I am a software engineer and full stack developer \n" +
         "with expertise in web and mobile app development \n" + 
         "using technologies MERN stack ,Python Django, DRF and Flutter for mobile app development.",
         
        
      ]);
    } else if (command === "projects") {
      setOutput((prev) => [
        ...prev,
        "My projects:",
        "___________________",
        "  - Web App: EthioExplore , Athlix, TechTalk, InternHub",
        "  - Mobile App: DoMore, GebiGubae, JoelGPT, EthioExplore, GESH-Delivery ",
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
        "  - MERN stack developer at STC (4 month)",
        "  - Flutter Developer at BIT  (2022-2024)",
        "  - Backend Instructor & TM at Training Team  (2016-2 month)", 
        "  - Django Developer - Self experienced (2024 - present)", 
      ]);
    } else if (command === "ls") {
      const pathParts = currentPath.split("/").filter((part) => part !== "");
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
        // Navigate back
        const newPath = currentPath.split("/").slice(0, -1).join("/") || "/home";
        setCurrentPath(newPath);
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else if (
        directoryStructure[path] &&
        currentPath === "/home" 
      ) {
        const newPath = `${currentPath}/${path}`;
        setCurrentPath(newPath);
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else {
        setOutput((prev) => [
          ...prev,
          `Error: No such file or directory: ${path}`,
        ]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `Command not found: ${command}`,
        "Type 'help' for a list of available commands.",
      ]);
    }

    setCommand(""); // Clear the input field
  };

  return (
    <Rnd
      default={{
        x: window.innerWidth / 2 - 300,
        y: window.innerHeight / 2 - 200,
        width: 600,
        height: 400,
      }}
      minWidth={400}
      minHeight={300}
      bounds="window"
      enableResizing={{
        bottom: true,
        bottomLeft: true,
        bottomRight: true,
        left: true,
        right: true,
        top: true,
        topLeft: true,
        topRight: true,
      }}
      dragHandleClassName="terminal-header"
    >
      <div
        className={`${
          isMinimized ? "hidden" : ""
        } w-full h-full bg-gray-700 text-white font-mono border border-gray-800 rounded-lg flex flex-col`}
      >
        {/* Terminal Header */}
        <div className="terminal-header flex items-center justify-between bg-white  text-gray-500 px-3 py-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
            <span className="text-sm text-gray-700">Command Prompt</span>
          </div>
          <div className="flex space-x-2 gap-2 ">
            <button
              onClick={handleMinimize}
              className="w-6 h-6   text-sm flex items-center justify-center rounded"
              title="Minimize"
            > 
            <MinusIcon size={25}/>

            </button>
            <button
              onClick={handleMaximize}
              className="w-6 h-6   text-sm flex items-center justify-center rounded"
              title="Maximize"
            >
             <Square />
            </button>
            <button
              onClick={handleClose}
              className="w-6 h-6  text-sm flex items-center justify-center rounded"
              title="Close"
            >
              <CgClose size={25}/>
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {output.map((line, index) => (
            <div className="text-gray-100" key={index}>{line}</div>
          ))}

          {/* Current Input Line */}
          <div className="flex items-center">
            {currentPath}&gt;{" "}
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(e);
                }
              }}
              className="bg-transparent text-white outline-none w-full inline"
              autoFocus
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Terminal;
