import React from 'react'
import ChatDisplayArea, { ChatDisplayMessage } from '../chat/ChatDisplayArea'
import ChatArea from '../chat/ChatTextArea'
import Status from '../Status'
import Typography from '../Typography'

const PLACEHOLDER_MODEL = 'llama3.2:latest'
const PLACEHOLDER_MODEL_SIZE = '2GB'

interface ChatViewProps {
  messagesState: [
    ChatDisplayMessage[],
    React.Dispatch<React.SetStateAction<ChatDisplayMessage[]>>
  ]
}

const ChatView: React.FC<ChatViewProps> = ({ messagesState }) => {
  const chatRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    const element = chatRef.current
    if (!element) return
    const handleScroll = () => {
      // console.log(
      //   'Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight))',
      //   Math.abs(
      //     element.scrollHeight - (element.scrollTop + element.clientHeight)
      //   )
      // )

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
          {PLACEHOLDER_MODEL} (Local, {PLACEHOLDER_MODEL_SIZE})
        </Typography>
        <Status status='running' />
      </div>
      {/* texts */}
      <div
        ref={chatRef}
        className='flex-grow flex flex-col overflow-y-auto max-h-screen'
      >
        <ChatDisplayArea messages={messagesState[0]} />
      </div>
      {/* footer, textarea etc */}
      <div className='sticky bottom-0 pb-4 py-2 bg-primary-100'>
        <ChatArea
          currentModel={PLACEHOLDER_MODEL}
          setMessages={messagesState[1]}
        />
      </div>
    </>
  )
}

export default ChatView
