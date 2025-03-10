import TextareaAutosize from 'react-textarea-autosize'
import { ArrowTurnDownRightIcon } from '@heroicons/react/24/solid'
import Button from '../Button'
import Typography from '../Typography'
import React from 'react'
import { streamGenerateChat } from '../../lib/ollamaChat'
import { GlobalContext } from '../../pages/preview'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { ChatDisplayMessage } from './ChatDisplayArea'

interface ChatAreaProps {
  currentModel: string
}

const ClearChatButton = ({ clearChat }: { clearChat: () => void }) => {
  return (
    <div className='grid justify-center'>
      <Button
        className='w-fit space-x-2 shadow-md flex'
        variant='outlined'
        onClick={() => clearChat()}
      >
        <ChatBubbleOvalLeftEllipsisIcon className='w-4.5' />
        <Typography variant='body1'>New Chat</Typography>
      </Button>
    </div>
  )
}

const ChatArea: React.FC<ChatAreaProps> = ({ currentModel }) => {
  const chatTextareaRef = React.createRef<HTMLTextAreaElement>()
  const { messages, setMessages } = React.useContext(GlobalContext)
  const [promptText, setPrompt] = React.useState('')
  const [loading, setLoading] = React.useState(false)

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

  const submitPrompt = async () => {
    if (!promptText) return
    setLoading(true)
    const curMessages: Record<string, ChatDisplayMessage[]> = {
      ...messages,
      [currentModel]: [
        ...messages[currentModel],
        {
          message: promptText,
          role: 'user',
          loading: false,
        },
        {
          message: '',
          role: 'assistant',
          loading: true,
        },
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

    // @ts-expect-error AsyncIterator must be implemented globally here
    for await (const chunk of res) {
      const tx = new TextDecoder().decode(chunk)
      const x = JSON.parse(tx)
      appendLastMessage(x)
    }

    setPrompt('')
    setLoading(false)
    // need to wait for the undisabled textarea to be rendered first, so we need a timeout.
    setTimeout(() => {
      chatTextareaRef.current?.focus()
    }, 10)
  }

  const clearChat = () => {
    setMessages((prev) => {
      return { ...prev, [currentModel]: [] }
    })
  }

  const keystrokeSend = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey && !loading && promptText != '')
      submitPrompt()
  }

  React.useEffect(() => {
    document.addEventListener('keydown', keystrokeSend)
    return () => document.removeEventListener('keydown', keystrokeSend)
  })

  return (
    <>
      <ClearChatButton clearChat={clearChat} />
      <div className='disabled:opacity-50 disabled:cursor-not-allowed mt-4 relative'>
        <TextareaAutosize
          autoFocus
          ref={chatTextareaRef}
          minRows={2}
          maxRows={8}
          value={promptText}
          disabled={loading}
          onChange={(e) => setPrompt(e.target.value)}
          className='disabled:opacity-50 disabled:cursor-not-allowed w-full px-6 py-4 rounded-xl outline-none placeholder-primary-900 bg-primary-300 text-primary-900 resize-none'
          placeholder='Type a Message...'
        />

        <Button
          variant='contained'
          onClick={submitPrompt}
          disabled={loading}
          className='disabled:opacity-50 disabled:cursor-not-allowed absolute top-3 right-3'
        >
          <ArrowTurnDownRightIcon className='w-6' />
        </Button>

        <Typography variant='caption'>
          Press <b>Ctrl+Enter</b> to send
        </Typography>
      </div>
    </>
  )
}

export default ChatArea
