
export enum FolderType {
    Inbox = 'inbox',
    Sent = 'sent',
    Drafts = 'drafts',
    Junk = 'junk',
    Deleted = 'deleted',
    Archive = 'archive'
}
  
export interface User {
    name: string;
    email: string;
    avatar?: string;
}
  
export interface Email {
    id: string;
    folder: FolderType;
    from: User;
    to: User[];
    subject: string;
    body: string;
    snippet: string;
    date: string; // ISO string
    read: boolean;
    flagged: boolean;
    hasAttachments: boolean;
    categories: string[]; // e.g., 'Red', 'Blue', 'Green'
}

export interface ComposeState {
    isOpen: boolean;
    to: string;
    subject: string;
    body: string;
    isMinimized: boolean;
}

export interface Meeting {
    id: string;
    title: string;
    start: string; // ISO string
    end: string; // ISO string
    location: string;
    attendees: User[];
    description: string;
    color: string; // e.g., 'bg-blue-200'
}

export type ViewType = 'mail' | 'calendar' | 'people' | 'todo' | 'files';
