import React from "react";
import { Folder, FileText } from "lucide-react";

const Content = ({ currentFolder }) => {
    const getIcon = (type) => {
        return type === "folder" ? (
            <Folder className="w-6 h-6 text-yellow-500" />
        ) : (
            <FileText className="w-6 h-6 text-blue-500" />
        );
    };

    return (
        <div className="flex-1 bg-white p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{currentFolder.name}</h2>
            <div className="grid grid-cols-4 gap-4">
                {currentFolder.children.map((item) => (
                    <div
                        key={item.name}
                        className="flex flex-col items-center p-4 bg-gray-100 rounded-md hover:shadow-lg"
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
