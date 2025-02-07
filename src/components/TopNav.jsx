import React from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

const TopNav = ({ currentPath }) => {
    return (
        <div className="bg-white px-4 py-2 border-b flex items-center space-x-4 shadow-sm">
            <button className="p-2 rounded-md hover:bg-gray-200">
                <ArrowLeft className="text-gray-500 w-5 h-5" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200">
                <ArrowRight className="text-gray-500 w-5 h-5" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-200">
                <RotateCcw className="text-gray-500 w-5 h-5" />
            </button>
            <span className="ml-4 text-gray-700 text-sm truncate">{currentPath}</span>
        </div>
    );
};

export default TopNav;
