import React, { useState } from "react";
import { motion } from "framer-motion";
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
      className="relative w-full h-screen z-30 flex flex-col"
      style={{ backgroundImage: `url(${win})`, backgroundSize: "cover" }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-10 left-5 text-white text-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center cursor-pointer">
            <img src={projects} alt="Projects" className="w-12 h-12" />
            <p>Projects</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img src={documents} alt="Documents" className="w-12 h-12" />
            <p>Documents</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img src={pictures} alt="Pictures" className="w-12 h-12" />
            <p>Pictures</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img src={contacts} alt="Contacts" className="w-12 h-12" />
            <p>Contacts</p>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar onTerminalToggle={handleTerminalToggle} onExplorerToggle={handleExplorerToggle} />
      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
      {isExplorerOpen && <Explorer onClose={() => setIsExplorerOpen(false)} />}
    </div>
  );
};

export default Home;