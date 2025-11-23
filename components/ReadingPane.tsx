import React, { useState, useEffect } from 'react';
import { Email } from '../types';
import { format } from 'date-fns';
import { 
  Reply, ReplyAll, Forward, MoreHorizontal, Star, Printer, Trash2, 
  Smile, Download, Sparkles, Loader2, File as FileIcon, ThumbsUp, FileText, Presentation
} from 'lucide-react';
import { summarizeEmail } from '../services/geminiService';
import { jsPDF } from "jspdf";
import PptxGenJS from "pptxgenjs";

interface ReadingPaneProps {
  email: Email | null;
  onDelete: (id: string) => void;
  onReply: (email: Email) => void;
  onReplyAll: (email: Email) => void;
  onForward: (email: Email) => void;
}

const ReadingPane: React.FC<ReadingPaneProps> = ({ email, onDelete, onReply, onReplyAll, onForward }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isGeneratingFile, setIsGeneratingFile] = useState(false);

  useEffect(() => {
    setSummary(null);
    setIsLiked(false);
    setIsGeneratingFile(false);
  }, [email]);

  const handleSummarize = async () => {
    if (!email) return;
    setIsSummarizing(true);
    const result = await summarizeEmail(email.body);
    setSummary(result);
    setIsSummarizing(false);
  };

  const getAttachmentDetails = (senderName: string) => {
    if (senderName.includes('Bibi')) return { name: "Iranian_Nuclear_Threat_Assessment.pptx", type: 'pptx' };
    if (senderName.includes('Mamdami')) return { name: "Consulting_Invoice_NOV21.pdf", type: 'pdf' };
    if (senderName.includes('Kim')) return { name: "Rocket_Launch_Codes_DO_NOT_SHARE.pdf", type: 'pdf' };
    if (senderName.includes('Vlad')) return { name: "Honey_Supply_Contract.pdf", type: 'pdf' };
    if (senderName.includes('Don Jr')) return { name: "Hunting_Map_Secret.pdf", type: 'pdf' };
    if (senderName.includes('Melania')) return { name: "donny_and_jeff_naked_2025.jpg", type: 'jpg' };
    return { name: "Document.pdf", type: 'pdf' };
  };

  const generatePDF = (filename: string, sender: string) => {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      if (sender.includes('Mamdami')) {
          doc.setTextColor(255, 0, 0);
          doc.text("MAMDAMI & ASSOCIATES", 20, 20);
          doc.setFontSize(12);
          doc.setTextColor(100);
          doc.text("NYC • Swagger Dept • The Subway", 20, 28);
          
          // Invoice Box
          doc.setDrawColor(0);
          doc.setFillColor(240, 240, 240);
          doc.rect(20, 40, 170, 30, "F");
          doc.setFontSize(16);
          doc.setTextColor(0);
          doc.text("INVOICE #9991", 30, 55);
          doc.setFontSize(10);
          doc.text(`Date: ${new Date().toLocaleDateString()}`, 140, 55);
          
          // Line Items
          let y = 90;
          doc.setFont("helvetica", "normal");
          doc.text("Service Description", 20, y);
          doc.text("Amount", 160, y);
          doc.line(20, y+2, 190, y+2);
          y += 15;
          
          const items = [
              { desc: "Strategic Vibes Consulting (Urgent)", price: "$50,000.00" },
              { desc: "Diet Coke Procurement (Logistics)", price: "$12,500.00" },
              { desc: "Rat Mediation Services (Negotiations)", price: "$5,000.00" },
              { desc: "Astrology Consultation for Summit Date", price: "$2,500.00" },
              { desc: '"Swagger" Surcharge (15%)', price: "$10,500.00" }
          ];

          items.forEach(item => {
              doc.text(item.desc, 20, y);
              doc.text(item.price, 160, y);
              y += 10;
          });
          
          doc.line(20, y+5, 190, y+5);
          doc.setFont("helvetica", "bold");
          doc.text("TOTAL DUE:", 120, y+15);
          doc.text("$80,500.00", 160, y+15);

          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text("Payment Terms: Cash in a duffel bag behind the Wendy's.", 20, y+30);
      } else {
          doc.text("TOP SECRET DOCUMENT", 20, 20);
          doc.setFontSize(12);
          doc.text(`From: ${sender}`, 20, 30);
          doc.text(`To: Donald J.`, 20, 38);
          doc.line(20, 45, 190, 45);
          
          doc.setFontSize(11);
          doc.text("The contents of this document are classified.", 20, 60);
          doc.text("Do not share with the press.", 20, 66);
      }
      
      doc.save(filename);
  };

  const generatePPTX = async (filename: string) => {
    const pptx = new PptxGenJS();
    
    // Slide 1: Title
    let slide = pptx.addSlide();
    slide.background = { color: "F1F1F1" };
    slide.addText("THE IRANIAN THREAT", { x: 1.5, y: 1.5, fontSize: 36, color: "0038b8", bold: true, align: "center" });
    slide.addText("A Presentation by Benjamin Netanyahu", { x: 1.5, y: 2.5, fontSize: 18, color: "363636", align: "center" });
    
    // Slide 2: The Bomb Diagram
    slide = pptx.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addText("THE RED LINE", { x: 0.5, y: 0.5, fontSize: 24, bold: true });
    
    // Draw a rough "Bomb" using shapes
    slide.addShape(pptx.ShapeType.roundRect, { x: 3, y: 2, w: 4, h: 3, fill: { color: "000000" } }); // Body
    slide.addShape(pptx.ShapeType.rect, { x: 4.5, y: 1.5, w: 1, h: 0.5, fill: { color: "000000" } }); // Neck
    slide.addShape(pptx.ShapeType.line, { x: 5, y: 1.5, w: 0.5, h: -0.5, line: { color: "000000", width: 2 } }); // Fuse
    slide.addShape(pptx.ShapeType.star5, { x: 5.3, y: 0.8, w: 0.5, h: 0.5, fill: { color: "FF0000" } }); // Spark

    // The Red Line
    slide.addShape(pptx.ShapeType.line, { x: 2, y: 2.8, w: 6, h: 0, line: { color: "FF0000", width: 5, dashType: 'dash' } });
    slide.addText("90%", { x: 7.5, y: 2.8, color: "FF0000", fontSize: 14, bold: true });
    
    // Labels
    slide.addText("Stage 1: Enrichment", { x: 3.2, y: 4, color: "FFFFFF", fontSize: 12 });
    slide.addText("Stage 2: The Red Line", { x: 3.2, y: 2.5, color: "FF0000", fontSize: 12, bold: true });

    // Slide 3
    slide = pptx.addSlide();
    slide.addText("CONCLUSION", { x: 1, y: 1, fontSize: 30, bold: true });
    slide.addText("We need more space lasers.", { x: 1, y: 2, fontSize: 18 });

    await pptx.writeFile({ fileName: filename });
  };

  const handleDownload = async (fileName: string, sender: string) => {
      setIsGeneratingFile(true);
      
      if (fileName.endsWith('.pptx')) {
          await generatePPTX(fileName);
      } else if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
          // For image files, download from public folder
          const a = document.createElement('a');
          a.href = `/${fileName}`;
          a.download = fileName;
          a.click();
      } else {
          generatePDF(fileName, sender);
      }
      
      setIsGeneratingFile(false);
  };

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF9F8] text-gray-400">
        <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-4 shadow-inner">
            <img src="https://illustrations.popsy.co/gray/work-from-home.svg" alt="Select Email" className="w-32 h-32 opacity-60" />
        </div>
        <p className="text-lg font-medium">Select an item to read</p>
        <p className="text-sm">Click here to always select the first item in the list</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 shrink-0 bg-white">
        <div className="flex items-center gap-1 text-gray-600">
          <button 
            className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm font-medium text-blue-700 border border-transparent hover:border-gray-200"
            onClick={() => onReply(email)}
          >
            <Reply className="h-4 w-4" />
            Reply
          </button>
          <button 
            onClick={() => onReplyAll(email)}
            className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm font-medium text-gray-600 hover:text-blue-700"
          >
            <ReplyAll className="h-4 w-4" />
            Reply all
          </button>
          <button 
            onClick={() => onForward(email)}
            className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm font-medium text-gray-600 hover:text-blue-700"
          >
            <Forward className="h-4 w-4" />
            Forward
          </button>
           <div className="h-5 w-px bg-gray-300 mx-2"></div>
            <button 
                onClick={() => onDelete(email.id)}
                className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600" title="Delete">
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <Printer className="h-4 w-4" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded text-gray-500">
                <MoreHorizontal className="h-4 w-4" />
            </button>
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Subject & Header */}
        <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
                <h1 className="text-xl font-semibold text-gray-900 leading-tight">{email.subject}</h1>
                <div className="flex gap-2">
                     {/* AI Summary Button */}
                    <button 
                        onClick={handleSummarize}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 text-xs font-medium hover:shadow-sm transition-all"
                    >
                        <Sparkles className="h-3 w-3" />
                        {isSummarizing ? 'Thinking...' : summary ? 'Summarized' : 'Copilot Summary'}
                    </button>
                </div>
            </div>

            {/* AI Summary Box */}
            {summary && (
                <div className="mb-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-gray-700 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 mb-2 text-blue-800 font-semibold text-xs uppercase tracking-wide">
                        <Sparkles className="h-3 w-3" />
                        AI Summary
                    </div>
                    <div className="leading-relaxed whitespace-pre-line">
                        {summary}
                    </div>
                </div>
            )}

            {/* Sender Info */}
            <div className="flex items-start gap-3">
                <img src={email.from.avatar || `https://ui-avatars.com/api/?name=${email.from.name}`} className="w-10 h-10 rounded-full" alt="Avatar" />
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-gray-900 text-sm">{email.from.name}</span>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setIsLiked(!isLiked)}
                                className={`p-1 rounded hover:bg-gray-100 transition-colors ${isLiked ? 'text-blue-600' : 'text-gray-400'}`}
                            >
                                <ThumbsUp className={`h-4 w-4 ${isLiked ? 'fill-blue-600' : ''}`} />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                <Reply className="h-4 w-4" />
                            </button>
                            <span className="text-xs text-gray-500">{format(new Date(email.date), 'EEE M/d/yyyy h:mm a')}</span>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                        To: {email.to.map(u => u.name).join(', ')}
                    </div>
                </div>
            </div>
        </div>

        {/* Attachments */}
        {email.hasAttachments && (
            <div className="mb-6 py-3 border-y border-gray-100">
                {(() => {
                    const { name, type } = getAttachmentDetails(email.from.name);
                    return (
                        <>
                            {(type === 'png' || type === 'jpg' || type === 'jpeg') ? (
                                <div className="mb-4">
                                    <img 
                                        src={`/${name}`} 
                                        alt={name}
                                        className="max-w-full h-auto rounded border border-gray-200 shadow-sm"
                                        style={{ maxHeight: '400px' }}
                                    />
                                </div>
                            ) : null}
                            <div 
                                onClick={() => !isGeneratingFile && handleDownload(name, email.from.name)}
                                className="inline-flex items-center gap-3 p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer max-w-[300px] transition-colors group select-none"
                                title="Click to download"
                            >
                                <div className={`p-2 rounded group-hover:opacity-80 transition-opacity ${
                                    type === 'pptx' ? 'bg-orange-100 text-orange-600' : 
                                    (type === 'png' || type === 'jpg' || type === 'jpeg') ? 'bg-blue-50 text-blue-600' : 
                                    'bg-red-50 text-red-500'
                                }`}>
                                    {type === 'pptx' ? <Presentation className="h-5 w-5" /> : 
                                     (type === 'png' || type === 'jpg' || type === 'jpeg') ? <FileIcon className="h-5 w-5" /> : 
                                     <FileText className="h-5 w-5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate text-gray-700 group-hover:text-blue-700 transition-colors">
                                        {name}
                                    </p>
                                    <p className="text-[10px] text-gray-400 group-hover:text-gray-500">
                                        {type === 'pptx' ? '2.4 MB' : (type === 'png' || type === 'jpg' || type === 'jpeg') ? '1.2 MB' : '145 KB'}
                                    </p>
                                </div>
                                {isGeneratingFile ? (
                                    <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                ) : (
                                    <Download className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                )}
                            </div>
                        </>
                    );
                })()}
            </div>
        )}

        {/* Body */}
        <div className="prose prose-sm max-w-none text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
            {email.body}
        </div>
        
        <div className="mt-12 pt-4 border-t border-gray-200 flex gap-2">
            <button 
                onClick={() => onReply(email)}
                className="px-4 py-2 border border-gray-300 rounded-sm text-sm text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-2"
            >
                <Reply className="h-4 w-4" /> Reply
            </button>
            <button 
                onClick={() => onForward(email)}
                className="px-4 py-2 border border-gray-300 rounded-sm text-sm text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-2"
            >
                <Forward className="h-4 w-4" /> Forward
            </button>
        </div>

      </div>
    </div>
  );
};

export default ReadingPane;