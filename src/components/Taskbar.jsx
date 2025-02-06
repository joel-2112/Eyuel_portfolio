import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Volume2, Monitor, BatteryCharging, SquareTerminal, FolderClosed, Chrome, Edge } from "lucide-react";
import start from "../assets/start.svg";

const Taskbar = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 w-full h-12 bg-gray-200 flex items-center px-4 text-black shadow-lg border-gray-300">
      <div className="flex items-center cursor-pointer p-2 hover:bg-gray-300 rounded-lg">
        <img src={start} alt="Start" className="w-8 h-8" />
      </div>

      {/* Search Field */}
      <div className="relative ml-4 flex items-center bg-white rounded-sm flex-grow max-w-xs">
        <input
          type="text"
          placeholder="Type here to search"
          className="bg-transparent outline-none placeholder-gray-400 text-sm text-black w-full"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        {showSuggestions && (
          <div className="absolute left-0 bottom-11 bg-gray-800 text-white rounded-sm shadow-lg p-2 w-full">
            <ul>
              <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 1</li>
              <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 2</li>
              <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 3</li>
            </ul>
          </div>
        )}
      </div>

      {/* App Icons */}
      <div className="flex gap-3 ml-4 py-1">
        <Link
          to="/explorer"
          className={`p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
            location.pathname === "/explorer" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <FolderClosed className="w-8 h-8 text-yellow-500" />
        </Link>

        <Link
          to="/terminal"
          className={`p-2 rounded-lg bg-white hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
            location.pathname === "/terminal" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <SquareTerminal className="w-8 h-8 text-black" />
        </Link>

        {/* External Links (Edge & Chrome) still use <a> for correct behavior */}
        <a
          href="https://www.microsoft.com/edge"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
        >
          <Edge className="w-8 h-8 text-blue-500" />
        </a>

        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
        >
          <Chrome className="w-8 h-8 text-red-500" />
        </a>
      </div>

      {/* System Icons (Sound, Monitor, Battery, Time) */}
      <div className="ml-auto flex items-center gap-4">
        <Volume2 className="w-6 h-6 text-black cursor-pointer hover:text-gray-600 transition-colors duration-150" />
        <Monitor className="w-6 h-6 text-black cursor-pointer hover:text-gray-600 transition-colors duration-150" />
        <BatteryCharging className="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400 transition-colors duration-150" />
        <div>
          <div className="text-sm text-black px-2">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-sm text-black px-2">{currentTime.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
