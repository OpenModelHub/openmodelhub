import React from 'react'
import Typography from '../Typography'
import {
  CheckIcon,
  Square2StackIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import Button from '../Button'
import { GlobalContext } from '../../pages/preview'
import { streamGenerateChat } from '../../lib/ollamaChat'
import { ChatDisplayMessage } from './ChatDisplayArea'

interface ChatBubbleProps {
  message: string
  role: ChatRole
  loading: boolean
}

const COPY_TIMEOUT = 750
const ChatBubble: React.FC<ChatBubbleProps> = ({ message, role, loading }) => {
  const { messages, setMessages, page } = React.useContext(GlobalContext)
  const currentModel = page.slice(5)
  const [copyLoading, setCopyLoading] = React.useState(false)
  const bubbleClasses =
    role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'

  const alignmentClass = role === 'user' ? 'self-end mb-4' : 'self-start'

  const copyToClipboard = () => {
    if (copyLoading) return
    navigator.clipboard.writeText(message)
    setCopyLoading(true)
    // pushNotification('info', 'Text copied to clipboard.')

    setTimeout(() => setCopyLoading(false), COPY_TIMEOUT)
  }

  const appendLastMessage = (res: ChatCompletionResponse) => {
    setMessages((prev) => {
      const len = prev[currentModel].length
      const appended = prev[currentModel][len - 1].message + res.message.content
      return {
        ...prev,
        [currentModel]: [
          ...prev[currentModel].slice(0, len - 1),
          {
            message: appended,
            role: res.message.role,
            loading: !res.done,
          },
        ],
      }
    })
  }

  const resubmitMessage = async () => {
    const curMessages: Record<string, ChatDisplayMessage[]> = {
      ...messages,
      [currentModel]: [
        ...messages[currentModel].slice(0, messages[currentModel].length - 1),
      ],
    }

    setMessages(curMessages)

    const res = await streamGenerateChat(
      currentModel,
      curMessages[currentModel].map((x) => ({
        role: x.role,
        content: x.message,
      }))
    )

    const appendedAssistant: Record<string, ChatDisplayMessage[]> = {
      ...curMessages,
      [currentModel]: [
        ...curMessages[currentModel],
        {
          message: '',
          role: 'assistant',
          loading: true,
        },
      ],
    }

    setMessages(appendedAssistant)

    // @ts-expect-error AsyncIterator must be implemented globally here
    for await (const chunk of res) {
      const tx = new TextDecoder().decode(chunk)
      const x = JSON.parse(tx)
      appendLastMessage(x)
    }
  }

  return (
    <div className='flex flex-col group mb-1'>
      {loading && <ArrowPathIcon className='w-5 animate-spin mb-2' />}

      <div className={`relative max-w-2xl flex flex-row ${alignmentClass}`}>
        {role === 'user' && (
          <div className='duration-50 items-center justify-center opacity-0 group-hover:opacity-100 flex mr-2'>
            <div>
              <Button
                variant='icon'
                size='small'
                onClick={() => copyToClipboard()}
              >
                {!copyLoading ? (
                  <Square2StackIcon className='w-6' />
                ) : (
                  <CheckIcon className='w-6' />
                )}
              </Button>
            </div>
          </div>
        )}
        <div
          className={`py-2 px-4 rounded-xl whitespace-pre-wrap ${bubbleClasses}`}
        >
          {loading && (
            <Typography variant='caption' element='span'>
              Thinking...
            </Typography>
          )}
          {message && <Typography variant='body1'>{message.trim()}</Typography>}
        </div>
      </div>

      {role !== 'user' && !loading && (
        <div className='duration-50 opacity-0 group-hover:opacity-100 flex mt-2'>
          <Button variant='icon' size='small' onClick={() => copyToClipboard()}>
            {!copyLoading ? (
              <Square2StackIcon className='w-5' />
            ) : (
              <CheckIcon className='w-5' />
            )}
          </Button>
          <Button variant='icon' size='small' onClick={() => resubmitMessage()}>
            <ArrowPathIcon className='w-5' />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ChatBubble
