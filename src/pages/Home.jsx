import React from "react";
import { motion } from "framer-motion";
import win from "../assets/win.jpg";

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

      {/* Windows Taskbar */}
      <div className="absolute bottom-0 w-full h-14 bg-black flex items-center px-4">
        <img src="/icons/windows.png" alt="Start" className="w-8 h-8 cursor-pointer" />
        <div className="flex gap-4 ml-4">
          <img src="/icons/fileexplorer.png" alt="File Explorer" className="w-8 h-8 cursor-pointer" />
          <img src="/icons/chrome.png" alt="Chrome" className="w-8 h-8 cursor-pointer" />
        </div>
        <div className="ml-auto text-white text-lg">10:45 AM</div>
      </div>
    </div>
  );
};

export default Home;
