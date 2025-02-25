import React from 'react'

interface ChatBubbleProps {
  message: string
  sender: 'user' | 'bot'
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, sender }) => {
  const bubbleClasses =
    sender === 'user'
      ? 'bg-blue-500 rounded-tr-none text-white self-end'
      : 'bg-gray-300 text-black self-start'

  return (
    <div
      className={`py-2 px-4 rounded-xl max-w-2xl whitespace-pre-wrap my-2 ${bubbleClasses}`}
    >
      {message}
    </div>
  )
}

export default ChatBubble
