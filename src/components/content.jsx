import React from "react";
import { Folder, FileText } from "lucide-react";
const Content = ({ currentPath, onFolderClick, folderStructure }) => {
    const getIcon = (type) => {
        return type === "folder" ? (
            <Folder className="w-6 h-6 text-yellow-500" />
        ) : (
            <FileText className="w-6 h-6 text-blue-500" />
        );
    };

    const handleItemClick = (item) => {
        if (item.type === "folder" && onFolderClick) {
            onFolderClick(`${currentPath}/${item.name}`); // Notify parent component about folder click
        }
    };

    // Helper function to find the contents of the current folder
    const findFolderContents = (structure, path) => {
        const parts = path.split("/");
        let current = structure;

        for (const part of parts) {
            const folder = current.find((item) => item.name === part);
            if (!folder || !folder.children) return [];
            current = folder.children;
        }

        return current;
    };

    // Find the contents of the current folder
    const currentFolderContents = findFolderContents(folderStructure, currentPath);

    return (
        <div className="flex-1 bg-white p-4 overflow-y-auto">
            <div className="grid grid-cols-4 gap-4">
                {currentFolderContents.map((item) => (
                    <div
                        key={item.name}
                        className={`flex flex-col items-center p-4 bg-gray-100 rounded-md hover:shadow-lg ${
                            item.type === "folder" ? "cursor-pointer" : ""
                        }`}
                        onClick={() => handleItemClick(item)}
                    >
                        {getIcon(item.type)}
                        <span className="mt-2 text-sm text-gray-700 truncate">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;