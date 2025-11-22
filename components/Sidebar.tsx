import React from 'react';
import { FolderType } from '../types';
import { 
  Inbox, Send, File, Trash2, Archive, AlertOctagon, 
  ChevronDown, ChevronRight, Plus
} from 'lucide-react';

interface SidebarProps {
  currentFolder: FolderType;
  setCurrentFolder: (folder: FolderType) => void;
  unreadCounts: Record<FolderType, number>;
  onNewMail: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentFolder, setCurrentFolder, unreadCounts, onNewMail }) => {
  const [favoritesExpanded, setFavoritesExpanded] = React.useState(true);
  const [foldersExpanded, setFoldersExpanded] = React.useState(true);

  const navItem = (folder: FolderType, label: string, Icon: React.ElementType) => {
    const isActive = currentFolder === folder;
    const unread = unreadCounts[folder] || 0;

    return (
      <div
        onClick={() => setCurrentFolder(folder)}
        className={`
            group flex items-center justify-between px-4 py-2 cursor-pointer text-sm rounded-sm mx-2
            ${isActive ? 'bg-blue-100 text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}
        `}
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
          <span>{label}</span>
        </div>
        {unread > 0 && (
          <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-blue-600'}`}>
            {unread}
          </span>
        )}
      </div>
    );
  };

  return (
    <nav className="w-[220px] bg-white flex flex-col h-full border-r border-gray-200 shrink-0">
      
      {/* New Mail Button */}
      <div className="p-4 pb-2">
        <button 
            onClick={onNewMail}
            className="w-full bg-[#0078D4] hover:bg-blue-800 text-white py-2.5 px-4 rounded shadow-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
            <Plus className="h-5 w-5" />
            <span className="text-sm">New mail</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pt-2">
        {/* Favorites Section */}
        <div className="pb-2">
            <div 
                className="flex items-center px-4 py-1 mb-1 text-gray-500 hover:text-gray-800 cursor-pointer group"
                onClick={() => setFavoritesExpanded(!favoritesExpanded)}
            >
                {favoritesExpanded ? <ChevronDown className="h-3 w-3 mr-2 group-hover:text-gray-800" /> : <ChevronRight className="h-3 w-3 mr-2 group-hover:text-gray-800" />}
                <span className="font-semibold text-gray-600 group-hover:text-gray-800">Favorites</span>
            </div>
            
            {favoritesExpanded && (
                <div>
                    {navItem(FolderType.Inbox, 'Inbox', Inbox)}
                    {navItem(FolderType.Sent, 'Sent Items', Send)}
                    {navItem(FolderType.Drafts, 'Drafts', File)}
                </div>
            )}
        </div>

        {/* Folders Section */}
        <div className="py-2">
            <div 
                className="flex items-center px-4 py-1 mb-1 text-gray-500 hover:text-gray-800 cursor-pointer group"
                onClick={() => setFoldersExpanded(!foldersExpanded)}
            >
                {foldersExpanded ? <ChevronDown className="h-3 w-3 mr-2 group-hover:text-gray-800" /> : <ChevronRight className="h-3 w-3 mr-2 group-hover:text-gray-800" />}
                <span className="font-semibold text-gray-600 group-hover:text-gray-800">Folders</span>
            </div>

            {foldersExpanded && (
                <div>
                    {navItem(FolderType.Inbox, 'Inbox', Inbox)}
                    {navItem(FolderType.Drafts, 'Drafts', File)}
                    {navItem(FolderType.Sent, 'Sent Items', Send)}
                    {navItem(FolderType.Deleted, 'Deleted Items', Trash2)}
                    {navItem(FolderType.Archive, 'Archive', Archive)}
                    {navItem(FolderType.Junk, 'Junk Email', AlertOctagon)}
                </div>
            )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium px-2">
            <Plus className="h-4 w-4" />
            New Folder
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;