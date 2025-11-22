
import React from 'react';
import { Search, Grip, Bell, Settings, HelpCircle, UserCircle } from 'lucide-react';
import { CURRENT_USER } from '../constants';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, onProfileClick }) => {
  return (
    <header className="h-12 bg-[#0078D4] text-white flex items-center justify-between px-3 shrink-0 select-none">
      <div className="flex items-center gap-4 w-64">
        <div className="grid grid-cols-3 gap-0.5 p-1 hover:bg-blue-700 rounded cursor-pointer" title="App Launcher">
            {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
            ))}
        </div>
        <span className="font-semibold text-lg tracking-tight">Closelook</span>
      </div>

      <div className="flex-1 max-w-2xl mx-4 relative">
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-blue-200 group-focus-within:text-blue-600 transition-colors" />
            </div>
            <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-1.5 rounded bg-blue-100/20 border border-transparent text-white placeholder-blue-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm transition-all"
            />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button className="p-2 hover:bg-blue-700 rounded transition-colors">
            <Grip className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-blue-700 rounded transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full border border-[#0078D4]"></span>
        </button>
        <button className="p-2 hover:bg-blue-700 rounded transition-colors">
            <Settings className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-blue-700 rounded transition-colors">
            <HelpCircle className="h-5 w-5" />
        </button>
        <div 
            className="ml-1 relative rounded-full cursor-pointer border-2 border-transparent hover:border-blue-300 transition-all"
            onClick={onProfileClick}
            title={`Account manager for ${CURRENT_USER.name}`}
        >
            {CURRENT_USER.avatar ? (
                <img src={CURRENT_USER.avatar} alt="User" className="h-8 w-8 rounded-full" />
            ) : (
                <UserCircle className="h-8 w-8" />
            )}
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0078D4] rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
