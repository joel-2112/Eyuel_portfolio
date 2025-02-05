import React from "react";

const Taskbar = () => {
  return (
    <div className="fixed bottom-0 w-full h-14 bg-[#171717] flex items-center px-4 text-white">
      {/* Start Menu Icon */}
      <div className="flex items-center cursor-pointer">
        <img src="/icons/windows.png" alt="Start" className="w-8 h-8" />
      </div>

      {/* Search Field */}
      <div className="ml-4 bg-[#2D2D2D] rounded-md flex items-center px-3 py-1">
        <input
          type="text"
          placeholder="Type here to search"
          className="bg-transparent outline-none placeholder-gray-400 text-sm"
        />
      </div>

      {/* Icons (Microsoft Edge, File Explorer, Terminal) */}
      <div className="flex gap-4 ml-4">
        <img src="/icons/edge.png" alt="Microsoft Edge" className="w-8 h-8 cursor-pointer" />
        <img src="/icons/fileexplorer.png" alt="File Explorer" className="w-8 h-8 cursor-pointer" />
        <img src="/icons/terminal.png" alt="Terminal" className="w-8 h-8 cursor-pointer" />
      </div>

      {/* System Icons (Date & Time, Sound, Monitor, Battery) */}
      <div className="ml-auto flex items-center gap-4">
        <img src="/icons/sound.png" alt="Sound" className="w-6 h-6 cursor-pointer" />
        <img src="/icons/monitor.png" alt="Monitor" className="w-6 h-6 cursor-pointer" />
        <img src="/icons/battery.png" alt="Battery" className="w-6 h-6 cursor-pointer" />
        <div className="text-sm">10:45 AM</div>
      </div>
    </div>
  );
};

export default Taskbar;