import React, { useState } from "react";
import Taskbar from "../components/Taskbar";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import Content from "../components/content";

const Explorer = () => {
    const [currentPath, setCurrentPath] = useState("This PC");
    const [currentFolder, setCurrentFolder] = useState({
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
    });

    const handleFolderClick = (path, folder) => {
        setCurrentPath(path);
        setCurrentFolder(folder);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                currentPath={currentPath}
                onFolderClick={handleFolderClick}
            />
            <div className="flex-1 flex flex-col">
                <TopNav currentPath={currentPath} />
                <Content currentFolder={currentFolder} />
            </div>
            <Taskbar/>
        </div>
    );
};

export default Explorer;

