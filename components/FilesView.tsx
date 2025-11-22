
import React, { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, MoreVertical, Grid, List, Download, Share2, Clock } from 'lucide-react';

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'pdf' | 'pptx' | 'image';
    size?: string;
    modified: string;
    owner: string;
}

const FILES: FileItem[] = [
    { id: '1', name: 'Top Secret', type: 'folder', modified: '2 mins ago', owner: 'Me' },
    { id: '2', name: 'Golf Scores (Rigged)', type: 'folder', modified: 'Yesterday', owner: 'Me' },
    { id: '3', name: 'The_Wall_Blueprints_Final_v99.pdf', type: 'pdf', size: '145 MB', modified: 'Oct 20, 2024', owner: 'Jared K.' },
    { id: '4', name: 'Bibi_Summit_Presentation.pptx', type: 'pptx', size: '12 MB', modified: 'Yesterday', owner: 'Bibi' },
    { id: '5', name: 'Mamdami_Invoice_Unpaid.pdf', type: 'pdf', size: '256 KB', modified: 'Today', owner: 'Mamdami' },
    { id: '6', name: 'Space_Force_Logo_Ideas.png', type: 'image', size: '4.2 MB', modified: 'Last Week', owner: 'Melania' },
    { id: '7', name: 'Kim_Love_Letters.pdf', type: 'pdf', size: '1.2 MB', modified: 'Jan 01, 2024', owner: 'Kim J.' },
    { id: '8', name: 'Nuclear_Codes_Do_Not_Open.txt', type: 'pdf', size: '1 KB', modified: 'Just now', owner: 'Me' },
    { id: '9', name: 'The_Metaverse_Plan.pdf', type: 'pdf', size: '4 TB', modified: '10 mins ago', owner: 'Mark Z.' },
    { id: '10', name: 'Bernie_Mitten_Patterns.pdf', type: 'pdf', size: '300 KB', modified: 'Yesterday', owner: 'Bernie' },
    { id: '11', name: 'Free_Car_Voucher.pdf', type: 'pdf', size: '500 KB', modified: 'Today', owner: 'Oprah' },
    { id: '12', name: 'Soul_Contract_v666.pdf', type: 'pdf', size: '6.6 MB', modified: 'Midnight', owner: 'The Devil' },
    { id: '13', name: 'Fish_Sticks_Recipe_REMIX.pdf', type: 'pdf', size: '5 MB', modified: 'Today', owner: 'Ye' },
    { id: '14', name: 'Reputation_Taylor_Version.mp3', type: 'image', size: '10 MB', modified: '1 hour ago', owner: 'Taylor Swift' },
    { id: '15', name: 'Naughty_List_Official.pdf', type: 'pdf', size: '999 MB', modified: 'Dec 24', owner: 'Santa' },
];

const FilesView = () => {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

    const getIcon = (type: string) => {
        switch (type) {
            case 'folder': return <Folder className="h-10 w-10 text-yellow-400 fill-yellow-400" />;
            case 'pdf': return <FileText className="h-10 w-10 text-red-500" />;
            case 'pptx': return <FileText className="h-10 w-10 text-orange-500" />;
            case 'image': return <ImageIcon className="h-10 w-10 text-blue-500" />;
            default: return <FileText className="h-10 w-10 text-gray-400" />;
        }
    };

    return (
        <div className="flex-1 flex bg-white h-full">
            {/* Sidebar */}
            <div className="w-60 bg-gray-50 border-r border-gray-200 p-4">
                <button className="w-full bg-blue-600 text-white rounded py-2 font-semibold mb-6 hover:bg-blue-700 shadow-sm">New</button>
                <div className="space-y-1">
                    <div className="px-3 py-2 bg-blue-100 text-blue-700 font-medium rounded cursor-pointer">My Files</div>
                    <div className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded cursor-pointer">Recent</div>
                    <div className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded cursor-pointer">Shared</div>
                    <div className="px-3 py-2 text-gray-600 hover:bg-gray-200 rounded cursor-pointer">Recycle Bin</div>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="h-12 border-b border-gray-200 flex items-center justify-between px-6">
                    <span className="font-semibold text-gray-700">My Files</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><List className="h-4 w-4" /></button>
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}><Grid className="h-4 w-4" /></button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {FILES.map(file => (
                                <div key={file.id} className="group border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 cursor-pointer bg-white transition-all flex flex-col items-center text-center relative">
                                    <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"><MoreVertical className="h-4 w-4 text-gray-500" /></button>
                                    <div className="mb-3">{getIcon(file.type)}</div>
                                    <div className="text-sm font-medium text-gray-700 truncate w-full mb-1">{file.name}</div>
                                    <div className="text-xs text-gray-400">{file.type === 'folder' ? file.modified : file.size}</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded-lg">
                            <div className="flex bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">
                                <div className="flex-1">Name</div>
                                <div className="w-32">Modified</div>
                                <div className="w-32">Owner</div>
                                <div className="w-24">Size</div>
                            </div>
                            {FILES.map(file => (
                                <div key={file.id} className="flex items-center px-4 py-3 hover:bg-blue-50 border-b border-gray-100 cursor-pointer group">
                                    <div className="flex-1 flex items-center gap-3 min-w-0">
                                        <div className="scale-75">{getIcon(file.type)}</div>
                                        <span className="text-sm font-medium text-gray-700 truncate">{file.name}</span>
                                    </div>
                                    <div className="w-32 text-xs text-gray-500">{file.modified}</div>
                                    <div className="w-32 text-xs text-gray-500">{file.owner}</div>
                                    <div className="w-24 text-xs text-gray-500">{file.size || '-'}</div>
                                    <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                                        <button title="Share"><Share2 className="h-4 w-4 text-gray-500 hover:text-blue-600" /></button>
                                        <button title="Download"><Download className="h-4 w-4 text-gray-500 hover:text-blue-600" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilesView;
