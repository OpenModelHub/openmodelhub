import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/solid'
import Typography from '../Typography'
import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline'

interface ChatBubbleProps {
  message: string
  role: ChatRole
  loading: boolean
}

const COPY_TIMEOUT = 750
const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role, loading }) => {
  const [copyLoading, setCopyLoading] = React.useState(false)
  const bubbleClasses =
    role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'

  const alignmentClass = role === 'user' ? 'self-end' : 'self-start'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
    setCopyLoading(true)

    setTimeout(() => setCopyLoading(false), COPY_TIMEOUT)
  }

  return (
    <div className='flex flex-col group mb-1'>
      {loading && <ArrowPathIcon className='w-5 animate-spin mb-2' />}

      <div
        className={`py-2 px-4 relative rounded-xl max-w-2xl whitespace-pre-wrap ${bubbleClasses} ${alignmentClass}`}
      >
        {loading && (
          <Typography variant='caption' element='span'>
            Thinking...
          </Typography>
        )}
        {message && <Typography variant='body1'>{message.trim()}</Typography>}
      </div>

      <button
        className={`duration-50 end w-fit opacity-0 group-hover:opacity-100 mt-3 ${alignmentClass}`}
        onClick={() => copyToClipboard()}
      >
        {!copyLoading ? (
          <Square2StackIcon className='w-5' />
        ) : (
          <CheckIcon className='w-5' />
        )}
      </button>
    </div>
  )
}

export default ChatBubble
