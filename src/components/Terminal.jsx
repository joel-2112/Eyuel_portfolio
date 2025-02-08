import React, { useState } from "react";

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
        "  about       - Display information about me",
        "  projects    - List my projects",
        "  education   - Display my education background",
        "  experience  - Display my work experience",
        "  clear       - Clear the terminal",
        "  ls          - List files and folders in the current directory",
        "  cd <path>   - Change directory",
      ]);
    } else if (command === "about") {
      setOutput((prev) => [
        ...prev,
        "I am a software developer with expertise in web and mobile app development.",
      ]);
    } else if (command === "projects") {
      setOutput((prev) => [
        ...prev,
        "My projects:",
        "  - Web App: EthioExplore",
        "  - Mobile App: Task Manager",
      ]);
    } else if (command === "education") {
      setOutput((prev) => [
        ...prev,
        "Education:",
        "  - Bachelor of Science in Computer Science",
        "  - Certifications in React, Node.js, and Python",
      ]);
    } else if (command === "experience") {
      setOutput((prev) => [
        ...prev,
        "Work Experience:",
        "  - Software Engineer at XYZ Corp (2020-2022)",
        "  - Freelance Developer (2018-2020)",
      ]);
    } else if (command === "ls") {
      const pathParts = currentPath.split("/").filter((part) => part !== "");
      let currentDir = directoryStructure;
      for (const part of pathParts) {
        currentDir = currentDir[part];
      }
      const filesAndFolders = Object.keys(currentDir).join("  ");
      setOutput((prev) => [...prev, filesAndFolders]);
    } else if (command.startsWith("cd")) {
      const path = command.split(" ")[1];
      if (path === "..") {
        // Navigate back
        const newPath = currentPath.split("/").slice(0, -1).join("/") || "/";
        setCurrentPath(newPath);
        setOutput((prev) => [...prev, `Navigated to ${newPath}`]);
      } else if (path && directoryStructure[path]) {
        // Navigate forward
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
    <div
      className={`${
        isMinimized ? "hidden" : ""
      } ${
        isMaximized ? "w-screen h-screen" : "w-[600px] h-[400px]"
      } fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white font-mono border border-gray-700 rounded-lg flex flex-col z-50`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-gray-800 p-2">
        <div className="text-gray-400">C:\\Users\\pato</div>
        <div className="flex space-x-2">
          <button
            onClick={handleMinimize}
            className="w-4 h-4 bg-yellow-400 rounded-full"
            title="Minimize"
          />
          <button
            onClick={handleMaximize}
            className="w-4 h-4 bg-green-500 rounded-full"
            title="Maximize"
          />
          <button
            onClick={handleClose}
            className="w-4 h-4 bg-red-500 rounded-full"
            title="Close"
          />
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-2">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleCommand} className="flex items-center bg-gray-900 p-2">
        <span>{currentPath}&gt; </span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none ml-2"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;