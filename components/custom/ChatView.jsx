'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { ActionContext } from '@/context/ActionContext';
import { api } from '@/convex/_generated/api';
import Lookup from '@/data/Lookup';
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { ArrowRight, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
};

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);
  const UpdateToken = useMutation(api.users.UpdateToken);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role == 'user' && !loading) {
        GetAiResponse();
      }
    }
  }, [messages, loading]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  /**
   * Used to Get Workspace data using Workspace ID
   */
  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
  };

  const GetAiResponse = async () => {
    setLoading(true);
    // Switch to code view when user sends a message
    setAction({ actionType: 'code' });
    try {
    const PROMPT = JSON.stringify(messages) + Lookup.PROMPT.CHAT_PROMPT;
    console.log({ PROMPT });
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT,
    });
    console.log(result.data.result);
    const aiResp = {
      role: 'ai',
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResp]);
    await UpdateMessages({
      messages: [...messages, aiResp],
      workspaceId: id,
    });
    console.log("LEN", countToken(JSON.stringify(aiResp)));
    const token = Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      setUserDetail(prev => ({ ...prev, token: token }));
    await UpdateToken({
      token: token,
      userId: userDetail?._id
      });
    } catch (err) {
      console.error('Chat generation failed:', err);
      const serverMsg = err?.response?.data?.error || err?.message || 'Failed to get AI response';
      const details = err?.response?.data?.details;
      toast(`${serverMsg}${details ? `: ${details}` : ''}`);
    } finally {
    setLoading(false);
    }
  };

  const onGenerate = (input) => {
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setUserInput('');
  };

  return (
    <div className="relative h-[79.7vh] flex flex-col bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-800">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
        {messages?.length > 0 && messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 items-start ${msg?.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg?.role !== 'user' && (
              <div className="flex-shrink-0">
                <Image
                  src={'/logo1.png'}
                  alt="AI Assistant"
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-blue-500/20"
                />
              </div>
            )}
            <div
              className={`group relative max-w-[85%] ${msg?.role === 'user' ? 'order-1' : 'order-2'}`}
            >
              <div
                className={`rounded-xl text-[13px] leading-6 p-3 ${
                  msg?.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none' 
                    : 'bg-gray-800 text-neutral-200 rounded-bl-none border border-gray-700'
                }`}
              >
                <ReactMarkdown className="prose prose-invert max-w-none break-words whitespace-pre-line prose-p:my-1 prose-headings:my-2 prose-li:my-1 prose-pre:my-2 prose-code:text-[12px] prose-pre:text-[12px]">
                  {(msg?.content || '').replace(/\n{3,}/g, '\n\n')}
                </ReactMarkdown>
              </div>
              <div className={`absolute -bottom-1.5 ${msg?.role === 'user' ? 'right-0' : 'left-0'} w-3 h-3 overflow-hidden`}>
                <div className={`absolute w-3 h-3 transform rotate-45 ${
                  msg?.role === 'user' 
                    ? 'bg-blue-600 right-0' 
                    : 'bg-gray-800 left-0 border-r border-b border-gray-700'
                }`} />
              </div>
            </div>
            {msg?.role === 'user' && userDetail?.picture && (
              <div className="flex-shrink-0">
                <Image
                  src={userDetail?.picture}
                  alt="User"
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-blue-500/20"
                />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 items-center justify-start">
            <div className="flex-shrink-0">
              <Image
                src={'/logo1.png'}
                alt="AI Assistant"
                width={28}
                height={28}
                className="rounded-full ring-2 ring-blue-500/20"
              />
            </div>
            <div className="bg-gray-800 p-3 rounded-xl rounded-bl-none border border-gray-700">
              <div className="flex items-center gap-2">
                <Loader2Icon className="animate-spin w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs text-neutral-300">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="relative p-3 border-t border-gray-800 bg-gray-900">
        <div className="flex-1 relative">
          <textarea
            placeholder="What would you like to add or modify?"
            className="w-full outline-none bg-transparent resize-none text-[14px] leading-6 text-neutral-200 pr-12 rounded-lg"
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (userInput.trim()) {
                  onGenerate(userInput);
                }
              }
            }}
            value={userInput}
            rows={2}
            style={{
              maxHeight: '150px',
              overflowY: 'auto'
            }}
          />
          {userInput && (
            <button
              onClick={() => onGenerate(userInput)}
              className="absolute right-3 bottom-3 bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatView;
