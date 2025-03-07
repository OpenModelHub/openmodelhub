import React from 'react'
import ChatDisplayArea from '../chat/ChatDisplayArea'
import ChatArea from '../chat/ChatTextArea'
import Status from '../chat/Status'
import Typography from '../Typography'
import { GlobalContext } from '../../pages/preview'

interface ChatViewProps {
  model: string
}

const ChatView: React.FC<ChatViewProps> = ({ model }) => {
  const { messages, models } = React.useContext(GlobalContext)
  const chatRef = React.createRef<HTMLDivElement>()
  React.useEffect(() => {
    const element = chatRef.current
    if (!element) return
    const handleScroll = () => {
      if (
        Math.abs(
          element.scrollHeight - (element.scrollTop + element.clientHeight)
        ) <= 1
      ) {
        element.scrollTop = element.scrollHeight
      }
    }

    element.addEventListener('scroll', handleScroll)

    return () => {
      element.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {/* heading, titles etc */}
      <div className='sticky top-0 pt-3 py-2 bg-primary-100'>
        <Typography variant='h4'>
          {model} (Local, {(models[model].size / 1e9).toFixed(1)}GB)
        </Typography>
        <Status status='available' />
      </div>
      {/* texts */}
      <div
        ref={chatRef}
        className='flex-grow flex flex-col overflow-y-auto max-h-screen'
      >
        <ChatDisplayArea messages={messages[model]} />
      </div>
      {/* footer, textarea etc */}
      <div className='sticky bottom-0 pb-4 py-2 bg-primary-100'>
        <ChatArea currentModel={model} />
      </div>
    </>
  )
}

export default ChatView
