
import React, { useState } from 'react';
import Header from './components/Header';
import NavRail from './components/NavRail';
import Sidebar from './components/Sidebar';
import EmailList from './components/EmailList';
import ReadingPane from './components/ReadingPane';
import ComposeModal from './components/ComposeModal';
import CalendarView from './components/CalendarView';
import PeopleView from './components/PeopleView';
import TodoView from './components/TodoView';
import FilesView from './components/FilesView';
import ProfileModal from './components/ProfileModal';
import { Email, FolderType, ComposeState, ViewType, Meeting } from './types';
import { MOCK_EMAILS, MOCK_MEETINGS, CURRENT_USER } from './constants';
import { Trash2, Archive, AlertOctagon, MailOpen, Tag, Flag, Clock, Undo2, Mail } from 'lucide-react';
import { generateMamdamiReply, generateBibiReply, generateKimReply } from './services/geminiService';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('mail');
  const [currentFolder, setCurrentFolder] = useState<FolderType>(FolderType.Inbox);
  const [emails, setEmails] = useState<Email[]>(MOCK_EMAILS);
  const [meetings, setMeetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isReceiving, setIsReceiving] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [composeState, setComposeState] = useState<ComposeState>({
    isOpen: false,
    to: '',
    subject: '',
    body: '',
    isMinimized: false
  });

  const handleSignOut = () => {
      // Simulate sign out by reloading to reset state
      window.location.reload();
  };

  // Filter emails based on folder and search query
  const displayedEmails = emails.filter(email => {
    const inFolder = email.folder === currentFolder;
    if (!searchQuery) return inFolder;
    
    const query = searchQuery.toLowerCase();
    return inFolder && (
        email.subject.toLowerCase().includes(query) ||
        email.from.name.toLowerCase().includes(query) ||
        email.body.toLowerCase().includes(query)
    );
  });

  const selectedEmail = emails.find(e => e.id === selectedEmailId) || null;

  // Calculate unread counts
  const unreadCounts = emails.reduce((acc, email) => {
    if (!email.read && email.folder !== FolderType.Deleted) {
      acc[email.folder] = (acc[email.folder] || 0) + 1;
    }
    return acc;
  }, {} as Record<FolderType, number>);

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    // Mark as read locally when opened
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
  };

  // Actions
  const handleDelete = (id: string) => {
    setEmails(prev => {
        const target = prev.find(e => e.id === id);
        if (target && target.folder !== FolderType.Deleted) {
            // Move to deleted
            return prev.map(e => e.id === id ? { ...e, folder: FolderType.Deleted } : e);
        } else {
            // Permanently delete
            return prev.filter(e => e.id !== id);
        }
    });
    if (selectedEmailId === id) setSelectedEmailId(null);
  };

  const handleArchive = () => {
    if (!selectedEmailId) return;
    setEmails(prev => prev.map(e => e.id === selectedEmailId ? { ...e, folder: FolderType.Archive } : e));
    setSelectedEmailId(null);
  };

  const handleJunk = () => {
    if (!selectedEmailId) return;
    setEmails(prev => prev.map(e => e.id === selectedEmailId ? { ...e, folder: FolderType.Junk } : e));
    setSelectedEmailId(null);
  };

  const handleMarkRead = () => {
      if (!selectedEmailId) return;
      setEmails(prev => prev.map(e => e.id === selectedEmailId ? { ...e, read: !e.read } : e));
  };

  const handleFlag = () => {
      if (!selectedEmailId) return;
      setEmails(prev => prev.map(e => e.id === selectedEmailId ? { ...e, flagged: !e.flagged } : e));
  };

  const handleCategorize = () => {
      if (!selectedEmailId) return;
      const categories = ['Red Category', 'Blue Category', 'Green Category', 'Orange Category'];
      // Cycle through adding a random category for demo purposes
      setEmails(prev => prev.map(e => {
          if (e.id !== selectedEmailId) return e;
          const newCat = categories[Math.floor(Math.random() * categories.length)];
          const hasCat = e.categories.includes(newCat);
          return {
              ...e,
              categories: hasCat ? e.categories.filter(c => c !== newCat) : [...e.categories, newCat]
          };
      }));
  };

  // Compose Actions
  const handleReply = (email: Email) => {
    setComposeState({
        isOpen: true,
        to: email.from.email,
        subject: email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`,
        body: `\n\n\n------------------------------\nFrom: ${email.from.name} <${email.from.email}>\nSent: ${email.date}\nSubject: ${email.subject}\n\n${email.body}`,
        isMinimized: false
    });
  };

  const handleReplyAll = (email: Email) => {
    const allRecipients = [email.from.email, ...email.to.map(u => u.email)].filter(e => e !== 'me').join('; ');
    setComposeState({
        isOpen: true,
        to: allRecipients,
        subject: email.subject.startsWith('Re:') ? email.subject : `Re: ${email.subject}`,
        body: `\n\n\n------------------------------\nFrom: ${email.from.name} <${email.from.email}>\nSent: ${email.date}\nSubject: ${email.subject}\n\n${email.body}`,
        isMinimized: false
    });
  };

  const handleForward = (email: Email) => {
    setComposeState({
        isOpen: true,
        to: '',
        subject: email.subject.startsWith('Fwd:') ? email.subject : `Fwd: ${email.subject}`,
        body: `\n\n\n------------------------------\nFrom: ${email.from.name} <${email.from.email}>\nSent: ${email.date}\nSubject: ${email.subject}\n\n${email.body}`,
        isMinimized: false
    });
  };

  const handleNewEmail = () => {
      setComposeState({
          isOpen: true,
          to: '',
          subject: '',
          body: '',
          isMinimized: false
      });
  };

  const handleAddMeeting = (meetingData: Omit<Meeting, 'id' | 'color'>) => {
      const newMeeting: Meeting = {
          ...meetingData,
          id: Math.random().toString(36).substr(2, 9),
          color: 'bg-blue-100 border-l-4 border-blue-600 text-blue-800'
      };
      setMeetings(prev => [...prev, newMeeting]);
  };

  const handleSendEmail = async (data: { to: string, subject: string, body: string }) => {
    // Create sent email
    const newEmailId = Math.random().toString(36).substr(2, 9);
    const sentEmail: Email = {
        id: newEmailId,
        folder: FolderType.Sent,
        from: CURRENT_USER,
        to: [{ name: data.to.split('@')[0] || 'Recipient', email: data.to }],
        subject: data.subject,
        body: data.body,
        snippet: data.body.substring(0, 50) + '...',
        date: new Date().toISOString(),
        read: true,
        flagged: false,
        hasAttachments: false,
        categories: []
    };

    setEmails(prev => [sentEmail, ...prev]);

    const lowerTo = data.to.toLowerCase();

    // Check triggers for AI Personas
    if (lowerTo.includes('mamdami') || lowerTo.includes('bibi') || lowerTo.includes('rocketman') || lowerTo.includes('kim')) {
        setIsReceiving(true);
        
        setTimeout(async () => {
            let aiReplyBody = "";
            let senderName = "Unknown";
            let senderEmail = "";
            let avatar = "";

            if (lowerTo.includes('mamdami')) {
                aiReplyBody = await generateMamdamiReply(data.body);
                senderName = "Mamdami";
                senderEmail = "mamdami@secretchannel.com";
                avatar = 'https://ui-avatars.com/api/?name=Mamdami&background=ff0000&color=fff';
            } else if (lowerTo.includes('bibi')) {
                aiReplyBody = await generateBibiReply(data.body);
                senderName = "Bibi";
                senderEmail = "bibi@prime.il";
                avatar = 'https://ui-avatars.com/api/?name=Benjamin+Netanyahu&background=0038b8&color=fff';
            } else if (lowerTo.includes('rocketman') || lowerTo.includes('kim')) {
                aiReplyBody = await generateKimReply(data.body);
                senderName = "Kim J.";
                senderEmail = "rocketman@pyongyang.kp";
                avatar = 'https://ui-avatars.com/api/?name=Kim+Jong+Un&background=000&color=fff';
            }
            
            const replyEmail: Email = {
                id: Math.random().toString(36).substr(2, 9),
                folder: FolderType.Inbox,
                from: { name: senderName, email: senderEmail, avatar: avatar },
                to: [CURRENT_USER],
                subject: data.subject.startsWith('Re:') ? data.subject : `Re: ${data.subject}`,
                body: aiReplyBody,
                snippet: aiReplyBody.substring(0, 50) + '...',
                date: new Date().toISOString(),
                read: false,
                flagged: true,
                hasAttachments: false,
                categories: ['Red Category']
            };

            setEmails(prev => [replyEmail, ...prev]);
            setIsReceiving(false);
        }, 3500);
    }
  };

  const RibbonButton = ({ icon: Icon, label, onClick, disabled = false, active = false }: { icon: any, label: string, onClick?: () => void, disabled?: boolean, active?: boolean }) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`
            flex items-center gap-1.5 px-2 py-1 rounded-sm border border-transparent
            ${disabled ? 'opacity-40 cursor-default' : 'hover:bg-gray-100 hover:shadow-sm active:bg-gray-200 text-gray-700 cursor-pointer'}
            ${active ? 'bg-blue-50 text-blue-700' : ''}
            transition-all duration-100
        `}
    >
        <Icon className={`w-4 h-4 ${active ? 'fill-blue-700' : ''}`} strokeWidth={1.5} />
        <span className="hidden xl:inline text-sm font-medium">{label}</span>
    </button>
  );

  const renderContent = () => {
      switch (currentView) {
          case 'calendar':
              return <CalendarView meetings={meetings} onAddMeeting={handleAddMeeting} />;
          case 'people':
              return <PeopleView />;
          case 'todo':
              return <TodoView />;
          case 'files':
              return <FilesView />;
          case 'mail':
          default:
              return (
                <>
                    <Sidebar 
                        currentFolder={currentFolder} 
                        setCurrentFolder={setCurrentFolder}
                        unreadCounts={unreadCounts}
                        onNewMail={handleNewEmail}
                    />
                    <EmailList 
                        emails={displayedEmails} 
                        selectedEmailId={selectedEmailId} 
                        onSelectEmail={handleSelectEmail} 
                    />
                    <ReadingPane 
                        email={selectedEmail} 
                        onDelete={handleDelete}
                        onReply={handleReply}
                        onReplyAll={handleReplyAll}
                        onForward={handleForward}
                    />
                </>
              );
      }
  };

  // Dynamic Ribbon items based on view
  const renderRibbon = () => {
      if (currentView === 'mail') {
          return (
            <>
                <RibbonButton icon={Trash2} label="Delete" onClick={() => selectedEmailId && handleDelete(selectedEmailId)} disabled={!selectedEmailId} />
                <RibbonButton icon={Archive} label="Archive" onClick={handleArchive} disabled={!selectedEmailId} />
                <RibbonButton icon={AlertOctagon} label="Junk" onClick={handleJunk} disabled={!selectedEmailId} />
                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                
                <RibbonButton 
                    icon={selectedEmail?.read ? Mail : MailOpen} 
                    label={selectedEmail?.read ? "Mark unread" : "Mark read"} 
                    onClick={handleMarkRead} 
                    disabled={!selectedEmailId} 
                />
                <RibbonButton icon={Tag} label="Categorize" onClick={handleCategorize} disabled={!selectedEmailId} />
                <RibbonButton 
                    icon={Flag} 
                    label="Flag" 
                    onClick={handleFlag} 
                    disabled={!selectedEmailId} 
                    active={selectedEmail?.flagged}
                />
                <RibbonButton icon={Clock} label="Snooze" disabled={!selectedEmailId} onClick={() => alert("Snooze feature coming soon!")} />
                
                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                <RibbonButton icon={Undo2} label="Undo" disabled={true} />
            </>
          );
      } else if (currentView === 'calendar') {
          return (
            <>
                <RibbonButton icon={Clock} label="Today" onClick={() => {}} />
                <div className="w-px h-5 bg-gray-200 mx-1"></div>
                <RibbonButton icon={Mail} label="Share Calendar" onClick={() => {}} />
            </>
          );
      } else {
          return <div className="px-2 text-gray-500 italic text-xs flex items-center h-full">View only</div>;
      }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-white overflow-hidden font-sans text-sm antialiased">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onProfileClick={() => setIsProfileOpen(true)}
      />
      
      {/* Outlook-style Command Bar / Ribbon */}
      <div className="h-11 bg-white border-b border-gray-200 flex items-center px-2 shrink-0 gap-1 overflow-x-auto shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        {renderRibbon()}

        {isReceiving && (
            <div className="ml-auto flex items-center gap-2 text-xs text-blue-600 animate-pulse px-4">
                Updating Folders...
            </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Nav Rail sits outside Sidebar */}
        <NavRail activeView={currentView} onNavigate={setCurrentView} />
        
        {renderContent()}
      </div>

      <ComposeModal 
        composeState={composeState} 
        setComposeState={setComposeState} 
        onSend={handleSendEmail}
      />

      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSignOut={handleSignOut}
        user={CURRENT_USER}
      />
    </div>
  );
}

export default App;
