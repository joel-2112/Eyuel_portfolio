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
  className,
}) => {
  const pathParts = currentPath.split("/");

  return (
    <div
      className={`bg-gray-200 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 flex items-center justify-between border-b border-gray-300 shadow-sm transition-all duration-200 ${className}`}
    >
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        <button
          className="p-1 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNavigateBack}
          disabled={pathParts.length <= 1}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          className="p-1 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onNavigateForward}
          disabled={pathParts.length <= 1}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          className="p-1 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150"
          onClick={onRefresh}
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4 text-gray-700 text-xs sm:text-sm lg:text-base truncate flex-1">
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <span
                className="cursor-pointer hover:text-blue-600 hover:underline transition-colors duration-150 truncate max-w-[100px] sm:max-w-[150px] lg:max-w-[200px]"
                onClick={() => onPathClick(pathParts.slice(0, index + 1).join("/"))}
                title={part} // Tooltip for long paths
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
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          className="p-1 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150"
          onClick={onMinimize}
        >
          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          className="p-1 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150"
          onClick={onMaximize}
        >
          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          className="p-1 sm:p-2 rounded-md hover:bg-red-500 hover:text-white text-gray-600 transition-colors duration-150"
          onClick={onClose}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopNav;