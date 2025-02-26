import React from 'react'
import ChatArea from './ChatTextArea'
import Typography from './Typography'
import Status from './Status'
import ChatDisplayArea, { ChatDisplayMessage } from './ChatDisplayArea'

interface MainViewProps {
  isSidebarOpen: boolean
}

const PLACEHOLDER_MODEL = 'llama3.2:latest'
const PLACEHOLDER_MODEL_SIZE = '2GB'

const MainView: React.FC<MainViewProps> = ({ isSidebarOpen }) => {
  const [messages, setMessages] = React.useState<ChatDisplayMessage[]>([])
  return (
    <div
      className={`flex-grow max-h-screen duration-300 ${
        !isSidebarOpen && 'mx-5 sm:mx-10 md:mx-20 lg:mx-40'
      }`}
    >
      <div className='lg:px-12 sm:px-10 pl-15 px-2 w-full h-full flex border-red-700 flex-col'>
        {/* heading, titles etc */}
        <div className='sticky top-0 pt-3 py-2 bg-primary-100'>
          <Typography variant='h4'>
            {PLACEHOLDER_MODEL} (Local, {PLACEHOLDER_MODEL_SIZE})
          </Typography>
          <Status status='running' />
        </div>
        {/* texts */}
        <div className='flex-grow flex flex-col overflow-y-auto py-10 max-h-screen'>
          <ChatDisplayArea messages={messages} />
        </div>
        {/* footer, textarea etc */}
        <div className='sticky bottom-0 pb-4 py-2 bg-primary-100'>
          <ChatArea
            currentModel={PLACEHOLDER_MODEL}
            setMessages={setMessages}
          />
        </div>
      </div>
    </div>
  )
}

export default MainView
