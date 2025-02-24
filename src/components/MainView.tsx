import React from 'react'
import ChatArea from './ChatTextArea'
import Typography from './Typography'

interface MainViewProps {
  isSidebarOpen: boolean
}

const MainView: React.FC<MainViewProps> = ({ isSidebarOpen }) => {
  return (
    <div
      className={`flex-grow ${
        !isSidebarOpen && 'mx-5 sm:mx-10 md:mx-20 lg:mx-40'
      }`}
    >
      <div className='lg:px-12 sm:px-10 px-2 pt-5 pb-10 w-full h-full flex border-red-700 flex-col'>
        {/* heading, titles etc */}
        <div>
          <Typography variant='h4'>Example Model (Local)</Typography>
        </div>
        {/* texts */}
        <div className='flex-grow flex flex-col-reverse overflow-y-auto py-10'>
          <p>Chat 1</p>
          <p>Chat 2</p>
          <p>Chat 3</p>
        </div>
        {/* footer, textarea etc */}
        <div>
          <ChatArea />
        </div>
      </div>
    </div>
  )
}

export default MainView
