import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, ImageIcon } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import FolderIcon from "./FolderIcon";

const Sidebar = ({ currentPath, onFolderClick, folderStructure, isMobileOpen, onCloseSidebar }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleExpand = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const getFileIcon = (name) => {
    if (name.endsWith(".pdf")) return <FaFilePdf className="w-4 h-4 text-red-500" />;
    if (name.endsWith(".jpg") || name.endsWith(".png")) return <ImageIcon className="w-4 h-4 text-blue-500" />;
    if (name.endsWith(".txt")) return <FileText className="w-4 h-4 text-gray-600" />;
    return <ImageIcon className="w-4 h-4 text-blue-500" />;
  };

  const renderFolder = (folder, path) => {
    const isExpanded = expandedFolders[path];
    const isCurrent = currentPath === path;

    return (
      <div key={path} className="ml-1 sm:ml-2">
        <div
          className={`flex items-center cursor-pointer px-2 py-1 rounded-md transition-colors duration-200 ${
            isCurrent ? "bg-blue-100 text-blue-900 font-medium" : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            if (folder.type === "folder") {
              onFolderClick(path);
              if (folder.children?.length > 0) toggleExpand(path);
            } else if (folder.type === "file" && folder.path) {
              window.open(folder.path, "_blank");
            }
          }}
        >
          {folder.type === "folder" && folder.children?.length > 0 ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-2 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-2 text-gray-600" />
            )
          ) : (
            <span className="w-4 h-4 mr-2" />
          )}
          {folder.type === "folder" ? (
            <FolderIcon name={folder.name} className="w-5 h-5" />
          ) : (
            getFileIcon(folder.name)
          )}
          <span className="ml-2 text-sm truncate">{folder.name}</span>
        </div>
        {isExpanded && folder.children?.length > 0 && (
          <div className="ml-4">{folder.children.map((child) => renderFolder(child, `${path}/${child.name}`))}</div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileOpen ? "block" : "hidden"}`}
        onClick={onCloseSidebar}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full lg:w-64 w-64 bg-gray-50 p-3 border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:w-full sm:p-3 sm:border-r sm:z-0 overflow-y-auto`}
      >
        {folderStructure.map((folder) => renderFolder(folder, folder.name))}
      </div>
    </>
  );
};

export default Sidebar;
