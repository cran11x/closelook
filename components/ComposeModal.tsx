import React, { useState } from 'react';
import { ComposeState } from '../types';
import { X, Minus, Maximize2, Minimize2, Paperclip, Image as ImageIcon, Smile, MoreHorizontal, Trash2, Sparkles, Send, Loader2, BrainCircuit, Search, Globe } from 'lucide-react';
import { draftEmailReply, polishEmailDraft, generateEmailImage, researchTopic, draftComplexReply } from '../services/geminiService';

interface ComposeModalProps {
  composeState: ComposeState;
  setComposeState: React.Dispatch<React.SetStateAction<ComposeState>>;
  onSend: (data: { to: string; subject: string; body: string }) => void;
}

const ComposeModal: React.FC<ComposeModalProps> = ({ composeState, setComposeState, onSend }) => {
  const [isAiMenuOpen, setIsAiMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'write' | 'image' | 'research'>('write');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Specific states for features
  const [useThinking, setUseThinking] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [researchResult, setResearchResult] = useState<{text: string, sources: any[]} | null>(null);

  const [isMaximized, setIsMaximized] = useState(false);
  const [showCc, setShowCc] = useState(false);

  if (!composeState.isOpen) return null;

  const close = () => setComposeState({ ...composeState, isOpen: false });
  
  const toggleMinimize = () => setComposeState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  
  const updateField = (field: keyof ComposeState, value: string) => {
    setComposeState(prev => ({ ...prev, [field]: value }));
  };

  const handleSend = () => {
    onSend({
        to: composeState.to,
        subject: composeState.subject,
        body: composeState.body
    });
    close();
  };

  // === AI HANDLERS ===

  const handleDraft = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    let draft = '';
    
    if (useThinking) {
        draft = await draftComplexReply(aiPrompt);
    } else {
        draft = await draftEmailReply("New Email Context", 'professional', aiPrompt);
    }
    
    updateField('body', draft);
    setIsAiLoading(false);
    setIsAiMenuOpen(false);
    setAiPrompt('');
  };

  const handleGenerateImage = async () => {
      if (!aiPrompt) return;
      setIsAiLoading(true);
      const base64 = await generateEmailImage(aiPrompt, imageSize);
      setGeneratedImage(base64);
      setIsAiLoading(false);
  };

  const handleInsertImage = () => {
      if (generatedImage) {
          // In a real app we'd handle attachments properly, here we append a placeholder text
          updateField('body', composeState.body + `\n\n[ATTACHMENT: Generated Image - "${aiPrompt}" (${imageSize})]\n`);
          setIsAiMenuOpen(false);
          setGeneratedImage(null);
          setAiPrompt('');
      }
  };

  const handleResearch = async () => {
      if (!aiPrompt) return;
      setIsAiLoading(true);
      const result = await researchTopic(aiPrompt);
      setResearchResult(result);
      setIsAiLoading(false);
  };

  const handleInsertResearch = () => {
      if (researchResult) {
          const sourceText = researchResult.sources.map(s => `[${s.title}](${s.uri})`).join(', ');
          const textToInsert = `${researchResult.text}\n\nSources: ${sourceText}`;
          updateField('body', composeState.body + (composeState.body ? '\n\n' : '') + textToInsert);
          setIsAiMenuOpen(false);
          setResearchResult(null);
          setAiPrompt('');
      }
  };

  const handlePolishWithAI = async () => {
    if (!composeState.body) return;
    setIsAiLoading(true);
    const polished = await polishEmailDraft(composeState.body);
    updateField('body', polished);
    setIsAiLoading(false);
  };

  // Style modifications for Minimized/Maximized states
  const containerStyle = composeState.isMinimized
    ? { width: '280px', height: '40px', bottom: '0', right: '20px', borderRadius: '4px 4px 0 0' }
    : isMaximized 
        ? { width: '98%', height: '95%', bottom: '2.5%', right: '1%', borderRadius: '4px' }
        : { width: '640px', height: '520px', bottom: '0', right: '40px', borderRadius: '4px 4px 0 0' };

  if (composeState.isMinimized) {
      return (
        <div className="fixed z-50 bg-white shadow-xl border border-gray-300 flex items-center justify-between px-4 cursor-pointer hover:bg-gray-50 transition-all" 
             style={containerStyle}
             onClick={toggleMinimize}
        >
            <span className="font-bold text-sm text-gray-800 truncate pr-2">{composeState.subject || 'New Message'}</span>
            <div className="flex items-center gap-1">
                <button onClick={(e) => { e.stopPropagation(); toggleMinimize(); }} className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Maximize2 className="h-3 w-3" /></button>
                <button onClick={(e) => { e.stopPropagation(); close(); }} className="p-1.5 hover:bg-red-100 hover:text-red-600 rounded text-gray-600"><X className="h-3 w-3" /></button>
            </div>
        </div>
      );
  }

  return (
    <div className="fixed z-50 bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col transition-all duration-200 ease-out font-sans" 
         style={{ ...containerStyle }}>
      
      {/* Header */}
      <div className="h-10 bg-white border-b border-gray-100 flex items-center justify-between px-3 shrink-0 cursor-default rounded-t-[inherit]">
        <span className="font-bold text-sm text-gray-800 pl-1">{composeState.subject || 'New message'}</span>
        <div className="flex items-center gap-1">
          <button onClick={toggleMinimize} className="hover:bg-gray-100 text-gray-600 p-1.5 rounded" title="Minimize"><Minus className="h-4 w-4" /></button>
          <button onClick={() => setIsMaximized(!isMaximized)} className="hover:bg-gray-100 text-gray-600 p-1.5 rounded" title={isMaximized ? "Restore" : "Maximize"}>
              {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={close} className="hover:bg-red-600 hover:text-white text-gray-600 p-1.5 rounded transition-colors" title="Close"><X className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
          <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors">To</button>
          <input 
            value={composeState.to} 
            onChange={(e) => updateField('to', e.target.value)}
            className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 font-sans" 
            autoFocus
          />
           <button 
             onClick={() => setShowCc(!showCc)}
             className={`text-xs hover:underline ${showCc ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}
           >
             Cc
           </button>
        </div>
        
        {showCc && (
            <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2 animate-in slide-in-from-top-1 duration-200">
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-colors">Cc</button>
                <input className="flex-1 outline-none text-sm text-gray-800" placeholder="Recipients" />
            </div>
        )}

        <div className="px-4 py-2 border-b border-gray-100">
          <input 
            value={composeState.subject} 
            onChange={(e) => updateField('subject', e.target.value)}
            placeholder="Add a subject" 
            className="w-full outline-none text-sm font-medium placeholder-gray-500" 
          />
        </div>

        {/* COPILOT / AI OVERLAY */}
        {isAiMenuOpen && (
            <div className="absolute top-16 left-4 right-4 bg-white shadow-2xl border border-blue-200 rounded-lg p-0 z-20 animate-in slide-in-from-bottom-2 fade-in duration-200 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 bg-gray-50/50 rounded-t-lg">
                    <button onClick={() => setActiveTab('write')} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-2 ${activeTab === 'write' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <Sparkles className="h-3 w-3" /> Write
                    </button>
                    <button onClick={() => setActiveTab('image')} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-2 ${activeTab === 'image' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <ImageIcon className="h-3 w-3" /> Image
                    </button>
                    <button onClick={() => setActiveTab('research')} className={`flex-1 py-2 text-xs font-medium flex items-center justify-center gap-2 ${activeTab === 'research' ? 'bg-white text-blue-600 border-t-2 border-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                        <Search className="h-3 w-3" /> Research
                    </button>
                </div>

                <div className="p-3">
                    {/* Content Area */}
                    <textarea 
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder={
                            activeTab === 'write' ? "What should this email say?" : 
                            activeTab === 'image' ? "Describe the image you want..." :
                            "What do you want to fact check?"
                        }
                        className="w-full border border-gray-200 rounded p-2 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none mb-3 resize-none h-20"
                    />

                    {/* Specific Controls */}
                    {activeTab === 'write' && (
                        <div className="flex items-center gap-2 mb-3">
                            <input 
                                type="checkbox" 
                                id="thinkToggle"
                                checked={useThinking}
                                onChange={(e) => setUseThinking(e.target.checked)}
                                className="rounded text-blue-600 focus:ring-blue-500" 
                            />
                            <label htmlFor="thinkToggle" className="text-xs text-gray-700 flex items-center gap-1 cursor-pointer">
                                <BrainCircuit className="h-3 w-3" />
                                Use Deep Thinking (Complex)
                            </label>
                        </div>
                    )}

                    {activeTab === 'image' && (
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs text-gray-600">Size:</span>
                            <select 
                                value={imageSize} 
                                onChange={(e) => setImageSize(e.target.value as any)}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                                <option value="1K">1K (Square)</option>
                                <option value="2K">2K (Standard)</option>
                                <option value="4K">4K (High Res)</option>
                            </select>
                        </div>
                    )}

                    {/* Results Display */}
                    {activeTab === 'image' && generatedImage && (
                        <div className="mb-3 p-2 border border-gray-100 rounded bg-gray-50 flex flex-col items-center">
                            <img src={generatedImage} alt="Generated" className="max-h-32 rounded shadow-sm mb-2" />
                            <button onClick={handleInsertImage} className="text-xs text-blue-600 hover:underline font-medium">
                                Insert Image
                            </button>
                        </div>
                    )}

                    {activeTab === 'research' && researchResult && (
                        <div className="mb-3 p-2 border border-gray-100 rounded bg-gray-50 max-h-40 overflow-y-auto">
                            <p className="text-xs text-gray-700 mb-2">{researchResult.text}</p>
                            <div className="flex flex-wrap gap-2">
                                {researchResult.sources.map((s, i) => (
                                    <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="text-[10px] bg-white border border-gray-200 rounded px-1.5 py-0.5 text-blue-600 flex items-center gap-1 hover:underline">
                                        <Globe className="h-2 w-2" /> {s.title.substring(0, 15)}...
                                    </a>
                                ))}
                            </div>
                            <button onClick={handleInsertResearch} className="mt-2 text-xs w-full py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                Insert Result
                            </button>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2">
                        <button onClick={() => { setIsAiMenuOpen(false); setGeneratedImage(null); setResearchResult(null); }} className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                        
                        {activeTab === 'write' && (
                            <button 
                                onClick={handleDraft} 
                                disabled={!aiPrompt || isAiLoading}
                                className="px-3 py-1.5 bg-[#0078D4] text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1"
                            >
                                {isAiLoading ? 'Thinking...' : useThinking ? 'Deep Draft' : 'Draft'}
                            </button>
                        )}
                        
                        {activeTab === 'image' && !generatedImage && (
                             <button 
                                onClick={handleGenerateImage} 
                                disabled={!aiPrompt || isAiLoading}
                                className="px-3 py-1.5 bg-[#0078D4] text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1"
                            >
                                {isAiLoading ? 'Generating...' : 'Generate'}
                            </button>
                        )}

                        {activeTab === 'research' && !researchResult && (
                             <button 
                                onClick={handleResearch} 
                                disabled={!aiPrompt || isAiLoading}
                                className="px-3 py-1.5 bg-[#0078D4] text-white text-xs rounded hover:bg-blue-700 flex items-center gap-1"
                            >
                                {isAiLoading ? 'Searching...' : 'Search Google'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* Editor Area */}
        <textarea 
          value={composeState.body} 
          onChange={(e) => updateField('body', e.target.value)}
          className="flex-1 p-4 outline-none resize-none text-sm leading-relaxed text-gray-800 font-sans"
          placeholder="Type / to insert files and more"
        />

        {/* Footer Toolbar */}
        <div className="h-14 border-t border-gray-200 bg-white px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={handleSend} className="bg-[#0078D4] hover:bg-blue-800 text-white px-5 py-1.5 rounded-sm shadow-sm text-sm font-medium flex items-center gap-2 transition-colors">
                Send <Send className="h-3 w-3" />
            </button>
            <button onClick={() => setIsAiMenuOpen(!isAiMenuOpen)} className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors relative group" title="Copilot">
                <Sparkles className="h-4 w-4" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Copilot
                </span>
            </button>
            <div className="h-6 w-px bg-gray-300 mx-1"></div>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded"><Paperclip className="h-4 w-4" /></button>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded"><ImageIcon className="h-4 w-4" /></button>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded"><Smile className="h-4 w-4" /></button>
          </div>
          <div className="flex items-center gap-1">
             {composeState.body.length > 10 && (
                 <button onClick={handlePolishWithAI} className="text-xs text-blue-600 hover:underline mr-4 flex items-center gap-1">
                     {isAiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                     Polish
                 </button>
             )}
             <button onClick={close} className="p-2 text-gray-500 hover:bg-gray-100 rounded hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;