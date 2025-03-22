import React from 'react'
import ChatBubble from './ChatBubble'
import Typography from '../Typography'
import { ChatDisplayMessage } from './ChatTypes'

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
    <div>
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
