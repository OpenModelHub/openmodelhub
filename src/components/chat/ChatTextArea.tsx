import TextareaAutosize from 'react-textarea-autosize'
import { ArrowTurnDownRightIcon } from '@heroicons/react/24/solid'
import Button from '../Button'
import Typography from '../Typography'
import React from 'react'
import { streamGenerateResponse } from '../../lib/ollamaChat'
import { GlobalContext } from '../../pages/preview'

interface ChatAreaProps {
  currentModel: string
}

const ChatArea: React.FC<ChatAreaProps> = ({ currentModel }) => {
  const { messages, setMessages } = React.useContext(GlobalContext)
  const [promptText, setPrompt] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const appendLastMessage = (res: GenerateCompletionResponse) => {
    setMessages((prev) => {
      const len = prev[currentModel].length
      const appended = prev[currentModel][len - 1].message + res.response
      return {
        ...prev,
        [currentModel]: [
          ...prev[currentModel].slice(0, len - 1),
          {
            message: appended,
            sender: 'bot',
            loading: !res.done,
            context: res.context ? res.context : [],
          },
        ],
      }
    })
  }

  const submitPrompt = async () => {
    if (!promptText) return
    setLoading(true)
    const prevContext = messages[currentModel].length
      ? messages[currentModel][messages[currentModel].length - 1].context
      : []
    setMessages((prev) => ({
      ...prev,
      [currentModel]: [
        ...prev[currentModel],
        {
          message: promptText,
          sender: 'user',
          loading: false,
          context: [],
        },
        {
          message: '',
          sender: 'bot',
          loading: true,
          context: [],
        },
      ],
    }))

    const res = await streamGenerateResponse(
      currentModel,
      promptText,
      prevContext
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
      textareaRef.current?.focus()
    }, 10)
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
    <div className='disabled:opacity-50 disabled:cursor-not-allowed'>
      <TextareaAutosize
        autoFocus
        ref={textareaRef}
        minRows={2}
        maxRows={4}
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
        className='disabled:opacity-50 disabled:cursor-not-allowed absolute top-5 right-3'
      >
        <ArrowTurnDownRightIcon className='w-6' />
      </Button>

      <Typography variant='caption'>
        Press <b>Ctrl+Enter</b> to send
      </Typography>
    </div>
  )
}

export default ChatArea
