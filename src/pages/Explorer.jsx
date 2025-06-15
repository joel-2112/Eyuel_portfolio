import React, { useState, useEffect, useCallback } from "react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: Math.min(800, window.innerWidth * 0.9),
    height: Math.min(600, window.innerHeight * 0.85),
  });
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const [preMaximizedState, setPreMaximizedState] = useState(null); // Store size/position before maximizing

  const taskbarHeight = 48;

  const handleFolderClick = useCallback((path) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
    setIsSidebarOpen(false);
  }, [history, historyIndex]);

  const handleNavigateBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleNavigateForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleRefresh = useCallback(() => {
    setCurrentPath(history[historyIndex]);
  }, [history, historyIndex]);

  const handlePathClick = useCallback((path) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  }, [history, historyIndex]);

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      // Restore to previous size and position
      if (preMaximizedState) {
        setWindowSize(preMaximizedState.size);
        setWindowPosition(preMaximizedState.position);
      }
      setIsMaximized(false);
      setPreMaximizedState(null);
    } else {
      // Save current size and position before maximizing
      setPreMaximizedState({
        size: { ...windowSize },
        position: { ...windowPosition },
      });
      // Set to full-screen dimensions
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight - taskbarHeight,
      });
      setWindowPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  }, [isMaximized, windowSize, windowPosition, taskbarHeight]);

  const handleResizeWindow = useCallback(() => {
    if (!isMaximized) {
      const newWidth = Math.max(300, Math.min(800, window.innerWidth * 0.9));
      const newHeight = Math.min(600, window.innerHeight * 0.85);
      setWindowSize({ width: newWidth, height: newHeight });
      setWindowPosition({
        x: (window.innerWidth - newWidth) / 2,
        y: (window.innerHeight - newHeight - taskbarHeight) / 2,
      });
    }
  }, [isMaximized, taskbarHeight]);

  useEffect(() => {
    const initialWidth = Math.max(300, Math.min(800, window.innerWidth * 0.9));
    const initialHeight = Math.min(600, window.innerHeight * 0.85);
    const initialX = (window.innerWidth - initialWidth) / 2;
    const initialY = (window.innerHeight - initialHeight - taskbarHeight) / 2;
    setWindowSize({ width: initialWidth, height: initialHeight });
    setWindowPosition({ x: initialX > 0 ? initialX : 10, y: initialY > 0 ? initialY : 10 });

    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, [handleResizeWindow]);

  const isDesktop = window.innerWidth >= 640;

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
      minWidth={300}
      minHeight={200}
      maxWidth={window.innerWidth}
      maxHeight={window.innerHeight - taskbarHeight}
      bounds="window"
      enableResizing={isDesktop && !isMaximized}
      disableDragging={isMaximized || !isDesktop}
      dragHandleClassName="drag-handle"
      className={`z-50 shadow-xl rounded-lg overflow-hidden border border-gray-300 ${isMaximized ? "rounded-none" : ""}`}
    >
      <div className="flex flex-col h-full bg-gray-100 text-gray-900">
        <TopNav
          currentPath={currentPath}
          onNavigateBack={handleNavigateBack}
          onNavigateForward={handleNavigateForward}
          onRefresh={handleRefresh}
          onPathClick={handlePathClick}
          onMinimize={() => setIsMinimized(true)}
          onMaximize={handleMaximize}
          onClose={onClose}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < history.length - 1}
          isMaximized={isMaximized}
          className="drag-handle bg-gray-200 border-b border-gray-300"
        />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            currentPath={currentPath}
            onFolderClick={handleFolderClick}
            folderStructure={folderStructure}
            isMobileOpen={isSidebarOpen}
            onCloseSidebar={() => setIsSidebarOpen(false)}
          />
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