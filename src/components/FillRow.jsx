import React from 'react';
import FolderIcon from './FolderIcon';

const FileRow = ({ name, status, type, platform, createdAt, updatedAt }) => (
    <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-gray-600 ">
        <div className=" flex items-center">
            <FolderIcon name={name} />
            <span>{name}</span>
        </div>
        <span>{status}</span>
        <span>{type}</span>
        <span>{platform}</span>
        <span>{createdAt}</span>
    </div>
);

export default FileRow;