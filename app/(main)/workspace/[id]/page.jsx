import ChatView from '@/components/custom/ChatView'
import CodeView from '@/components/custom/CodeView'
import ExplainOverlay from '@/components/custom/ExplainOverlay'
import React from 'react'

function Workspace() {
  return (
    <div className='p-3 pr-10 h-[calc(100vh-80px)] flex'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 flex-1'>
        <div className="flex flex-col">
            <ChatView />
        </div>
        <div className='col-span-2 flex flex-col flex-1'>
            <CodeView />
        </div>

    </div>
    <ExplainOverlay />
    </div>
  )
}

export default Workspace