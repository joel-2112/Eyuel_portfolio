import React, { useCallback } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, Minus, Maximize2, Minimize2, X, Menu } from "lucide-react";

const TopNav = ({
  currentPath,
  onNavigateBack,
  onNavigateForward,
  onRefresh,
  onPathClick,
  onMinimize,
  onMaximize,
  onClose,
  onToggleSidebar,
  canGoBack,
  canGoForward,
  className,
  isMaximized = false,
}) => {
  const pathParts = currentPath.split("/").filter(Boolean);

  const handleNavigateBack = useCallback(() => {
    if (canGoBack && onNavigateBack) {
      onNavigateBack();
    }
  }, [canGoBack, onNavigateBack]);

  const handleNavigateForward = useCallback(() => {
    if (canGoForward && onNavigateForward) {
      onNavigateForward();
    }
  }, [canGoForward, onNavigateForward]);

  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const handleMaximize = useCallback(() => {
    if (onMaximize) {
      onMaximize();
    }
  }, [onMaximize]);

  return (
    <div
      className={`bg-gray-200 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 flex items-center justify-between border-b border-gray-300 shadow-sm transition-all duration-200 ${className}`}
    >
      {/* Navigation Buttons */}
      <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
        <button
          className="sm:hidden p-1.5 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          className="p-1.5 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleNavigateBack}
          disabled={!canGoBack}
          aria-label="Navigate Back"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          className="p-1.5 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleNavigateForward}
          disabled={!canGoForward}
          aria-label="Navigate Forward"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          className="p-1.5 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleRefresh}
          aria-label="Refresh"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4 text-gray-700 text-xs sm:text-sm lg:text-base truncate flex-1">
          {pathParts.length === 0 && <span className="text-gray-500">Home</span>}
          {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              <span
                className="cursor-pointer hover:text-blue-600 hover:underline transition-colors duration-150 truncate max-w-[100px] sm:max-w-[150px] lg:max-w-[200px]"
                onClick={() => onPathClick(pathParts.slice(0, index + 1).join("/"))}
                title={part}
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
          className="p-1.5 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={onMinimize}
          aria-label="Minimize"
        >
          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          className="p-1.5 sm:p-2 rounded-md hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hover:bg-green-500 lg:hover:text-white"
          onClick={handleMaximize}
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>

        <button
          className="p-1.5 sm:p-2 rounded-md hover:bg-red-500 hover:text-white text-gray-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default TopNav;