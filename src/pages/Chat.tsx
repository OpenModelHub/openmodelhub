import React from 'react'
import ChatDisplayArea from '../components/Chat/ChatDisplayArea'
import ChatArea from '../components/Chat/ChatTextArea'
import { GlobalContext } from '.'
import ChatHeader from '../components/Chat/ChatHeader'

interface ChatViewProps {
  model: string
}

const ChatPage: React.FC<ChatViewProps> = ({ model }) => {
  const { messages, models } = React.useContext(GlobalContext)
  return (
    <>
      {/* heading, titles etc */}
      <div className='sticky top-0 z-10 pt-3 py-2 bg-primary-100'>
        <ChatHeader model={models[model]} />
      </div>
      {/* texts */}
      <div className='grow relative mb-10'>
        <ChatDisplayArea messages={messages[model]} />
        {/* footer, textarea etc */}
      </div>
      <div className='sticky bottom-0 pb-4 py-2 bg-primary-100'>
        <ChatArea currentModel={model} />
      </div>
    </>
  )
}

export default ChatPage
