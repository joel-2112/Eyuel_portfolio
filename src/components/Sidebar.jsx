import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FileText, Music, Image, Video, Download } from 'lucide-react';

const folderStructure = [
    {
        name: 'Quick access',
        type: 'folder',
        children: [],
    },
    {
        name: 'OneDrive',
        type: 'folder',
        children: [],
    },
    {
        name: 'This PC',
        type: 'folder',
        children: [
            {
                name: 'Desktop',
                type: 'folder',
                children: [
                    { name: '3d_portfolio', type: 'folder', children: [] },
                    { name: 'apps', type: 'folder', children: [] },
                    { name: 'cloned', type: 'folder', children: [] },
                    { name: 'portfolio', type: 'folder', children: [] },
                    { name: 'projects', type: 'folder', children: [] },
                    { name: 'webapps', type: 'folder', children: [] },
                ],
            },
            { name: 'Documents', type: 'folder', children: [] },
            { name: 'Downloads', type: 'folder', children: [] },
            { name: 'Music', type: 'folder', children: [] },
            { name: 'Pictures', type: 'folder', children: [] },
            { name: 'Videos', type: 'folder', children: [] },
        ],
    },
    { name: 'Network', type: 'folder', children: [] },
];

const Sidebar = () => {
    const [expandedFolders, setExpandedFolders] = useState({});

    const toggleExpand = (path) => {
        setExpandedFolders((prev) => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    const getIcon = (name) => {
        switch (name) {
            case 'Documents':
                return <FileText className="w-4 h-4 text-blue-500 mr-2" />;
            case 'Downloads':
                return <Download className="w-4 h-4 text-blue-500 mr-2" />;
            case 'Music':
                return <Music className="w-4 h-4 text-green-500 mr-2" />;
            case 'Pictures':
                return <Image className="w-4 h-4 text-purple-500 mr-2" />;
            case 'Videos':
                return <Video className="w-4 h-4 text-red-500 mr-2" />;
            default:
                return <Folder className="w-4 h-4 text-yellow-500 mr-2" />;
        }
    };

    const renderFolder = (folder, path) => {
        const isExpanded = expandedFolders[path];

        return (
            <div className="ml-4">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => toggleExpand(path)}
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
                    {getIcon(folder.name)}
                    <span>{folder.name}</span>
                </div>
                {isExpanded && folder.children.length > 0 && (
                    <div className="ml-4">
                        {folder.children.map((child, index) =>
                            renderFolder(child, `${path}/${child.name}`)
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-64 bg-white text-black h-full p-4 border-r border-gray-300">
            <h2 className="text-xl font-bold mb-4">Sidebar</h2>
            {folderStructure.map((folder, index) =>
                renderFolder(folder, folder.name)
            )}
        </div>
    );
};

export default Sidebar;
