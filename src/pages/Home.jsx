import React, { useState } from "react";
import win from "../assets/wallpaper.png";
import contacts from "../assets/contact.png";
import documents from "../assets/doument.svg";
import pictures from "../assets/pictures.png";
import projects from "../assets/projects.svg";
import Taskbar from "../components/Taskbar";
import Terminal from "../components/Terminal";
import Explorer from "./Explorer";

const Home = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  const handleTerminalToggle = () => {
    setIsTerminalOpen((prev) => !prev);
  };

  const handleExplorerToggle = () => {
    setIsExplorerOpen((prev) => !prev);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${win})` }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-10 left-5 text-white text-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={projects}
              alt="Projects"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <p className="text-sm sm:text-base">Projects</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={documents}
              alt="Documents"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <p className="text-sm sm:text-base">Documents</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={pictures}
              alt="Pictures"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <p className="text-sm sm:text-base">Pictures</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img
              src={contacts}
              alt="Contacts"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <p className="text-sm sm:text-base">Contacts</p>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar
        onTerminalToggle={handleTerminalToggle}
        onExplorerToggle={handleExplorerToggle}
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
          <Explorer onClose={() => setIsExplorerOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;