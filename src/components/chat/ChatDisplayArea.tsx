import React from 'react'
import ChatBubble from './ChatBubble'

export interface ChatDisplayMessage {
  message: string
  sender: 'user' | 'bot'
  loading: boolean
  context: TokenContext
}

interface ChatDisplayProps {
  messages: ChatDisplayMessage[]
}

const ChatDisplayArea: React.FC<ChatDisplayProps> = ({ messages }) => {
  return (
    <>
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          loading={msg.loading}
          message={msg.message}
          sender={msg.sender}
        />
      ))}
    </>
  )
}

export default ChatDisplayArea
