import TextareaAutosize from 'react-textarea-autosize'
import { ArrowTurnDownRightIcon } from '@heroicons/react/24/solid'
import Button from './Button'
import Typography from './Typography'
import React, { Dispatch, SetStateAction } from 'react'
import { ChatDisplayMessage } from './ChatDisplayArea'
import { StreamGenerateRequest } from '../lib/ollamaChat'

interface ChatAreaProps {
  currentModel: string
  setMessages: Dispatch<SetStateAction<ChatDisplayMessage[]>>
}

const ChatArea: React.FC<ChatAreaProps> = ({ currentModel, setMessages }) => {
  const [promptText, setPrompt] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const updateMessages = (responseToAppend: string) => {
    setMessages((prev) => {
      const nwAppend = prev[prev.length - 1].message + responseToAppend

      return [
        ...prev.slice(0, prev.length - 1),
        {
          message: nwAppend,
          sender: 'bot',
        },
      ]
    })
  }

  const submitPrompt = async () => {
    setLoading(true)
    setMessages((prev) => [
      ...prev,
      {
        message: promptText,
        sender: 'user',
      },
      {
        message: '',
        sender: 'bot',
      },
    ])

    for await (const chunkText of StreamGenerateRequest(
      currentModel,
      promptText
    )) {
      updateMessages(chunkText.response)
    }

    setPrompt('')
    setLoading(false)
  }

  return (
    <div className='disabled:opacity-50 disabled:cursor-not-allowed'>
      <TextareaAutosize
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
