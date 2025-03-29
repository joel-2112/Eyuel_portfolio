import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import Content from "../components/content";
import { folderStructure } from "../data/FolderStructure";

const Explorer = ({ onClose, newPath }) => {
  const [currentPath, setCurrentPath] = useState(newPath || "This PC");
  const [history, setHistory] = useState([newPath || "This PC"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: Math.min(800, window.innerWidth * 0.9),
    height: Math.min(600, window.innerHeight * 0.85),
  });
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });

  const taskbarHeight = 48;
  const minSidebarWidth = 150;

  useEffect(() => {
    const initialWidth = Math.min(800, window.innerWidth * 0.9);
    const initialHeight = Math.min(600, window.innerHeight * 0.85);
    const initialX = (window.innerWidth - initialWidth) / 2;
    const initialY = (window.innerHeight - initialHeight - taskbarHeight) / 2;
    setWindowSize({ width: initialWidth, height: initialHeight });
    setWindowPosition({ x: initialX > 0 ? initialX : 10, y: initialY > 0 ? initialY : 10 });
  }, []);

  const handleFolderClick = (path) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const handleNavigateBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const handleNavigateForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const handleRefresh = () => {
    const newHistory = [...history];
    newHistory.push(currentPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath("");
    setTimeout(() => setCurrentPath(currentPath), 100);
  };

  const handlePathClick = (path) => {
    const newIndex = history.indexOf(path);
    if (newIndex !== -1) {
      setHistoryIndex(newIndex);
      setCurrentPath(path);
    }
  };

  const handleMinimize = () => setIsMinimized(true);

  const handleMaximize = () => {
    if (isMaximized) {
      const restoredWidth = Math.min(800, window.innerWidth * 0.9);
      const restoredHeight = Math.min(600, window.innerHeight * 0.85);
      setWindowSize({ width: restoredWidth, height: restoredHeight });
      setWindowPosition({
        x: (window.innerWidth - restoredWidth) / 2,
        y: (window.innerHeight - restoredHeight - taskbarHeight) / 2,
      });
    } else {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
      setWindowPosition({ x: 0, y: 0 });
    }
    setIsMaximized((prev) => !prev);
  };

  const handleClose = () => onClose();

  const handleResize = () => {
    if (!isMaximized) {
      const newWidth = Math.max(minSidebarWidth + 100, Math.min(800, window.innerWidth * 0.9));
      const newHeight = Math.min(600, window.innerHeight * 0.85);
      setWindowSize({ width: newWidth, height: newHeight });
      setWindowPosition({
        x: (window.innerWidth - newWidth) / 2,
        y: (window.innerHeight - newHeight - taskbarHeight) / 2,
      });
    } else {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight });
      setWindowPosition({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMaximized]);

  if (isMinimized) return null;

  return (
    <Rnd
      size={{ width: windowSize.width, height: windowSize.height }}
      position={{ x: windowPosition.x, y: windowPosition.y }}
      onDragStop={(e, d) => setWindowPosition({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        const newWidth = parseInt(ref.style.width);
        const newHeight = parseInt(ref.style.height);
        setWindowSize({ width: newWidth, height: newHeight });
        setWindowPosition(position);
      }}
      minWidth={minSidebarWidth + 100} // Ensure sidebar + some content space
      minHeight={200}
      maxWidth="100vw"
      maxHeight={`calc(100vh - ${taskbarHeight}px)`}
      bounds="window"
      enableResizing={!isMaximized}
      dragHandleClassName="drag-handle"
      className="z-50 shadow-xl rounded-lg overflow-hidden border border-gray-300"
    >
      <div className="flex flex-col h-full bg-gray-100 text-gray-900">
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
          className="drag-handle bg-gray-200 border-b border-gray-300"
        />

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div
            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 min-w-[250px] max-w-[300px] bg-white border-r border-gray-200 overflow-y-auto transition-all duration-200"
            style={{ flexShrink: 0 }}
          >
            <Sidebar
              currentPath={currentPath}
              onFolderClick={handleFolderClick}
              folderStructure={folderStructure}
            />
          </div>

          {/* Content Grid */}
          <div className="flex-1 p-2 sm:p-3 lg:p-4 bg-white overflow-y-auto">
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