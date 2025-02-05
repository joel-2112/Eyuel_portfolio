import React from "react";
import { motion } from "framer-motion";
import win from "../assets/wallpaper.png";
import Taskbar from "../components/Taskbar"; // Import the Taskbar component

const Home = () => {
  return (
    <div
      className="relative w-full h-screen z-30 flex flex-col"
      style={{ backgroundImage: `url(${win})`, backgroundSize: "cover" }}
    >
      {/* Desktop Icons */}
      <div className="absolute top-10 left-5 text-white text-lg">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center cursor-pointer">
            <img src="/icons/mycomputer.png" alt="My Computer" className="w-12 h-12" />
            <p>My Computer</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <img src="/icons/recyclebin.png" alt="Recycle Bin" className="w-12 h-12" />
            <p>Recycle Bin</p>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Home;