import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Volume2, Wifi, Search, Menu } from "lucide-react";
import { FaBatteryHalf, FaYoutube, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiOpenai, SiTelegram, SiFigma, SiOpenaigym, SiGithubcopilot } from "react-icons/si";
import start from "../assets/Windows.svg";
import folderIcon from "../assets/explorer.png";
import terminalIcon from "../assets/cmd.png";
import edgeIcon from "../assets/edge.svg";
import chromeIcon from "../assets/chrome.svg";
import AllContent from "./menu/AllContent";
import Skills from "./menu/Skills";
import Tools from "./menu/Tools";

const Taskbar = ({ onTerminalToggle, onExplorerToggle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedNav, setSelectedNav] = useState("all");
  const location = useLocation();
  const startMenuRef = useRef(null);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleStartMenu = () => setShowStartMenu((prev) => !prev);
  const handleNavClick = (nav) => setSelectedNav(nav);

  const renderContent = () => {
    switch (selectedNav) {
      case "all": return <AllContent />;
      case "skills": return <Skills />;
      case "tools": return <Tools />;
      default: return <AllContent />;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target) && !event.target.closest(".start-button")) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchSuggestions = [
    { name: "YouTube", icon: <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />, url: "https://youtube.com" },
    { name: "DeepSeek", icon: <SiOpenaigym className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />, url: "https://deepseek.com" },
    { name: "ChatGPT", icon: <SiOpenai className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />, url: "https://chat.openai.com" },
    { name: "GitHub Copilot", icon: <SiGithubcopilot className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />, url: "https://copilot.github.com" },
    { name: "Google", icon: <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />, url: "https://google.com" },
    { name: "Telegram", icon: <SiTelegram className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />, url: "https://telegram.org" },
    { name: "LinkedIn", icon: <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />, url: "https://linkedin.com" },
    { name: "Twitter", icon: <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />, url: "https://twitter.com" },
    { name: "Figma", icon: <SiFigma className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />, url: "https://figma.com" },
  ];

  return (
    <div className="fixed bottom-0 w-full h-12 sm:h-14 bg-gray-200 flex items-center px-2 sm:px-4 text-black shadow-lg z-50">
      {/* Start Button */}
      <div
        className="flex items-center cursor-pointer p-1 sm:p-2 hover:bg-gray-300 rounded-lg start-button transition-all duration-200"
        onClick={toggleStartMenu}
      >
        <img src={start} alt="Start" className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Start Menu Modal */}
      {showStartMenu && (
        <div
          ref={startMenuRef}
          className="absolute bottom-14 left-1 w-11/12 sm:w-[400px] lg:w-[500px] bg-white max-h-[70vh] sm:max-h-[400px] overflow-hidden rounded-t-lg shadow-xl transition-all duration-200"
        >
          <div className="flex justify-around p-2 sm:p-3 border-b border-gray-200">
            <button
              className={`px-2 sm:px-3 py-1 hover:bg-gray-200 rounded text-sm sm:text-base ${selectedNav === "all" ? "font-bold text-blue-600" : "text-gray-700"}`}
              onClick={() => handleNavClick("all")}
            >
              All
            </button>
            <button
              className={`px-2 sm:px-3 py-1 hover:bg-gray-200 rounded text-sm sm:text-base ${selectedNav === "skills" ? "font-bold text-blue-600" : "text-gray-700"}`}
              onClick={() => handleNavClick("skills")}
            >
              Skills
            </button>
            <button
              className={`px-2 sm:px-3 py-1 hover:bg-gray-200 rounded text-sm sm:text-base ${selectedNav === "tools" ? "font-bold text-blue-600" : "text-gray-700"}`}
              onClick={() => handleNavClick("tools")}
            >
              Tools
            </button>
          </div>
          <div className="overflow-y-auto max-h-[calc(70vh-48px)] sm:max-h-[calc(400px-56px)] p-3 sm:p-4">
            {renderContent()}
          </div>
        </div>
      )}

      {/* Search Field */}
      <div className="relative ml-2 sm:ml-4 flex items-center bg-white rounded-md flex-grow max-w-[200px] sm:max-w-xs h-8 sm:h-10">
        <Search className="mx-1 sm:mx-2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Type here to search"
          className="bg-transparent outline-none placeholder-gray-400 text-xs sm:text-sm text-black w-full h-full px-1 sm:px-2"
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute left-0 bottom-10 sm:bottom-12 bg-white text-gray-900 rounded-md w-full max-w-[200px] sm:max-w-xs shadow-lg p-2 sm:p-3 transition-all duration-200"
          >
            <p className="text-center font-semibold text-xs sm:text-sm mb-2">Most Important Links</p>
            <hr className="mb-2" />
            <ul className="space-y-1">
              {searchSuggestions.map((suggestion, index) => (
                <li key={index}>
                  <a
                    href={suggestion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded flex items-center space-x-2 text-xs sm:text-sm"
                  >
                    {suggestion.icon}
                    <span>{suggestion.name}</span>
                  </a>
                </li>
              ))}c
            </ul>
          </div>
        )}
      </div>

      {/* App Icons (Desktop) */}
      <div className="hidden md:flex gap-2 sm:gap-3 ml-2 sm:ml-4 py-1">
        <button
          onClick={onExplorerToggle}
          className={`p-1 sm:p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 ${location.pathname === "/explorer" ? "border-b-2 border-blue-500" : ""}`}
        >
          <img src={folderIcon} alt="Explorer" className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={onTerminalToggle}
          className={`p-1 sm:p-2 rounded-lg bg-transparent hover:bg-gray-300 transition-colors duration-200 ${location.pathname === "/terminal" ? "border-b-2 border-blue-500" : ""}`}
        >
          <img src={terminalIcon} alt="Terminal" className="w-7 h-7 sm:w-9 sm:h-8" />
        </button>
        <a
          href="https://www.microsoft.com/edge"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 sm:p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          <img src={edgeIcon} alt="Edge" className="w-5 h-5 sm:w-7 sm:h-7" />
        </a>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1 sm:p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          <img src={chromeIcon} alt="Chrome" className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div>

      {/* Mobile Toggle Button */}
      <div
        className="md:hidden ml-2 sm:ml-4 cursor-pointer p-1 sm:p-2 hover:bg-gray-300 rounded-lg transition-all duration-200"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      </div>

      {/* App Icons (Mobile) */}
      {showMobileMenu && (
        <div className="md:hidden absolute bottom-14 left-0 w-full bg-gray-200 flex flex-col items-start p-2 sm:p-3 shadow-lg transition-all duration-200">
          <button
            onClick={onExplorerToggle}
            className={`p-2 hover:bg-gray-300 rounded-lg w-full text-left flex items-center space-x-2 text-sm ${location.pathname === "/explorer" ? "border-b-2 border-blue-500" : ""}`}
          >
            <img src={folderIcon} alt="Explorer" className="w-6 h-6" />
            <span>Explorer</span>
          </button>
          <button
            onClick={onTerminalToggle}
            className={`p-2 hover:bg-gray-300 rounded-lg w-full text-left flex items-center space-x-2 text-sm ${location.pathname === "/terminal" ? "border-b-2 border-blue-500" : ""}`}
          >
            <img src={terminalIcon} alt="Terminal" className="w-7 h-7" />
            <span>Terminal</span>
          </button>
          <a
            href="https://www.microsoft.com/edge"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-300 rounded-lg w-full text-left flex items-center space-x-2 text-sm"
          >
            <img src={edgeIcon} alt="Edge" className="w-5 h-5" />
            <span>Edge</span>
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-300 rounded-lg w-full text-left flex items-center space-x-2 text-sm"
          >
            <img src={chromeIcon} alt="Chrome" className="w-6 h-6" />
            <span>Chrome</span>
          </a>
        </div>
      )}

      {/* System Icons */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4 px-1 sm:px-2">
        <Volume2 className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer hover:text-gray-600 transition-colors duration-150" />
        <Wifi className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer hover:text-gray-600 transition-colors duration-150" />
        <FaBatteryHalf className="w-4 h-4 sm:w-6 sm:h-6 cursor-pointer hover:text-green-400 transition-colors duration-150" />
        <div className="text-xs sm:text-sm text-black text-right">
          <div>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          <div>{currentTime.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;