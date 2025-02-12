import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import Content from "../components/content";
import { folderStructure } from "../data/FolderStructure";

const Explorer = ({ onClose,newPath }) => {
  const [currentPath, setCurrentPath] = useState("This PC");
  const [history, setHistory] = useState(["This PC"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [windowPosition, setWindowPosition] = useState({ x: 100, y: 100 });

  const taskbarHeight = 48; // Height of the Taskbar

  // Set initial position to avoid overlapping with the Taskbar
  useEffect(() => {
    const initialY = window.innerHeight - windowSize.height - taskbarHeight;
    setWindowPosition({ x: 100, y: initialY > 0 ? initialY : 0 });
  }, []);

  // Handle folder click in the sidebar
  const handleFolderClick = (path) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  // Handle back navigation
  const handleNavigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  // Handle forward navigation
  const handleNavigateForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  // Handle refresh
const handleRefresh = () => {
    // Create new history entry with same path to trigger refresh
    const newHistory = [...history];
    newHistory.push(currentPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Reset current path and re-fetch content
    setCurrentPath("");
    setTimeout(() => {
      setCurrentPath(currentPath);
    }, 100);
  };

  // Handle breadcrumb path click
  const handlePathClick = (path) => {
    const newIndex = history.indexOf(path);
    if (newIndex !== -1) {
      setHistoryIndex(newIndex);
      setCurrentPath(path);
    }
  };

  // Handle minimize
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  // Handle maximize
  const handleMaximize = () => {
    if (isMaximized) {
      // Restore to default size and position
      setWindowSize({ width: 800, height: 600 });
      setWindowPosition({ x: 100, y: 100 });
    } else {
      // Maximize to full screen, accounting for the Taskbar height
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight,
      });
      setWindowPosition({ x: 0, y: 0 });
    }
    setIsMaximized((prev) => !prev);
  };

  // Handle close
  const handleClose = () => {
    onClose();
  };

  // If minimized, don't render the window
  if (isMinimized) {
    return null;
  }

  return (
    <Rnd
      size={{ width: windowSize.width, height: windowSize.height }}
      position={{ x: windowPosition.x, y: windowPosition.y }}
      onDragStop={(e, d) => setWindowPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        setWindowSize({
          width: ref.style.width,
          height: ref.style.height,
        });
        setWindowPosition(position);
      }}
      minWidth={100}
      minHeight={100}
      bounds="parent" // Restrict dragging within the parent container
      enableResizing={!isMaximized} // Disable resizing when maximized
      dragHandleClassName="drag-handle" // Specify the drag handle class name
      className="z-50" // Ensure the window is above other elements
    >
      <div className="flex flex-col h-full bg-white text-gray-900 overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          currentPath={currentPath}
          onNavigateBack={handleNavigateBack}
          onNavigateForward={handleNavigateForward}
          onRefresh={handleRefresh}
          onPathClick={handlePathClick}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
          className="drag-handle" // Add the drag handle class to the TopNav
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar
            currentPath={currentPath}
            onFolderClick={handleFolderClick}
            folderStructure={folderStructure}
          />

          {/* Content Grid */}
          <div className="p-4">
            <Content
             newPath={newPath}
              currentPath={currentPath}
              onFolderClick={handleFolderClick}
              folderStructure={folderStructure}
            />
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default Explorer;