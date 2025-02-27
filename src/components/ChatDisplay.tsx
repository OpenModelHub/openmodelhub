import React from 'react'
import ChatBubble from './ChatBubble'

interface ChatMessage {
  message: string
  sender: 'user' | 'bot'
}

interface ChatDisplayProps {
  messages: ChatMessage[]
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({ messages }) => {
  return (
    <div className='flex flex-col-reverse overflow-y-auto'>
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.message} sender={msg.sender} />
      ))}
    </div>
  )
}

export default ChatDisplay
