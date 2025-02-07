import React, { useState } from "react";
import { ChevronRight, ArrowLeft, ArrowRight, ArrowUp, RefreshCw } from "lucide-react";

const TopNav = ({ folderTrail = ["Home"] }) => {
  const [showPopup, setShowPopup] = useState(null);

  const handlePopupToggle = (index) => {
    setShowPopup((prev) => (prev === index ? null : index));
  };

  const handleNavigate = (action) => {
    console.log(`Navigating: ${action}`); // Replace with actual navigation logic
  };

  return (
    <div className="flex items-center px-4 py-2 bg-white border-b border-gray-300">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleNavigate("prev")}
          className="p-2 hover:bg-gray-300 rounded-lg"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => handleNavigate("next")}
          className="p-2 hover:bg-gray-300 rounded-lg"
        >
          <ArrowRight size={18} />
        </button>
        <button
          onClick={() => handleNavigate("up")}
          className="p-2 hover:bg-gray-300 rounded-lg"
        >
          <ArrowUp size={18} />
        </button>
        <button
          onClick={() => handleNavigate("refresh")}
          className="p-2 hover:bg-gray-300 rounded-lg"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Folder Trail */}
      <div className="flex items-center ml-4 gap-2 text-sm text-gray-700">
        {folderTrail.map((folder, index) => (
          <div key={index} className="flex items-center">
            <span
              onClick={() => handlePopupToggle(index)}
              className="cursor-pointer hover:text-blue-500"
            >
              {folder}
            </span>
            {index < folderTrail.length - 1 && (
              <ChevronRight className="mx-1" size={16} />
            )}

            {/* Popup for Nested Folders */}
            {showPopup === index && (
              <div className="absolute mt-8 bg-white shadow-lg border rounded-lg p-2">
                <ul className="w-48">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li
                      key={i}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log(`Navigating to nested folder ${i + 1}`)}
                    >
                      Nested Folder {i + 1}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNav;
