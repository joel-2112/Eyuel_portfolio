import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import FolderIcon from "./FolderIcon";

const Sidebar = ({ currentPath, onFolderClick, folderStructure }) => {
    const [expandedFolders, setExpandedFolders] = useState({});

    // Toggle expand/collapse of folders
    const toggleExpand = (path) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    // Recursively render folders and their children
    const renderFolder = (folder, path) => {
        const isExpanded = expandedFolders[path];

        return (
            <div key={path} className="ml-2">
                <div
                    className={`flex items-center cursor-pointer px-2 py-1 rounded-md ${
                        currentPath === path ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => {
                        onFolderClick(path); // Notify parent component about folder click
                        if (folder.children?.length > 0) {
                            toggleExpand(path); // Toggle expand/collapse if folder has children
                        }
                    }}
                >
                    {folder.children?.length > 0 ? (
                        isExpanded ? (
                            <ChevronDown className="w-4 h-4 mr-2" />
                        ) : (
                            <ChevronRight className="w-4 h-4 mr-2" />
                        )
                    ) : (
                        <span className="w-4 h-4 mr-2" />
                    )}
                    <FolderIcon name={folder.name} />
                    <span>{folder.name}</span>
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
        <div className="w-64 bg-white h-full p-4 border-r shadow-lg overflow-y-auto">
            {folderStructure.map((folder) =>
                renderFolder(folder, folder.name)
            )}
        </div>
    );
};

export default Sidebar;