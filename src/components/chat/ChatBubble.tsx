import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import Typography from '../Typography'

interface ChatBubbleProps {
  message: string
  role: ChatRole
  loading: boolean
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role, loading }) => {
  const bubbleClasses =
    role === 'user'
      ? 'bg-blue-500 text-white self-end'
      : 'bg-gray-300 text-black self-start'

  return (
    <>
      <div className='relative'>
        {loading && <ArrowPathIcon className='w-5 animate-spin' />}
      </div>

      <div
        className={`py-2 px-4 relative rounded-xl max-w-2xl whitespace-pre-wrap my-2 ${bubbleClasses}`}
      >
        {loading && (
          <Typography variant='caption' element='span'>
            Thinking...
          </Typography>
        )}
        {message && <Typography variant='body1'>{message.trim()}</Typography>}
      </div>
    </>
  )
}

export default ChatBubble
