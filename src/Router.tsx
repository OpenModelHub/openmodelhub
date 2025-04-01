import React from 'react'
import { GlobalContext, ValidPage } from './pages'
import ChatPage from './pages/Chat'
import ManageModelsPage from './pages/ManageModels'
import PullModelsPage from './pages/PullModels'
import DownloadsPage from './pages/Downloads'
import SettingsPage from './pages/Settings'

const Router: React.FC = () => {
  const { sidebarOpen, page } = React.useContext(GlobalContext)

  const PageComponent: Record<ValidPage, React.FC> = {
    'tab:manageModels': ManageModelsPage,
    'tab:pullModels': PullModelsPage,
    'tab:downloads': DownloadsPage,
    'tab:settings': SettingsPage,
  }

  const TabElement = PageComponent[page]

  return (
    <div
      className={`flex-grow overflow-y-auto max-h-screen duration-300 ${
        !sidebarOpen && 'px-5 sm:px-10 md:px-20 lg:px-40'
      }`}
    >
      <div className='lg:px-12 sm:px-10 h-full flex flex-col'>
        {page.startsWith('chat:') ? (
          <ChatPage model={page.slice(5)} />
        ) : (
          <TabElement />
        )}
      </div>
    </div>
  )
}

export default Router
