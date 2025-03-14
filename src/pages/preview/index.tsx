import React from 'react'
import CollapsibleSidebar from '../../components/sidebar/CollapsibleSidebar'
import MainView from '../../components/MainView'
import { ChatDisplayMessage } from '../../components/chat/ChatDisplayArea'
import {
  NotificationContext,
  NotificationGroup,
  useNotification,
} from '../../components/Notification'

export type ValidPage =
  | 'tab:manageModels'
  | 'tab:pullModels'
  | 'tab:settings'
  | 'chat:llama3.2:latest'
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

export default function Preview() {
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
        <div className='flex bg-primary-100'>
          <CollapsibleSidebar />
          <MainView />
        </div>
      </NotificationContext.Provider>
    </GlobalContext.Provider>
  )
}
