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

  const updateMessages = (responseToAppend: string) => {
    setMessages((prev) => {
      prev[prev.length - 1].message += responseToAppend
      return prev
    })
  }

  const submitPrompt = async () => {
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
    // updateMessages('hello world')
  }

  return (
    <div>
      <TextareaAutosize
        maxRows={4}
        value={promptText}
        onChange={(e) => setPrompt(e.target.value)}
        className='w-full px-6 py-4 rounded-xl outline-none placeholder-primary-900 bg-primary-300 text-primary-900 resize-none'
        placeholder='Type a Message...'
      />

      <Button
        variant='contained'
        onClick={submitPrompt}
        className='absolute top-5 right-3'
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
