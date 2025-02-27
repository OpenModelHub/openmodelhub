import { useState } from 'react'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import MainView from '../../components/ViewWindow'

export type PageState =
  | 'tab:manageModels'
  | 'tab:pullModels'
  | 'tab:settings'
  | 'chat:llama3.2:latest'
  | `chat:${string}`

export default function Preview() {
  const sidebarState = useState(false)
  const pageState = useState<PageState>('chat:llama3.2:latest')

  return (
    <>
      {/* <PreviewFloating /> */}
      <div className='flex bg-primary-100'>
        <CollapsibleSidebar pageState={pageState} sidebarState={sidebarState} />
        <MainView pageState={pageState} isSidebarOpen={sidebarState[0]} />
      </div>
    </>
  )
}
