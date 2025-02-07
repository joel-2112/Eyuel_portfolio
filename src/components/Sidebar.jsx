import React, { useState } from "react";
import { ArrowRightToLineIcon, ChevronDown, ChevronRight } from "lucide-react";
import FolderIcon from "./FolderIcon";

const Sidebar = ({ currentPath, onFolderClick }) => {
    const [expandedFolders, setExpandedFolders] = useState({});

    const toggleExpand = (path) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const renderFolder = (folder, path) => {
        const isExpanded = expandedFolders[path];

        return (
            <div key={path} className="ml-2">
                <div
                    className={`flex items-center cursor-pointer px-2 py-1 rounded-md ${
                        currentPath === path ? "bg-gray-300 text-gray-900" : "hover:bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => {
                        onFolderClick(path, folder);
                        if (folder.children.length > 0) {
                            toggleExpand(path);
                        }
                    }}
                >
                    {folder.children.length > 0 ? (
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
                    folder.children.length > 0 &&
                    folder.children.map((child) =>
                        renderFolder(child, `${path} > ${child.name}`)
                    )}
            </div>
        );
    };

    const folderStructure = [
        { name: "Quick access", type: "folder", children: [] },
        { name: "OneDrive", type: "folder", children: [] },
        {
            name: "This PC",
            type: "folder",
            children: [
                {
                    name: "Desktop",
                    type: "folder",
                    children: [
                        { name: "3d_portfolio", type: "folder", children: [] },
                        { name: "apps", type: "folder", children: [] },
                        { name: "cloned", type: "folder", children: [] },
                        { name: "portfolio", type: "folder", children: [] },
                        { name: "projects", type: "folder", children: [] },
                        { name: "webapps", type: "folder", children: [] },
                    ],
                },
                { name: "Documents", type: "folder", children: [] },
                { name: "Downloads", type: "folder", children: [] },
                { name: "Music", type: "folder", children: [] },
                { name: "Pictures", type: "folder", children: [] },
                { name: "Videos", type: "folder", children: [] },
            ],
        },
        { name: "Network", type: "folder", children: [] },
    ];

    return (
        <div className="w-64 bg-white h-full p-4 border-r shadow-lg overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">File Explorer</h2>
            {folderStructure.map((folder) =>
                renderFolder(folder, folder.name)
            )}
        </div>
    );
};

export default Sidebar;
