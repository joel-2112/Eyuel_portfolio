import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import FolderIcon from './FolderIcon';

const FolderItem = ({ folder, path, onFolderClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        onFolderClick(folder, path);
    };

    return (
        <div className="ml-4" key={path}>
            <div
                className="flex items-center cursor-pointer"
                onClick={toggleExpand}
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
                <FolderIcon name={folder.name} />
                <span>{folder.name}</span>
            </div>
            {isExpanded && folder.children.length > 0 && (
                <div className="ml-4">
                    {folder.children.map((child) => (
                        <FolderItem
                            key={`${path}/${child.name}`}
                            folder={child}
                            path={`${path}/${child.name}`}
                            onFolderClick={onFolderClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FolderItem;