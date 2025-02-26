import React from 'react'
import ChatBubble from './ChatBubble'

export interface ChatDisplayMessage {
  message: string
  sender: 'user' | 'bot'
}

interface ChatDisplayProps {
  messages: ChatDisplayMessage[]
}

const ChatDisplayArea: React.FC<ChatDisplayProps> = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <ChatBubble key={index} message={msg.message} sender={msg.sender} />
      ))}
    </>
  )
}

export default ChatDisplayArea
