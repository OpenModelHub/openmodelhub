import React from 'react'
import CollapsibleSidebar from '../components/Sidebar/CollapsibleSidebar'
import MainView from '../Router'
import {
  NotificationContext,
  NotificationGroup,
  useNotification,
} from '../components/Notification'
import { ChatDisplayMessage } from '../components/Chat/ChatTypes'

export type ValidPage =
  | 'tab:manageModels'
  | 'tab:pullModels'
  | 'tab:downloads'
  | 'tab:settings'
  | `chat:${string}`

interface GlobalContextState {
  page: ValidPage
  setPage: React.Dispatch<React.SetStateAction<ValidPage>>

  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>

  messages: Record<string, ChatDisplayMessage[]>
  setMessages: React.Dispatch<
    React.SetStateAction<Record<string, ChatDisplayMessage[]>>
  >

  models: Record<string, Model>
  setModels: React.Dispatch<React.SetStateAction<Record<string, Model>>>
}

export const GlobalContext = React.createContext<GlobalContextState>(
  {} as GlobalContextState
)

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [page, setPage] = React.useState<ValidPage>('tab:manageModels')
  const [messages, setMessages] = React.useState<
    Record<string, ChatDisplayMessage[]>
  >({}) // maybe this could be better than loading all messages to RAM
  const [models, setModels] = React.useState<Record<string, Model>>({})

  const notificationValue = useNotification()

  return (
    <GlobalContext.Provider
      value={{
        page,
        setPage,
        sidebarOpen,
        setSidebarOpen,
        messages,
        setMessages,
        models,
        setModels,
      }}
    >
      <NotificationContext.Provider value={notificationValue}>
        <NotificationGroup />
        <div className='flex'>
          <CollapsibleSidebar />
          <MainView />
        </div>
      </NotificationContext.Provider>
    </GlobalContext.Provider>
  )
}
