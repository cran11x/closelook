import React, { useState } from 'react';
import { Email } from '../types';
import { format, isToday, isYesterday } from 'date-fns';
import { Flag, Paperclip, Trash2, MailOpen, Mail } from 'lucide-react';

interface EmailListProps {
  emails: Email[];
  selectedEmailId: string | null;
  onSelectEmail: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, selectedEmailId, onSelectEmail }) => {
  const [hoveredEmailId, setHoveredEmailId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return format(date, 'h:mm a');
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MM/dd/yyyy');
  };

  // Group emails logic
  const groupedEmails = emails.reduce((groups, email) => {
    const date = new Date(email.date);
    let key = 'Older';
    if (isToday(date)) key = 'Today';
    else if (isYesterday(date)) key = 'Yesterday';
    
    if (!groups[key]) groups[key] = [];
    groups[key].push(email);
    return groups;
  }, {} as Record<string, Email[]>);

  const groupOrder = ['Today', 'Yesterday', 'Older'];

  const getCategoryColor = (category: string) => {
      if (category.includes('Red')) return 'bg-red-500';
      if (category.includes('Blue')) return 'bg-blue-500';
      if (category.includes('Green')) return 'bg-green-500';
      return 'bg-gray-400';
  };

  return (
    <div className="w-[360px] flex flex-col border-r border-gray-200 bg-white h-full shrink-0">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex gap-3 text-sm font-medium text-gray-600 ml-1">
            <span className="text-black font-bold cursor-pointer border-b-[3px] border-[#0078D4] pb-1">Focused</span>
            <span className="hover:text-black cursor-pointer pb-1">Other</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 text-xs cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors">
            <span className="font-medium">Filter</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 text-sm">
                <img src="https://illustrations.popsy.co/gray/surr-mirage.svg" className="w-24 h-24 opacity-40 mb-2" alt="Empty" />
                <span>All caught up</span>
            </div>
        ) : (
            groupOrder.map(group => {
                const groupEmails = groupedEmails[group];
                if (!groupEmails || groupEmails.length === 0) return null;

                return (
                    <div key={group}>
                        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-transparent">
                            {group}
                        </div>
                        {groupEmails.map((email) => {
                            const isSelected = email.id === selectedEmailId;
                            const isHovered = email.id === hoveredEmailId;
                            
                            return (
                                <div
                                key={email.id}
                                onClick={() => onSelectEmail(email.id)}
                                onMouseEnter={() => setHoveredEmailId(email.id)}
                                onMouseLeave={() => setHoveredEmailId(null)}
                                className={`
                                    group relative px-4 py-3 border-b border-gray-100 cursor-pointer select-none transition-colors
                                    ${isSelected ? 'bg-[#C7E0F4] border-l-[4px] border-l-[#0078D4]' : 'hover:bg-[#FAF9F8] border-l-[4px] border-l-transparent bg-white'}
                                    ${!email.read && !isSelected ? 'bg-[#EFF6FC]' : ''}
                                `}
                                >
                                <div className="flex justify-between items-start mb-0.5">
                                    <div className="flex items-center gap-3 overflow-hidden w-full">
                                        {/* Checkbox / Avatar Logic */}
                                        <div className="shrink-0 relative w-8 h-8 flex items-center justify-center">
                                            <div className={`
                                                absolute inset-0 rounded-full flex items-center justify-center text-white text-xs font-medium transition-opacity duration-200
                                                ${(isHovered || isSelected) ? 'opacity-0' : 'opacity-100'}
                                                ${!email.read ? 'bg-[#0078D4]' : 'bg-gray-400'}
                                            `}>
                                                 {email.from.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className={`
                                                absolute inset-0 flex items-center justify-center transition-opacity duration-200
                                                ${(isHovered || isSelected) ? 'opacity-100' : 'opacity-0'}
                                            `}>
                                                 <div className="w-5 h-5 rounded-full border border-gray-400 hover:border-[#0078D4] bg-white hover:bg-blue-50 flex items-center justify-center">
                                                    {isSelected && <div className="w-3 h-3 bg-[#0078D4] rounded-full"></div>}
                                                 </div>
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex justify-between items-baseline">
                                                <span className={`truncate text-sm ${!email.read ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                                    {email.from.name}
                                                </span>
                                                <span className={`text-xs ml-2 shrink-0 ${!email.read ? 'font-semibold text-[#0078D4]' : 'text-gray-500'}`}>
                                                    {formatDate(email.date)}
                                                </span>
                                            </div>
                                            <div className={`text-xs truncate leading-tight ${!email.read ? 'font-semibold text-[#0078D4]' : 'text-gray-500'}`}>
                                                {email.subject}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start pl-11">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-gray-500 line-clamp-1 mb-1.5">
                                            {email.snippet}
                                        </div>
                                        <div className="flex gap-1.5 h-4">
                                            {email.categories.map(cat => (
                                                <div key={cat} className={`w-8 h-1.5 rounded-full ${getCategoryColor(cat)}`} title={cat}></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1 pl-2">
                                         {/* Hover Actions */}
                                        <div className={`flex items-center gap-2 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                                            <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                                            <MailOpen className="h-4 w-4 text-gray-500 hover:text-blue-600" />
                                            <Flag className={`h-4 w-4 ${email.flagged ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                                        </div>
                                         {/* Static State Icons (when not hovered) */}
                                        <div className={`flex items-center gap-2 ${isHovered ? 'hidden' : 'flex'}`}>
                                            {email.hasAttachments && <Paperclip className="h-3 w-3 text-gray-400" />}
                                            {email.flagged && <Flag className="h-3 w-3 text-red-500 fill-red-500" />}
                                        </div>
                                    </div>
                                </div>

                                {!email.read && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#0078D4] rounded-r"></div>
                                )}
                                </div>
                            );
                        })}
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
};

export default EmailList;