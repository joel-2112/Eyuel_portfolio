import React, { useState } from "react";
import Taskbar from "../components/Taskbar";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import Content from "../components/content"; // Ensure this import is correct

const Explorer = () => {
    const [currentPath, setCurrentPath] = useState("This PC"); // Initial path
    const [history, setHistory] = useState(["This PC"]); // Navigation history
    const [historyIndex, setHistoryIndex] = useState(0); // Current position in history

    // Nested folder structure
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
                        {
                             name: "Projects",
                              type: "folder", 
                              children: [
                                {
                                    name: "Web Apps",
                                     type: "folder", 
                                     children: [
                                        {
                                            name: "EthioExplore",
                                             type: "folder", 
                                             children: [
                                                
                                                {
                                                    name: "Doc",
                                                     type: "file", 
                                                   
                                                },
                                                {
                                                    name: "Live View",
                                                     type: "file", 
                                                    
                                                },
                                                {
                                                    name: "Github",
                                                     type: "file", 
                                                    
                                                },
                                             ]
                                        },
                                     ]
                                },
                                {
                                    name: "Mobile Apps",
                                     type: "folder", 
                                     children: [
                                       
                                     ]
                                },
                              ]
                         },
                        { name: "Contacts", type: "folder", children: [] },
                        { name: "hobbies.txt", type: "file" },
                    ],
                },
                {
                    name: "Documents",
                    type: "folder",
                    children: [
                        {
                              name: "Important",
                              type: "folder", 
                              children: [
                                { name: "Resume.pdf", type: "file",children: [] },
                                { name: "Eyuel_cv.pdf", type: "file", },
                                { name: "Recomm.pdf", type: "file",children: [] },
                                { name: "Tempo.pdf", type: "file", },
                                { name: "Application.pdf", type: "file", },
                              ] 
                            },
                            {
                             name: "Certificates",
                              type: "folder", 
                              children: [
                                { name: "React.pdf", type: "file", },
                                { name: "Python.pdf", type: "file", },
                                { name: "cyber.pdf", type: "file", },
                                { name: "Dart.pdf", type: "file", },
                                { name: "Node.pdf", type: "file", },
                              ]
                             },
                            {
                             name: "References",
                              type: "folder", 
                              children: [
                                { name: "React.pdf", type: "file", },
                                { name: "Python.pdf", type: "file", },
                                { name: "security.pdf", type: "file", },
                                { name: "Dart.pdf", type: "file", },
                                { name: "Node.pdf", type: "file", },
                              ]
                             },
                        // { name: "notes.txt", type: "file" },
                    ],
                },
               
                {
                    name: "Pictures",
                    type: "folder",
                    children: [
                        { name: "Vacation", type: "folder", children: [] },
                        { name: "Family", type: "folder", children: [] },
                    ],
                },
                { name: "Music", type: "folder", children: [] },
                { name: "Videos", type: "folder", children: [] },
                { name: "example.txt", type: "file" },
            ],
        },
       
        { name: "Network", type: "folder", children: [] },
    ];

    // Handle folder click in the sidebar
    const handleFolderClick = (path) => {
        const newHistory = history.slice(0, historyIndex + 1); // Discard future history
        newHistory.push(path); // Add new path to history
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(path);
    };

    // Handle back navigation
    const handleNavigateBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
        }
    };

    // Handle forward navigation
    const handleNavigateForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
        }
    };

    // Handle refresh
    const handleRefresh = () => {
        // Reload the current path (you can add logic to refetch data if needed)
        console.log("Refreshing:", currentPath);
    };

    // Handle breadcrumb path click
    const handlePathClick = (path) => {
        const newIndex = history.indexOf(path);
        if (newIndex !== -1) {
            setHistoryIndex(newIndex);
            setCurrentPath(path);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white text-gray-900">
            {/* Top Navigation */}
            <TopNav
                currentPath={currentPath}
                onNavigateBack={handleNavigateBack}
                onNavigateForward={handleNavigateForward}
                onRefresh={handleRefresh}
                onPathClick={handlePathClick}
            />

            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar
                    currentPath={currentPath}
                    onFolderClick={handleFolderClick}
                    folderStructure={folderStructure}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    <Content
                        currentPath={currentPath}
                        onFolderClick={handleFolderClick}
                        folderStructure={folderStructure}
                    />
                </div>
            </div>

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
};

export default Explorer;