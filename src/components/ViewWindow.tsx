import React from 'react'
import { ChatDisplayMessage } from './chat/ChatDisplayArea'
import { PageState } from '../pages/preview'
import ChatView from './views/ChatView'
import ManageModelsView from './views/ManageModelsView'
import PullModelsView from './views/PullModelsView'
import SettingsView from './views/SettingsView'

interface MainViewProps {
  pageState: [PageState, React.Dispatch<React.SetStateAction<PageState>>]
  isSidebarOpen: boolean
}

const MainView: React.FC<MainViewProps> = ({ isSidebarOpen, pageState }) => {
  const messagesState = React.useState<ChatDisplayMessage[]>([])

  const page: Record<PageState, React.ReactNode> = {
    'tab:manageModels': <ManageModelsView />,
    'tab:pullModels': <PullModelsView />,
    'tab:settings': <SettingsView />,
    'chat:llama3.2:latest': <ChatView messagesState={messagesState} />,
  }

  return (
    <div
      className={`flex-grow max-h-screen duration-300 ${
        !isSidebarOpen && 'mx-5 sm:mx-10 md:mx-20 lg:mx-40'
      }`}
    >
      <div className='lg:px-12 sm:px-10 pl-15 px-2 w-full h-full flex flex-col'>
        {page[pageState[0]]}
      </div>
    </div>
  )
}

export default MainView
