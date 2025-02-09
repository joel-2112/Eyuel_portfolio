import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Volume2, Wifi, Search } from "lucide-react";
import { FaBatteryHalf } from "react-icons/fa6";
import start from "../assets/Windows.svg";
import folderIcon from "../assets/explorer.png";
import terminalIcon from "../assets/cmd.png";
import edgeIcon from "../assets/edge.svg";
import chromeIcon from "../assets/chrome.svg";

const Taskbar = ({ onTerminalToggle,onExplorerToggle }) => {
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
      {/* Start Button */}
      <div className="flex items-center cursor-pointer p-2 hover:bg-gray-300 rounded-lg">
        <img
          src={start}
          alt="Start"
          className="w-5 h-5"
         // Blue filter
        />
      </div>

      {/* Search Field */}
      <div className="relative ml-4 flex justify-center border-t items-center bg-white rounded-sm flex-grow h-12 max-w-xs">
        <Search className="mx-2 text-gray-500" />
        <input
          type="text"
          placeholder="Type here to search"
          className="bg-transparent outline-none placeholder-gray-400 text-sm text-black w-full h-full"
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
        <button
        onClick={onExplorerToggle}
          className={`p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
            location.pathname === "/explorer" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <img src={folderIcon} alt="Explorer" className="w-8 h-8" />
        </button>

        {/* Terminal Button */}
        <button
          onClick={onTerminalToggle}
          className={`p-2 rounded-lg bg-transparent hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
            location.pathname === "/terminal" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <img src={terminalIcon} alt="Terminal" className="w-9 h-8" />
        </button>

        {/* External Links (Edge & Chrome) */}
        <a
          href="https://www.microsoft.com/edge"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
        >
          <img src={edgeIcon} alt="Edge" className="w-7 h-7" />
        </a>

        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
        >
          <img src={chromeIcon} alt="Chrome" className="w-8 h-8" />
        </a>
      </div>

      {/* System Icons (Volume, WiFi, Battery, Time) */}
      <div className="ml-auto flex items-center gap-4">
        <Volume2 className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors duration-150" />
        <Wifi className="w-6 h-6 cursor-pointer hover:text-gray-600 transition-colors duration-150" />
        <FaBatteryHalf className="w-6 h-6 cursor-pointer hover:text-green-400 transition-colors duration-150" />
        <div>
          <div className="text-sm text-black px-2">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-sm text-black px-2">
            {currentTime.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;