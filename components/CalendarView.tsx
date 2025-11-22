
import React, { useState } from 'react';
import { format, addDays, startOfWeek, addHours, isSameDay, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Meeting } from '../types';
import NewMeetingModal from './NewMeetingModal';

interface CalendarViewProps {
    meetings: Meeting[];
    onAddMeeting: (meeting: Omit<Meeting, 'id' | 'color'>) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ meetings, onAddMeeting }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));
    const hours = [...Array(24)].map((_, i) => i); // 0 to 23

    const getMeetingsForCell = (day: Date, hour: number) => {
        return meetings.filter(m => {
            const mStart = new Date(m.start);
            return isSameDay(mStart, day) && mStart.getHours() === hour;
        });
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-white overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <div className="flex items-center bg-gray-100 rounded-md p-0.5">
                        <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-1 hover:bg-white rounded shadow-sm transition-all">
                            <ChevronLeft className="h-4 w-4 text-gray-600" />
                        </button>
                        <button onClick={() => setCurrentDate(new Date())} className="px-3 py-0.5 text-xs font-medium text-gray-600 hover:text-black">Today</button>
                        <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-1 hover:bg-white rounded shadow-sm transition-all">
                            <ChevronRight className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-sm text-sm font-medium flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> New Event
                </button>
            </div>

            {/* Grid Header */}
            <div className="flex border-b border-gray-200 shrink-0 ml-14">
                {weekDays.map((day, i) => (
                    <div key={i} className={`flex-1 text-center py-2 border-l border-gray-100 ${isSameDay(day, new Date()) ? 'bg-blue-50' : ''}`}>
                        <div className={`text-xs font-medium uppercase ${isSameDay(day, new Date()) ? 'text-blue-600' : 'text-gray-500'}`}>
                            {format(day, 'EEE')}
                        </div>
                        <div className={`text-xl font-light ${isSameDay(day, new Date()) ? 'text-blue-700 font-semibold' : 'text-gray-800'}`}>
                            {format(day, 'd')}
                        </div>
                    </div>
                ))}
            </div>

            {/* Grid Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                <div className="relative min-w-[800px]">
                    {hours.map((hour) => (
                        <div key={hour} className="flex h-20 border-b border-gray-100">
                            {/* Time Column */}
                            <div className="w-14 shrink-0 text-right pr-2 text-xs text-gray-400 -mt-2.5 bg-white sticky left-0 z-10">
                                {hour === 0 ? '' : format(new Date().setHours(hour), 'h a')}
                            </div>
                            
                            {/* Days Columns */}
                            {weekDays.map((day, i) => {
                                const cellMeetings = getMeetingsForCell(day, hour);
                                return (
                                    <div key={i} className="flex-1 border-l border-gray-100 relative group hover:bg-gray-50/50 transition-colors">
                                        {cellMeetings.map(meeting => (
                                            <div 
                                                key={meeting.id}
                                                className={`absolute top-0 left-1 right-1 p-1.5 rounded border shadow-sm text-xs cursor-pointer hover:brightness-95 transition-all z-10 ${meeting.color}`}
                                                style={{ height: '90%' }}
                                            >
                                                <div className="font-bold truncate">{meeting.title}</div>
                                                <div className="truncate opacity-80">{meeting.location}</div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    {/* Current Time Indicator (approximate) */}
                    <div className="absolute left-14 right-0 border-t-2 border-red-400 pointer-events-none z-20" style={{ top: `${(new Date().getHours() * 80) + (new Date().getMinutes() / 60 * 80)}px` }}>
                        <div className="absolute -left-1.5 -top-1.5 w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            <NewMeetingModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={onAddMeeting}
            />
        </div>
    );
};

export default CalendarView;
