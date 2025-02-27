import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface ChatBubbleProps {
  message: string
  sender: 'user' | 'bot'
  loading: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  loading,
}) => {
  const bubbleClasses =
    sender === 'user'
      ? 'bg-blue-500 rounded-tr-none text-white self-end'
      : 'bg-gray-300 text-black self-start'

  return (
    <>
      <div
        className={`py-2 px-4 relative rounded-xl max-w-2xl whitespace-pre-wrap my-2 ${bubbleClasses}`}
      >
        {loading && (
          <ArrowPathIcon className='w-5 animate-spin absolute -top-8 left-0 z-50' />
        )}

        {message}
      </div>
    </>
  )
}

export default ChatBubble
