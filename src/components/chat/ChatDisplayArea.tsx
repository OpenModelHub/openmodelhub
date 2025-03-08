import React from 'react'
import ChatBubble from './ChatBubble'
import Typography from '../Typography'
import Button from '../Button'
import { chatTextareaRef } from './ChatTextArea'

export interface ChatDisplayMessage {
  message: string
  sender: 'user' | 'bot'
  loading: boolean
  context: TokenContext
}

interface ChatDisplayProps {
  messages: ChatDisplayMessage[]
}

const templateMessages = [
  'Hello! How are you?',
  'Lorem ipsum placeholder text',
  'Short 4-line poem',
]

const EmptyChat = () => {
  const replaceChatTextareaValue = (message: string) => {
    if (chatTextareaRef.current) {
      chatTextareaRef.current.value = message
      chatTextareaRef.current.focus()
    }
  }

  return (
    <div className='grow flex select-none flex-col items-center mt-50'>
      <div className='text-center'>
        <Typography variant='h1'>*cricket noises*</Typography>
        <Typography variant='body1'>
          Select one of these messages to quickstart your conversation!
        </Typography>
        <div className='flex space-x-5 mt-5'>
          {templateMessages.map((templateMessage, i) => (
            <Button
              variant='outlined'
              onClick={() => {
                replaceChatTextareaValue(templateMessage)
              }}
              key={i}
            >
              {templateMessage}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

const ChatDisplayArea: React.FC<ChatDisplayProps> = ({ messages }) => {
  return (
    <div className='grow flex flex-col overflow-y-auto max-h-screen'>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <ChatBubble
            key={index}
            loading={msg.loading}
            message={msg.message}
            sender={msg.sender}
          />
        ))
      ) : (
        <EmptyChat />
      )}
    </div>
  )
}

export default ChatDisplayArea
