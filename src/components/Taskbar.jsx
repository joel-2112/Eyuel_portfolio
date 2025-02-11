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
  const [showStartMenu, setShowStartMenu] = useState(false); // State for Start Menu visibility
  const [selectedNav, setSelectedNav] = useState("all"); // State for selected navigation link
  const location = useLocation();
  const startMenuRef = useRef(null); // Ref for the Start Menu modal
  const searchInputRef = useRef(null); // Ref for the search input
  const suggestionsRef = useRef(null); // Ref for the suggestions dropdown

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle Start Menu toggle
  const toggleStartMenu = () => {
    setShowStartMenu((prev) => !prev);
  };

  // Handle navigation link click
  const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };

  // Render content based on selected navigation
  const renderContent = () => {
    switch (selectedNav) {
      case "all":
        return <AllContent />;
      case "skills":
        return <Skills />;
      case "tools":
        return <Tools />;
      default:
        return <AllContent />;
    }
  };

  // Close Start Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target) &&
        !event.target.closest(".start-button") // Ensure the Start button doesn't close the modal
      ) {
        setShowStartMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle clicks outside the suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        !searchInputRef.current.contains(event.target) // Ensure the search input doesn't close the dropdown
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // List of search suggestions
  const searchSuggestions = [
    {
      name: "YouTube",
      icon: <FaYoutube className="w-5 h-5 text-red-600" />,
      url: "https://youtube.com",
    },
    {
      name: "DeepSeek",
      icon: <SiOpenaigym className="w-5 h-5 text-blue-500" />,
      url: "https://deepseek.com",
    },
    {
      name: "ChatGPT",
      icon: <SiOpenai className="w-5 h-5 text-green-500" />,
      url: "https://chat.openai.com",
    },
    {
      name: "GitHub Copilot",
      icon: <SiGithubcopilot className="w-5 h-5 text-blue-500" />,
      url: "https://copilot.github.com",
    },
    {
      name: "Google",
      icon: <FaGoogle className="w-5 h-5 text-blue-500" />,
      url: "https://google.com",
    },
    {
      name: "Telegram",
      icon: <SiTelegram className="w-5 h-5 text-blue-400" />,
      url: "https://telegram.org",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="w-5 h-5 text-blue-600" />,
      url: "https://linkedin.com",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="w-5 h-5 text-blue-400" />,
      url: "https://twitter.com",
    },
    {
      name: "Figma",
      icon: <SiFigma className="w-5 h-5 text-purple-600" />,
      url: "https://figma.com",
    },
  ];

  return (
    <div className="fixed bottom-0 w-full h-12 bg-gray-200 flex items-center px-4 text-black shadow-lg border-gray-300">
      {/* Start Button */}
      <div
        className="flex items-center cursor-pointer p-2 hover:bg-gray-300 rounded-lg start-button"
        onClick={toggleStartMenu}
      >
        <img src={start} alt="Start" className="w-5 h-5" />
      </div>

      {/* Start Menu Modal */}
      {showStartMenu && (
        <div
          ref={startMenuRef}
          className="absolute bottom-12 left-1 w-[90vw] sm:w-[500px] bg-white max-h-[400px] overflow-hidden rounded-t-lg shadow-lg"
        >
          {/* Top Navigation Links */}
          <div className="flex justify-around p-2 border-b">
            <button
              className={`p-2 hover:bg-gray-200 rounded ${
                selectedNav === "all" ? "font-bold" : ""
              }`}
              onClick={() => handleNavClick("all")}
            >
              All
            </button>
            <button
              className={`p-2 hover:bg-gray-200 rounded ${
                selectedNav === "skills" ? "font-bold" : ""
              }`}
              onClick={() => handleNavClick("skills")}
            >
              Skills
            </button>
            <button
              className={`p-2 hover:bg-gray-200 rounded ${
                selectedNav === "tools" ? "font-bold" : ""
              }`}
              onClick={() => handleNavClick("tools")}
            >
              Tools
            </button>
          </div>

          {/* Bottom Content Section - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(400px-48px)] p-4">
            {renderContent()}
          </div>
        </div>
      )}

      {/* Search Field */}
      <div className="relative ml-4 flex justify-center border-t items-center bg-white rounded-sm flex-grow h-12 max-w-xs">
        <Search className="mx-2 text-gray-500" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Type here to search"
          className="bg-transparent outline-none placeholder-gray-400 text-sm text-black w-full h-full"
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute left-0 bottom-11 bg-white text-gray-900 rounded-sm shadow-lg p-2 w-full"
          >
            <p className="text-center font-semibold mb-2">Most Important Links</p>
            <hr className="mb-2" />
            <ul>
              {searchSuggestions.map((suggestion, index) => (
                <li key={index}>
                  <a
                    href={suggestion.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    {suggestion.icon}
                    <span>{suggestion.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* App Icons (Desktop) */}
      <div className="hidden md:flex gap-3 ml-4 py-1">
        <button
          onClick={onExplorerToggle}
          className={`p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
            location.pathname === "/explorer" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <img src={folderIcon} alt="Explorer" className="w-8 h-8" />
        </button>

        <button
          onClick={onTerminalToggle}
          className={`p-2 rounded-lg bg-transparent hover:bg-gray-300 transition-colors duration-200 cursor-pointer ${
            location.pathname === "/terminal" ? "border-b-2 border-blue-500" : ""
          }`}
        >
          <img src={terminalIcon} alt="Terminal" className="w-9 h-8" />
        </button>

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

      {/* Mobile Toggle Button */}
      <div
        className="md:hidden ml-4 cursor-pointer p-2 hover:bg-gray-300 rounded-lg"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu className="w-6 h-6" />
      </div>

      {/* App Icons (Mobile - Hidden by default) */}
      {showMobileMenu && (
        <div className="md:hidden absolute bottom-12 left-0 w-full bg-gray-200 flex flex-col items-start p-2 shadow-lg">
          <button
            onClick={onExplorerToggle}
            className={`p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer w-full text-left ${
              location.pathname === "/explorer" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <img src={folderIcon} alt="Explorer" className="w-8 h-8 inline-block" />
            <span className="ml-2">Explorer</span>
          </button>

          <button
            onClick={onTerminalToggle}
            className={`p-2 rounded-lg bg-transparent hover:bg-gray-300 transition-colors duration-200 cursor-pointer w-full text-left ${
              location.pathname === "/terminal" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <img src={terminalIcon} alt="Terminal" className="w-9 h-8 inline-block" />
            <span className="ml-2">Terminal</span>
          </button>

          <a
            href="https://www.microsoft.com/edge"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer w-full text-left"
          >
            <img src={edgeIcon} alt="Edge" className="w-7 h-7 inline-block" />
            <span className="ml-2">Edge</span>
          </a>

          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-transparent rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer w-full text-left"
          >
            <img src={chromeIcon} alt="Chrome" className="w-8 h-8 inline-block" />
            <span className="ml-2">Chrome</span>
          </a>
        </div>
      )}

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