import React from "react";
import FullFolder from "../assets/FullFolder.png";
import { FileText, ImageIcon, File, FileType2 } from "lucide-react";

const Content = ({ currentPath, onFolderClick, folderStructure }) => {
    // Helper function to get the appropriate icon based on file type
    const getIcon = (item) => {
        if (item.type === "folder") {
            return <img src={FullFolder} alt="Folder" className="w-16 h-20" />;
        } else if (item.name.endsWith(".pdf")) {
            return <FileText className="w-16 h-16 text-red-500" />;
        } else if (item.name.endsWith(".jpg") || item.name.endsWith(".png")) {
            return <ImageIcon className="w-16 h-16 text-green-500" />;
        } else if (item.name.endsWith(".txt")) {
            return <FileType2 className="w-16 h-16 text-blue-500" />;
        } else {
            return <File className="w-16 h-16 text-gray-500" />;
        }
    };

    // Handle item click (folder or file)
    const handleItemClick = (item) => {
        if (item.type === "folder" && onFolderClick) {
            onFolderClick(`${currentPath}/${item.name}`); // Notify parent component about folder click
        } else if (item.type === "file" && item.path) {
            // Open file in a new tab or download it
            window.open(item.path, "_blank");
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {currentFolderContents.map((item) => (
                    <div
                        key={item.name}
                        className="flex flex-col items-center justify-center p-2 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors duration-200"
                        onClick={() => handleItemClick(item)}
                    >
                        <div className="w-16 h-20 flex items-center justify-center">
                            {getIcon(item)}
                        </div>
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