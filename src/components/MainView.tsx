import React from 'react'
import { GlobalContext, ValidPage } from '../pages/preview'
import ChatView from './Chat/ChatView'
import ManageModelsView from './MangeModels/ManageModelsView'
import PullModelsView from './PullModels/PullModelsView'
import SettingsView from './Settings/SettingsView'
import DownloadsView from './Downloads/DownloadsView'

const MainView: React.FC = () => {
  const { sidebarOpen, page } = React.useContext(GlobalContext)

  const PageComponent: Record<ValidPage, React.FC> = {
    'tab:manageModels': ManageModelsView,
    'tab:pullModels': PullModelsView,
    'tab:downloads': DownloadsView,
    'tab:settings': SettingsView,
  }

  const TabElement = PageComponent[page]

  return (
    <div
      className={`flex-grow max-h-screen duration-300 ${
        !sidebarOpen && 'mx-5 sm:mx-10 md:mx-20 lg:mx-40'
      }`}
    >
      <div className='lg:px-12 sm:px-10 pl-15 px-2 w-full h-full flex flex-col'>
        {page.startsWith('chat:') ? (
          <ChatView model={page.slice(5)} />
        ) : (
          <TabElement />
        )}
      </div>
    </div>
  )
}

export default MainView
