import React from "react";
import FullFolder from "../assets/FullFolder.png";
import Folder from "../assets/Folder.png";
import { FileText } from "lucide-react";

const Content = ({ currentPath, onFolderClick, folderStructure }) => {
    const getIcon = (type) => {
        return type === "folder" ? (
            <img src={FullFolder} alt="Folder" className="w-16 h-20" />
        ) : (
            <FileText className="w-16 h-16 text-blue-500" />
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
            <div className="grid grid-cols-6 gap-0 flex-wrap">
                {currentFolderContents.map((item) => (
                    <div
                        key={item.name}
                        className="flex w-[120px] h-[120px] flex-col items-center justify-center hover:bg-blue-100 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                    >
                        {getIcon(item.type)}
                        <span className="text-xs text-gray-700 truncate mt-2 text-center w-full">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;
