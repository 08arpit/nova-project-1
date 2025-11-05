'use client';
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Loader2, Sparkles } from 'lucide-react';
import React, { useContext, useState } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

function Hero() {
  const [userInput, setUserInput] = useState('');
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }

    try {
      setLoading(true);
      console.log('User Detail:', userDetail);
      
      if (!userDetail._id) {
        console.error('No user ID found in userDetail');
        toast.error('User ID not found. Please try signing in again.');
        return;
      }

      const msg = {
        role: 'user',
        content: input,
      };

      const workspaceData = {
        messages: [msg],
        user: userDetail._id,
      };
      
      console.log('Creating workspace with data:', workspaceData);

      const workspaceId = await CreateWorkspace(workspaceData);

      if (workspaceId) {
        router.push('/workspace/' + workspaceId);
      } else {
        toast.error('Failed to create workspace');
      }
    } catch (error) {
      console.error('Error creating workspace:', error);
      toast.error('Failed to create workspace: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim()) {
        onGenerate(userInput);
      }
    }
  };

  const handleEnhance = async () => {
    if (!userInput.trim()) {
      toast("Please enter a prompt first");
      return;
    }
    setEnhancing(true);
    try {
      const response = await axios.post('/api/enhance-prompt', {
        prompt: userInput,
      });
      const enhanced = response.data?.enhanced || userInput;
      setUserInput(enhanced);
      toast.success("Prompt enhanced successfully!");
    } catch (err) {
      console.error('Enhance failed:', err);
      const serverMsg = err?.response?.data?.error || err?.message || 'Failed to enhance prompt';
      toast.error(serverMsg);
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
          <span className="ml-4 text-lg text-white font-medium">Creating workspace...</span>
        </div>
      )}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 mt-20">
        <h2 className="font-bold text-4xl text-center mt-4">{Lookup.HERO_HEADING}</h2>
        <p className="text-gray-300 font-medium text-center">{Lookup.HERO_DESC}</p>
        <div
          className="p-5 border rounded-xl w-full mt-3"
          style={{
            backgroundColor: Lookup.COLORS.BACKGROUND,
          }}
        >
          <div className="flex gap-2 items-start">
            <textarea
              placeholder={Lookup.INPUT_PLACEHOLDER}
              className="outline-none bg-transparent w-full h-28 max-h-56 resize-none text-neutral-200"
              onChange={(event) => setUserInput(event.target.value)}
              onKeyPress={handleKeyPress}
              value={userInput}
            />
            <div className="flex flex-col gap-2">
              {userInput && (
                <button
                  onClick={handleEnhance}
                  disabled={enhancing}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 w-10 h-10 rounded-md transition-colors flex items-center justify-center"
                  title="Enhance prompt"
                >
                  {enhancing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </button>
              )}
              {userInput && (
                <ArrowRight
                  onClick={() => onGenerate(userInput)}
                  className="bg-blue-500 p-2 w-10 h-10 rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
                />
              )}
            </div>
          </div>
          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 w-full">
          {Lookup.SUGGSTIONS.map((suggestion, index) => (
            <h2
              className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
              key={index}
              onClick={() => onGenerate(suggestion)}
            >
              {suggestion}
            </h2>
          ))}
        </div>
      </div>

      <SignInDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;
