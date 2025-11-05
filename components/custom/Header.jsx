'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { Button } from '../ui/button';
import Lookup from '@/data/Lookup';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { Download, Menu, Rocket, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import SignInDialog from './SignInDialog';

function Header({ onMenuClick }) {
  const { userDetail, setUserDetail, isLoading } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now()
    })
  }

  return (
    <div className="p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link href={'/'}>
          <Image src={'/logo1.png'} alt="Nova AI" width={80} height={80} />
        </Link>
      </div>
      {isLoading ? null : !userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>Sign In</Button>
          <Button
            className="text-white bg-blue-500/80 backdrop-blur-sm"
            onClick={() => setOpenDialog(true)}
          >
            Get Started
          </Button>
          <SignInDialog openDialog={openDialog} closeDialog={setOpenDialog} />
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {userDetail?.isDemo && (
            <Button
              variant="outline"
              onClick={() => {
                // Remove user and chats from localStorage
                localStorage.removeItem('user');
                localStorage.removeItem('messages');
                // Optionally clear context messages if available
                if (typeof window !== 'undefined') {
                  window.location.href = '/';
                }
              }}
            >
              Logout
            </Button>
          )}
          {pathname.includes('/workspace/') && (
            <>
              <Button variant="ghost" onClick={() => onActionBtn('export')}>
                <Download /> Export
              </Button>
              <Button
                className="text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/30"
                onClick={() => onActionBtn('explain')}
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> Explain
              </Button>
              <Button
                onClick={() => onActionBtn('deploy')}
                className="text-white bg-blue-500/80 backdrop-blur-sm"
              >
                <Rocket /> Deploy
              </Button>
            </>
          )}
          {userDetail && (
            userDetail?.picture ? (
              <button
                onClick={onMenuClick}
                aria-label="Open sidebar"
                className="focus:outline-none"
              >
                <Image
                  src={userDetail.picture}
                  alt="userImage"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer object-cover"
                />
              </button>
            ) : (
              <button
                onClick={onMenuClick}
                aria-label="Open sidebar"
                className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
