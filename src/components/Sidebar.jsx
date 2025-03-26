import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, ImageIcon } from "lucide-react";
import FolderIcon from "./FolderIcon";
import { FaFilePdf } from "react-icons/fa";

const Sidebar = ({ currentPath, onFolderClick, folderStructure }) => {
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleExpand = (path) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const getFileIcon = (name) => {
    if (name.endsWith(".pdf")) {
      return <FaFilePdf className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />;
    } else if (name.endsWith(".jpg") || name.endsWith(".png")) {
      return <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />;
    } else if (name.endsWith(".txt")) {
      return <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />;
    } else {
      return <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />;
    }
  };

  const renderFolder = (folder, path) => {
    const isExpanded = expandedFolders[path];
    const isCurrent = currentPath === path;

    return (
      <div key={path} className="ml-1 sm:ml-2">
        <div
          className={`flex items-center cursor-pointer px-2 sm:px-3 py-1 sm:py-1.5 rounded-md transition-colors duration-200 ${
            isCurrent
              ? "bg-blue-100 text-blue-900 font-medium"
              : "hover:bg-gray-200 text-gray-700"
          }`}
          onClick={() => {
            if (folder.type === "folder") {
              onFolderClick(path);
              if (folder.children?.length > 0) {
                toggleExpand(path);
              }
            } else if (folder.type === "file" && folder.path) {
              window.open(folder.path, "_blank");
            }
          }}
        >
          {folder.type === "folder" && folder.children?.length > 0 ? (
            isExpanded ? (
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-600" />
            ) : (
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-gray-600" />
            )
          ) : (
            <span className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          )}
          {folder.type === "folder" ? (
            <FolderIcon name={folder.name} className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            getFileIcon(folder.name)
          )}
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm lg:text-base truncate">
            {folder.name}
          </span>
        </div>
        {isExpanded && folder.children?.length > 0 && (
          <div className="ml-2 sm:ml-4">
            {folder.children.map((child) =>
              renderFolder(child, `${path}/${child.name}`)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gray-50 p-2 sm:p-3 lg:p-4 border-r border-gray-200 overflow-y-auto transition-all duration-200">
      {folderStructure.map((folder) => renderFolder(folder, folder.name))}
    </div>
  );
};

export default Sidebar;