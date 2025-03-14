import React from 'react'
import ChatBubble from './ChatBubble'
import Typography from '../Typography'

export interface ChatDisplayMessage {
  message: string
  role: ChatRole
  loading: boolean
}

interface ChatDisplayProps {
  messages: ChatDisplayMessage[]
}

const EmptyChat = () => {
  return (
    <div className='grow flex select-none flex-col items-center mt-40'>
      <div className='text-center'>
        <Typography variant='h1'>*cricket noises*</Typography>
        <Typography variant='body1'>
          Type something to quickstart your conversation!
        </Typography>
      </div>
    </div>
  )
}

const ChatDisplayArea: React.FC<ChatDisplayProps> = ({ messages }) => {
  return (
    <div className='grow overflow-y-auto max-h-screen pb-10'>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <ChatBubble
            key={index}
            loading={msg.loading}
            message={msg.message}
            role={msg.role}
          />
        ))
      ) : (
        <EmptyChat />
      )}
    </div>
  )
}

export default ChatDisplayArea
