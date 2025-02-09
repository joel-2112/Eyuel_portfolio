import React from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Minus, Maximize2, X } from "lucide-react";

const TopNav = ({
  currentPath,
  onNavigateBack,
  onNavigateForward,
  onRefresh,
  onPathClick,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  // Split the current path into parts for breadcrumb navigation
  const pathParts = currentPath.split("/");

  return (
    <div className="bg-white px-4 py-2 border-b flex items-center justify-between shadow-sm">
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        {/* Back Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={onNavigateBack}
        >
          <ArrowLeft className="text-gray-500 w-5 h-5" />
        </button>

        {/* Forward Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={onNavigateForward}
        >
          <ArrowRight className="text-gray-500 w-5 h-5" />
        </button>

        {/* Refresh Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={onRefresh}
        >
          <RotateCcw className="text-gray-500 w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 ml-4 text-gray-700 text-sm truncate">
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <span
                className="cursor-pointer hover:text-blue-500 hover:underline"
                onClick={() => onPathClick(pathParts.slice(0, index + 1).join("/"))}
              >
                {part}
              </span>
              {index < pathParts.length - 1 && (
                <span className="text-gray-400">/</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Window Controls */}
      <div className="flex items-center space-x-2">
        {/* Minimize Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={onMinimize}
        >
          <Minus className="text-gray-500 w-5 h-5" />
        </button>

        {/* Maximize Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200"
          onClick={onMaximize}
        >
          <Maximize2 className="text-gray-500 w-5 h-5" />
        </button>

        {/* Close Button */}
        <button
          className="p-2 rounded-md hover:bg-red-500 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopNav;