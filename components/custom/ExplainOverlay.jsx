'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ActionContext } from '@/context/ActionContext';
import { MessagesContext } from '@/context/MessagesContext';
import { X, Sparkles, Loader2 } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

function ExplainOverlay() {
  const { action, setAction } = useContext(ActionContext);
  const { messages } = useContext(MessagesContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    setOpen(action?.actionType === 'explain');
    if (action?.actionType === 'explain') {
      generateExplanation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  const close = () => {
    setOpen(false);
    setAction({ actionType: '' });
  };

  const generateExplanation = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/explain', { messages });
      setContent(res?.data?.result || '');
    } catch (err) {
      console.error('Explain failed', err);
      const serverMsg = err?.response?.data?.error || err?.message || 'Failed to generate explanation';
      const details = err?.response?.data?.details;
      toast(`${serverMsg}${details ? `: ${details}` : ''}`);
      setContent('Sorry, I could not generate the explanation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-3xl mx-4 rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-semibold">Explanation (HL + LL)</h3>
          </div>
          <button onClick={close} className="p-2 rounded-md hover:bg-gray-800">
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center gap-2 text-gray-300">
              <Loader2 className="w-4 h-4 animate-spin" /> Generating...
            </div>
          ) : (
            <ReactMarkdown className="prose prose-invert max-w-none prose-headings:mt-4 prose-headings:mb-2 prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-li:my-1 prose-pre:whitespace-pre-wrap">
              {content}
            </ReactMarkdown>
          )}
        </div>
        <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-400">Uses your current chat context to craft HL and LL designs.</div>
          <button onClick={generateExplanation} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-2 rounded-md">
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExplainOverlay;


