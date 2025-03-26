import React, { useState } from "react";
import win from "../assets/wallpaper.png";
import Taskbar from "../components/Taskbar";
import Terminal from "../components/Terminal";
import Explorer from "./Explorer";
import { FaFolder } from "react-icons/fa";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { GoLink } from "react-icons/go";

const Home = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [newPath, setNewPath] = useState("This PC");

  const handleTerminalToggle = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const handleExplorerToggle = (path = "This PC") => {
    setNewPath(path);
    setIsExplorerOpen((prev) => !prev);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${win})` }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 sm:top-6 lg:top-10 left-4 sm:left-5 lg:left-6 text-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 p-2 sm:p-4">
        <div
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 rounded-md p-2 transition-all duration-200"
          onClick={() => handleExplorerToggle("This PC/Desktop/Projects")}
        >
          <FaFolder className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-400" />
          <p className="text-xs sm:text-sm lg:text-base mt-1">Projects</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 rounded-md p-2 transition-all duration-200"
          onClick={() => handleExplorerToggle("This PC/Desktop/Documents")}
        >
          <IoDocumentTextSharp className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-700" />
          <p className="text-xs sm:text-sm lg:text-base mt-1">Documents</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 rounded-md p-2 transition-all duration-200"
          onClick={() => handleExplorerToggle("This PC/Desktop/Pictures")}
        >
          <MdOutlinePhotoLibrary className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-purple-700" />
          <p className="text-xs sm:text-sm lg:text-base mt-1">Pictures</p>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:bg-white/10 rounded-md p-2 transition-all duration-200"
          onClick={() => handleExplorerToggle("This PC/Desktop/Contacts")}
        >
          <GoLink className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-700" />
          <p className="text-xs sm:text-sm lg:text-base mt-1">Contacts</p>
        </div>
      </div>

      {/* Taskbar */}
      <div className="mt-auto">
        <Taskbar
          onTerminalToggle={handleTerminalToggle}
          onExplorerToggle={() => handleExplorerToggle()}
        />
      </div>

      {/* Terminal */}
      {isTerminalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-40 p-2 sm:p-4 lg:p-6">
          <Terminal onClose={() => setIsTerminalOpen(false)} />
        </div>
      )}

      {/* Explorer */}
      {isExplorerOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-40 p-2 sm:p-4 lg:p-6">
          <Explorer
            onClose={() => setIsExplorerOpen(false)}
            newPath={newPath}
          />
        </div>
      )}
    </div>
  );
};

export default Home;