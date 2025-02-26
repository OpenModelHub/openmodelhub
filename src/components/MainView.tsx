import React from 'react'
import ChatArea from './ChatTextArea'
import Typography from './Typography'
import ChatBubble from './ChatBubble'
import Status from './Status'

interface MainViewProps {
  isSidebarOpen: boolean
}

const exampleResponse1 = `Certainly! Here's a standard Lorem ipsum placeholder text:

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Let me know if you'd like a longer version or a specific length! 😊`

const exampleResponse2 = `You're welcome! 😊 If you need anything else—whether it's more placeholder text, help with design, or something completely different—just let me know. Have a fantastic day! 🚀`

const MainView: React.FC<MainViewProps> = ({ isSidebarOpen }) => {
  return (
    <div
      className={`flex-grow max-h-screen duration-300 ${
        !isSidebarOpen && 'mx-5 sm:mx-10 md:mx-20 lg:mx-40'
      }`}
    >
      <div className='lg:px-12 sm:px-10 pl-15 px-2 w-full h-full flex border-red-700 flex-col'>
        {/* heading, titles etc */}
        <div className='sticky top-0 pt-3 py-2 bg-primary-100'>
          <Typography variant='h4'>deepseek-r1:671b (Local, 404GB)</Typography>
          <Status status='running' />
        </div>
        {/* texts */}
        <div className='flex-grow flex flex-col overflow-y-auto py-10 max-h-screen'>
          <ChatBubble
            message='Can you please generate me a Lorem Ipsum placeholder?'
            sender='user'
          />
          <ChatBubble message={exampleResponse1} sender='bot' />
          <ChatBubble message='Great, thanks!' sender='user' />
          <ChatBubble message={exampleResponse2} sender='bot' />
        </div>
        {/* footer, textarea etc */}
        <div className='sticky bottom-0 pb-4 py-2 bg-primary-100'>
          <ChatArea />
        </div>
      </div>
    </div>
  )
}

export default MainView
