
import React, { useState } from 'react';
import { X, Camera, Mail, Phone, MapPin, Award, TrendingUp, LogOut, Settings, Shield, Edit2, Check, Loader2, ExternalLink } from 'lucide-react';
import { User } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  user: User;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSignOut, user }) => {
  const [status, setStatus] = useState('Making America Great Again');
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!isOpen) return null;

  const handleSignOutClick = () => {
    setIsSigningOut(true);
    setTimeout(() => {
        onSignOut();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end items-start pt-14 pr-2 font-sans" onClick={onClose}>
      <div 
        className="bg-white w-[360px] rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col mr-2" 
        onClick={e => e.stopPropagation()}
      >
        {/* Compact Cover */}
        <div className="h-20 bg-gradient-to-r from-[#0078D4] to-[#004E8C] relative shrink-0">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="absolute top-3 right-3 flex gap-2">
                 <button className="text-white/80 hover:text-white text-xs font-medium hover:underline" onClick={onSignOut}>Sign out</button>
                 <button 
                    onClick={onClose} 
                    className="p-1 bg-black/10 hover:bg-black/30 text-white rounded-full transition-colors focus:outline-none"
                 >
                    <X className="h-3 w-3" />
                </button>
             </div>
        </div>

        {/* Profile Info */}
        <div className="px-6 relative flex-1">
            <div className="relative -mt-10 mb-3 inline-block">
                 <div className="p-1 bg-white rounded-full shadow-sm">
                    <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border border-gray-100" />
                 </div>
                 <button className="absolute bottom-0 right-0 p-1 bg-white hover:bg-gray-50 rounded-full border border-gray-200 shadow-sm text-gray-600 transition-colors" title="Change Photo">
                    <Camera className="h-3 w-3" />
                 </button>
            </div>
            
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-500 text-sm mb-3">{user.email}</p>
                <button className="text-[#0078D4] hover:underline text-sm font-medium flex items-center gap-1">
                    View my account <ExternalLink className="h-3 w-3" />
                </button>
            </div>
            
            {/* Status Bar */}
            <div className="mb-6 bg-gray-50 rounded border border-gray-100 p-3">
                <div className="flex items-center justify-between mb-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</label>
                    {!isEditingStatus && (
                        <button onClick={() => setIsEditingStatus(true)} className="text-gray-400 hover:text-blue-600">
                            <Edit2 className="h-3 w-3" />
                        </button>
                    )}
                </div>
                {isEditingStatus ? (
                    <div className="flex items-center gap-2">
                        <input 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="flex-1 bg-white border border-blue-400 rounded px-2 py-1 text-sm outline-none shadow-sm"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && setIsEditingStatus(false)}
                        />
                        <button onClick={() => setIsEditingStatus(false)} className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <Check className="h-3 w-3" />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-800" onClick={() => setIsEditingStatus(true)}>
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="truncate">{status}</span>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-white rounded border border-gray-200 hover:border-blue-300 transition-all group cursor-pointer shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 group-hover:text-blue-600 mb-1">
                        <Award className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase">Handicap</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">2.8</div>
                </div>
                    <div className="p-3 bg-white rounded border border-gray-200 hover:border-green-400 transition-all group cursor-pointer shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 group-hover:text-green-600 mb-1">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase">Approval</span>
                    </div>
                    <div className="text-xl font-bold text-gray-900">100%</div>
                </div>
            </div>
        </div>

        {/* Footer Links */}
        <div className="bg-gray-50 border-t border-gray-200 py-1">
             <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-sm gap-3">
                <Settings className="h-4 w-4 text-gray-500" />
                <span>Settings</span>
            </button>
             <button className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors text-sm gap-3">
                <Shield className="h-4 w-4 text-gray-500" />
                <span>Security Info</span>
            </button>
            <div className="h-px bg-gray-200 my-1 mx-4"></div>
             <button 
                onClick={handleSignOutClick}
                disabled={isSigningOut}
                className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors text-sm gap-3"
            >
                {isSigningOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
                {isSigningOut ? 'Signing out...' : 'Sign out'}
            </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;
