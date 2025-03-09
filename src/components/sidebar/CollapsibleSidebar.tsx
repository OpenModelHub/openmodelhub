import Button from '../Button'
import {
  CloudArrowDownIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import SidebarButton from './SidebarButton'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import { GlobalContext } from '../../pages/preview'
import React from 'react'
import ModelsGroup from './ModelsGroup'
const SidebarButtonGroup = () => {
  return (
    <div className='relative px-2'>
      <SidebarButton
        icon={SparklesIcon}
        targetPage='https://github.com/OpenModelHub/openmodelhub'
        external
        label='Contribute'
      />

      <SidebarButton
        icon={Squares2X2Icon}
        targetPage='tab:manageModels'
        label='Manage Models'
      />

      <SidebarButton
        icon={CloudArrowDownIcon}
        targetPage='tab:pullModels'
        label='Pull Models'
      />

      <SidebarButton
        icon={Cog6ToothIcon}
        targetPage='tab:settings'
        label='Settings'
      />
    </div>
  )
}

const CollapsibleSidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = React.useContext(GlobalContext)

  const toggleSidebar = () => {
    setSidebarOpen((x) => !x)
  }

  return (
    <div className='sticky left-0'>
      {!sidebarOpen && (
        <Button
          variant='icon'
          className='absolute top-5 left-5 w-10 h-10'
          onClick={toggleSidebar}
        >
          <ViewColumnsIcon className='w-7 text-primary-900' />
        </Button>
      )}
      <div
        className={`h-screen relative ${
          sidebarOpen ? 'w-60' : 'w-0'
        } left-0 transition-width duration-300 bg-primary-100 border-r-1 border-primary-400`}
      >
        {/* Sidebar Content */}

        <div
          className={`${
            sidebarOpen ? 'visible' : 'hidden'
          } overflow-hidden pt-5 h-full`}
        >
          {/* Main Tabs */}
          <div className='overflow-hidden text-nowrap h-full flex flex-col'>
            <div className='items-center space-x-5 pl-5 mb-5'>
              <img src='/omhlogo-dark.svg' className='w-10' />
            </div>
            <div className='grow overflow-auto'>
              <ModelsGroup />
            </div>
            <div className='pb-5'>
              <SidebarButtonGroup />
            </div>
          </div>

          {/* Close Button */}
          <Button
            variant='icon'
            className='absolute top-5 right-5 w-10 h-10'
            onClick={toggleSidebar}
          >
            <XMarkIcon className='w-7 text-primary-900' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CollapsibleSidebar
