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
  const [newPath, setNewPath] = useState("This PC ");

  const handleTerminalToggle = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const handleExplorerToggle = (path = "") => {
    setNewPath(path);
    setIsExplorerOpen((prev) => !prev);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${win})` }}
    >
      <div className="absolute top-10 left-5 text-white text-lg">
        <div className="flex flex-col gap-5">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleExplorerToggle("This PC/Desktop/Projects")}
          >
            <FaFolder className="w-6 h-6 text-yellow-400" />
            <p className="text-sm sm:text-base">Projects</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleExplorerToggle("This PC/Desktop/Documents")}
          >
            <IoDocumentTextSharp className="w-10 h-10 text-blue-700" />
            <p className="text-sm sm:text-base">Documents</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleExplorerToggle("This PC/Desktop/Pictures")}
          >
            <MdOutlinePhotoLibrary className="w-10 h-10 text-purple-700" />
            <p className="text-sm sm:text-base">Pictures</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleExplorerToggle("This PC/Desktop/Contacts")}
          >
            <GoLink className="w-10 h-10 text-blue-700" />
            <p className="text-sm sm:text-base">Contacts</p>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar
        onTerminalToggle={handleTerminalToggle}
        onExplorerToggle={() => handleExplorerToggle()}
      />

      {/* Terminal */}
      {isTerminalOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <Terminal onClose={() => setIsTerminalOpen(false)} />
        </div>
      )}

      {/* Explorer */}
      {isExplorerOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
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