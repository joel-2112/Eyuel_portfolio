import React from "react";
import { CheckCircle, XCircle, Folder, FileText } from "lucide-react";
import Taskbar from "../components/Taskbar";
import Sidebar from "../components/Sidebar";

// New TopNav component for folder navigation
const TopNav = () => {
    return (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-300 border-b border-gray-400">
            <div className="flex items-center space-x-2">
                <button className="px-2 py-1 bg-white rounded shadow hover:bg-gray-200">
                    Back
                </button>
                <button className="px-2 py-1 bg-white rounded shadow hover:bg-gray-200">
                    Forward
                </button>
                <button className="px-2 py-1 bg-white rounded shadow hover:bg-gray-200">
                    Up
                </button>
            </div>
            <div className="flex-1 mx-4">
                <input
                    type="text"
                    className="w-full px-4 py-2 bg-white border border-gray-400 rounded shadow"
                    value="This PC > Desktop > apps"
                    readOnly
                />
            </div>
        </div>
    );
};

const FileRow = ({ name, status, type, platform, createdAt, updatedAt }) => {
    return (
        <div className="grid grid-cols-6 items-center py-2 px-4 border-b border-gray-200 hover:bg-gray-100">
            <div className="flex items-center space-x-2">
                <Folder className="text-yellow-500" />
                <span className="font-medium text-gray-700">{name}</span>
            </div>
            <div>
                {status === "success" ? (
                    <CheckCircle className="text-green-500" />
                ) : (
                    <XCircle className="text-red-500" />
                )}
            </div>
            <div className="text-gray-700">{type}</div>
            <div className="text-gray-700">{platform}</div>
            <div className="text-gray-700">{createdAt}</div>
            <div className="text-gray-700">{updatedAt}</div>
        </div>
    );
};

const Explorer = () => {
    const files = [
        { name: "Task Mate", status: "success", type: "File Folder", platform: "Web", createdAt: "5/1/2023", updatedAt: "6/1/2023" },
        { name: "Portfolio", status: "success", type: "File Folder", platform: "Web", createdAt: "4/15/2023", updatedAt: "5/20/2023" },
        { name: "Movie Plus", status: "success", type: "File Folder", platform: "Web", createdAt: "3/10/2023", updatedAt: "4/15/2023" },
        { name: "Kairos", status: "success", type: "File Folder", platform: "Web", createdAt: "2/20/2023", updatedAt: "3/22/2023" },
        { name: "Typy", status: "success", type: "File Folder", platform: "Web", createdAt: "1/29/2023", updatedAt: "2/25/2023" },
        { name: "TaskStar", status: "error", type: "File Folder", platform: "Web", createdAt: "1/29/2023", updatedAt: "2/25/2023" },
        { name: "Menu Extraction", status: "success", type: "File Folder", platform: "Web", createdAt: "1/29/2023", updatedAt: "2/25/2023" },
        { name: "Eshop", status: "success", type: "File Folder", platform: "Web", createdAt: "1/29/2023", updatedAt: "2/25/2023" },
        { name: "Eshop Backend", status: "success", type: "Backend", platform: "Backend", createdAt: "1/29/2023", updatedAt: "2/25/2023" },
        { name: "Quote Generator", status: "success", type: "File Folder", platform: "Web", createdAt: "1/29/2023", updatedAt: "2/25/2023" },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-100 text-gray-900">
            {/* Top Navigation */}
            <TopNav />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <header className="px-4 py-2 border-b border-gray-300 bg-gray-200">Projects</header>
                    <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-gray-600 border-b border-gray-300">
                        <span>Name</span>
                        <span>Status</span>
                        <span>Type</span>
                        <span>Platform</span>
                        <span>Created At</span>
                        <span>Updated At</span>
                    </div>
                    <div className="flex-1 overflow-auto">
                        {files.map((file, index) => (
                            <FileRow key={index} {...file} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
};

export default Explorer;
