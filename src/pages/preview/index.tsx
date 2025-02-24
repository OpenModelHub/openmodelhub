import { useState } from 'react'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import MainView from '../../components/MainView'

export default function Preview() {
  const sidebarState = useState(false)

  return (
    <>
      {/* <PreviewFloating /> */}
      <div className='flex bg-primary-100'>
        <CollapsibleSidebar sidebarState={sidebarState} />
        <MainView isSidebarOpen={sidebarState[0]} />
      </div>
    </>
  )
}
