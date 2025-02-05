import React from "react";
import { Link } from "react-router-dom";
import explorer from "../assets/explorer.png";
import edge from "../assets/edge.svg";
import terminal from "../assets/terminal.svg";
import chrome from "../assets/chrome.svg";
import start from "../assets/start.svg";
import { Volume2, Monitor, BatteryCharging } from "lucide-react";

const Taskbar = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 w-full h-14 bg-gray-900 flex items-center px-4 text-white shadow-lg border-t border-gray-700">
        <div className="flex items-center cursor-pointer p-2 hover:bg-gray-800 rounded-lg">
          <img src={start} alt="Start" className="w-8 h-8" />
        </div>

        {/* Search Field */}
        <div className="relative ml-4 flex items-center bg-gray-800 px-3 py-1 rounded-sm flex-grow max-w-xs">
          <input
            type="text"
            placeholder="Type here to search"
            className="bg-transparent outline-none placeholder-gray-400 text-sm text-white w-full"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          {showSuggestions && (
            <div className="absolute left-0 bottom-11 bg-gray-800 text-white rounded-sm shadow-lg p-2 w-full">
          <ul>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 1</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 2</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 3</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 1</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 2</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 3</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 1</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 2</li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">Suggestion 3</li>
          
          </ul>
            </div>
          )}
        </div>

      {/* App Icons */}
<div className="flex gap-3 ml-4">
  <Link to="/file-explorer" 
        className="p-2 bg-transparent rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
    <img src={explorer} alt="File Explorer" className="w-10 h-10 object-contain" />
  </Link>

  <Link to="/terminal" 
        className="p-2 bg-transparent rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
    <img src={terminal} alt="Terminal" className="w-10 h-10 object-contain" />
  </Link>

  {/* External Links (Edge & Chrome) still use <a> for correct behavior */}
  <a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer" 
     className="p-2 bg-transparent rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
    <img src={edge} alt="Microsoft Edge" className="w-10 h-10 object-contain" />
  </a>

  <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" 
     className="p-2 bg-transparent rounded-lg hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
    <img src={chrome} alt="Google Chrome" className="w-10 h-10 object-contain" />
  </a>
</div>



      {/* System Icons (Sound, Monitor, Battery, Time) */}
      <div className="ml-auto flex items-center gap-4">
        <Volume2 className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors duration-150" />
        <Monitor className="w-6 h-6 text-white cursor-pointer hover:text-gray-300 transition-colors duration-150" />
        <BatteryCharging className="w-6 h-6 text-green-400 cursor-pointer hover:text-green-300 transition-colors duration-150" />
        <div>
          <div className="text-sm text-white px-2">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="text-sm text-white px-2">{currentTime.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
