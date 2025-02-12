import React, { useState } from "react";
import { ChevronDown, ChevronRight, FileText, ImageIcon, File, FileType2 } from "lucide-react";
import FolderIcon from "./FolderIcon";
import { FaFilePdf } from "react-icons/fa";

const Sidebar = ({ currentPath, onFolderClick, folderStructure }) => {
    const [expandedFolders, setExpandedFolders] = useState({});

    // Toggle expand/collapse of folders
    const toggleExpand = (path) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    // Get the appropriate icon for files
    const getFileIcon = (name) => {
        if (name.endsWith(".pdf")) {
            return <FaFilePdf className="w-4 h-4 text-red-500" />;
        } else if (name.endsWith(".jpg") || name.endsWith(".png")) {
            return <ImageIcon className="w-4 h-4 text-blue-500" />;
        } else if (name.endsWith(".txt")) {
            return <FileType2 className="w-4 h-4 text-blue-500" />;
        } else {
            return <ImageIcon className="w-4 h-4 text-blue-500" />;
        }
    };

    // Recursively render folders and their children
    const renderFolder = (folder, path) => {
        const isExpanded = expandedFolders[path];
        const isCurrent = currentPath === path;

        return (
            <div key={path} className="ml-2">
                <div
                    className={`flex items-center cursor-pointer px-2 py-1 rounded-md transition-colors duration-200 ${
                        isCurrent
                            ? "bg-blue-100 text-blue-900"
                            : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => {
                        if (folder.type === "folder") {
                            onFolderClick(path); // Notify parent component about folder click
                            if (folder.children?.length > 0) {
                                toggleExpand(path); // Toggle expand/collapse if folder has children
                            }
                        } else if (folder.type === "file" && folder.path) {
                            window.open(folder.path, "_blank"); // Open file in a new tab
                        }
                    }}
                >
                    {folder.type === "folder" && folder.children?.length > 0 ? (
                        isExpanded ? (
                            <ChevronDown className="w-4 h-4 mr-2" />
                        ) : (
                            <ChevronRight className="w-4 h-4 mr-2" />
                        )
                    ) : (
                        <span className="w-4 h-4 mr-2" />
                    )}
                    {folder.type === "folder" ? (
                        <FolderIcon name={folder.name} />
                    ) : (
                        getFileIcon(folder.name)
                    )}
                    <span className="ml-2 truncate">{folder.name}</span>
                </div>
                {isExpanded &&
                    folder.children?.length > 0 &&
                    folder.children.map((child) =>
                        renderFolder(child, `${path}/${child.name}`)
                    )}
            </div>
        );
    };

    return (
        <div className="w-64 bg-white h-full p-4 border-r overflow-y-auto">
            {folderStructure.map((folder) =>
                renderFolder(folder, folder.name)
            )}
        </div>
    );
};

export default Sidebar;