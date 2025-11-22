
import React from 'react';
import { Mail, Calendar, Users, CheckSquare, MoreHorizontal, FileText } from 'lucide-react';
import { ViewType } from '../types';

interface NavRailProps {
    activeView: ViewType;
    onNavigate: (view: ViewType) => void;
}

const NavRail: React.FC<NavRailProps> = ({ activeView, onNavigate }) => {

  const navItem = (id: ViewType, Icon: React.ElementType, title: string) => {
      const isActive = activeView === id;
      return (
        <div 
            onClick={() => onNavigate(id)}
            className={`
                w-10 h-10 flex items-center justify-center rounded mb-1 cursor-pointer transition-all
                ${isActive ? 'bg-white shadow-sm text-blue-600' : 'hover:bg-gray-200 text-gray-500 hover:text-blue-700'}
            `} 
            title={title}
        >
            <Icon className="h-5 w-5" />
        </div>
      );
  };
  
  return (
    <div className="w-[48px] bg-[#f3f2f1] border-r border-gray-200 flex flex-col items-center py-3 shrink-0 z-20">
      {navItem('mail', Mail, 'Mail')}
      {navItem('calendar', Calendar, 'Calendar')}
      {navItem('people', Users, 'People')}
      {navItem('todo', CheckSquare, 'To Do')}
      {navItem('files', FileText, 'Files')}

      <div className="mt-auto">
        <div className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500 hover:text-blue-700 cursor-pointer mb-1" title="More apps">
            <MoreHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default NavRail;
