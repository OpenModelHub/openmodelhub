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
        !sidebarOpen && 'mx-5 sm:mx-10 md:mx-20 lg:mx-40'
      }`}
    >
      <div className='lg:mx-12 sm:mx-10 h-full flex flex-col'>
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
