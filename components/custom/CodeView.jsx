'use client';
import React, { useContext, useEffect, useState } from 'react';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import Lookup from '@/data/Lookup';
import { MessagesContext } from '@/context/MessagesContext';
// Prompt now in Lookup.PROMPT
import axios from 'axios';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { countToken } from './ChatView';
import { UserDetailContext } from '@/context/UserDetailContext';
import { toast } from 'sonner';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from '@/context/ActionContext';

function CodeView() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('code');
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    (action?.actionType == 'deploy' || action?.actionType == 'export') &&
      setActiveTab('preview');
  }, [action]);

  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateToken = useMutation(api.users.UpdateToken);

  useEffect(() => {
    id && GetFiles();
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    let mergedFils = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    // Ensure /App.js and /index.js are present
    if (!mergedFils['/App.js']) {
      console.warn('AI output missing /App.js, using default');
      mergedFils['/App.js'] = Lookup.DEFAULT_FILE['/App.js'];
    }
    if (!mergedFils['/index.js']) {
      console.warn('AI output missing /index.js, using default');
      mergedFils['/index.js'] = Lookup.DEFAULT_FILE['/index.js'];
    }
    setFiles(ensureValidFiles(mergedFils));
    setLoading(false);
  };

  useEffect(() => {
    if (messages?.length > 0) {
      console.log(messages);

      const role = messages[messages?.length - 1].role;
      if (role == 'user') {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    // return;
    setLoading(true);
    try {
      const PROMPT = `${Lookup.PROMPT.CODE_GEN_PROMPT}\n\nUser request and context:\n${JSON.stringify(messages)}`;
      console.log({ PROMPT });
      const result = await axios.post('/api/gen-ai-code', {
        prompt: PROMPT,
      });

      console.log(result?.data);
      const aiResp = result.data;
      if (aiResp?.error) {
        throw new Error(aiResp?.error + (aiResp?.details ? `: ${aiResp.details}` : ''));
      }
      let mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
      // Ensure /App.js and /index.js are present
      if (!mergedFiles['/App.js']) {
        console.warn('AI output missing /App.js, using default');
        mergedFiles['/App.js'] = Lookup.DEFAULT_FILE['/App.js'];
      }
      if (!mergedFiles['/index.js']) {
        console.warn('AI output missing /index.js, using default');
        mergedFiles['/index.js'] = Lookup.DEFAULT_FILE['/index.js'];
      }
      setFiles(ensureValidFiles(mergedFiles));
      await UpdateFiles({
        workspaceId: id,
        files: aiResp?.files,
      });
      const token =
        Number(userDetail?.token) - Number(countToken(JSON.stringify(aiResp)));
      setUserDetail((prev) => ({ ...prev, token: token }));
      await UpdateToken({
        token: token,
        userId: userDetail?._id,
      });
    } catch (err) {
      console.error('Code generation failed:', err);
      toast("Failed to generate code. Please try again or refine your prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-3 border-b border-gray-800">
        <div className="flex items-center gap-1 bg-gray-900/50 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'code'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            Code
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Preview
          </button>
        </div>
      </div>
      <SandpackProvider
        files={files}
        template="react"
        theme={'dark'}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
        options={{ externalResources: ['https://cdn.tailwindcss.com'] }}
      >
        <SandpackLayout>
          {activeTab == 'code' ? (
            <>
              <SandpackFileExplorer style={{ height: '70vh' }} />
              <SandpackCodeEditor style={{ height: '70vh' }} />
            </>
          ) : (
            <SandpackPreviewClient />
          )}
        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="p-8 bg-gray-900 bg-opacity-80 absolute top-0 w-full h-full flex justify-center items-center">
          <Loader2Icon className="animate-spin w-8 h-8 text-white" />
          <h2 className="text-sm ml-2">Generating your files...</h2>
        </div>
      )}
    </div>
  );
}

// Ensure all files are valid objects with a code property (string)
function ensureValidFiles(files) {
  const requiredFiles = ['/App.js', '/index.js'];
  for (const file of requiredFiles) {
    if (
      !files[file] ||
      typeof files[file] !== 'object' ||
      typeof files[file].code !== 'string'
    ) {
      files[file] = { code: Lookup.DEFAULT_FILE[file]?.code || '' };
    }
  }
  // Remove any files that are not objects with a code property
  Object.keys(files).forEach((key) => {
    if (!files[key] || typeof files[key].code !== 'string') {
      delete files[key];
    }
  });
  return files;
}

export default CodeView;
