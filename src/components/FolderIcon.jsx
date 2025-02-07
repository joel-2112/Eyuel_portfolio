import React from 'react';
import { FileText, Download, Music, Image, Video, Folder } from 'lucide-react';

const FolderIcon = ({ name }) => {
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

export default FolderIcon;