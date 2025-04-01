import React from 'react'
import { ChatDisplayMessage } from './components/Chat/ChatTypes'

export type ValidPage =
  | 'tab:manageModels'
  | 'tab:pullModels'
  | 'tab:downloads'
  | 'tab:settings'
  | `chat:${string}`

export interface GlobalContextState {
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
