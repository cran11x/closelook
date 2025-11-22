
import React, { useState } from 'react';
import { X, Clock, MapPin, Users, AlignLeft, Sparkles } from 'lucide-react';
import { draftComplexReply } from '../services/geminiService';
import { Meeting } from '../types';

interface NewMeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (meeting: Omit<Meeting, 'id' | 'color'>) => void;
}

const NewMeetingModal: React.FC<NewMeetingModalProps> = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('11:00');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        const start = new Date(`${date}T${startTime}`).toISOString();
        const end = new Date(`${date}T${endTime}`).toISOString();
        
        onSave({
            title,
            start,
            end,
            location,
            description,
            attendees: []
        });
        onClose();
    };

    const handleAiAgenda = async () => {
        if (!title) return;
        setIsAiLoading(true);
        const agenda = await draftComplexReply(`Create a professional agenda for a meeting titled: "${title}". Include 3-4 key discussion points and time allocations.`);
        setDescription(agenda);
        setIsAiLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center font-sans">
            <div className="bg-white w-[600px] rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-lg">
                    <span className="font-semibold text-lg text-gray-800">New Event</span>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-5 overflow-y-auto">
                    <input 
                        className="text-2xl font-semibold text-gray-800 placeholder-gray-400 border-b-2 border-transparent focus:border-blue-600 outline-none pb-1 transition-all"
                        placeholder="Add title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <div className="flex gap-2">
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
                                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
                                <span className="self-center text-gray-500">-</span>
                                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm" />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <MapPin className="h-5 w-5 text-gray-500" />
                            <input 
                                className="flex-1 border-b border-gray-200 focus:border-blue-600 outline-none py-1 text-sm"
                                placeholder="Add location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="flex items-start gap-4">
                            <AlignLeft className="h-5 w-5 text-gray-500 mt-1" />
                            <div className="flex-1 relative">
                                <textarea 
                                    className="w-full border border-gray-200 rounded p-3 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none h-32 resize-none bg-gray-50"
                                    placeholder="Type details for this new meeting"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <button 
                                    onClick={handleAiAgenda}
                                    disabled={!title || isAiLoading}
                                    className="absolute bottom-2 right-2 text-xs bg-white border border-blue-100 text-blue-600 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-50 shadow-sm"
                                >
                                    <Sparkles className="h-3 w-3" />
                                    {isAiLoading ? 'Generating...' : 'AI Agenda'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex justify-end gap-2 bg-gray-50 rounded-b-lg">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded">Discard</button>
                    <button onClick={handleSave} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm">Save</button>
                </div>
            </div>
        </div>
    );
};

export default NewMeetingModal;
