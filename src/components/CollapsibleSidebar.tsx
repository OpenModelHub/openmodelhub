import Button from './Button'
import {
  CloudArrowDownIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ViewColumnsIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import SidebarButton from './SidebarButton'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import Typography from './Typography'
import { GlobalContext } from '../pages/preview'
import React from 'react'
import ModelButton from './ModelButton'

const SidebarButtonGroup = () => {
  return (
    <div className='relative px-2'>
      <SidebarButton
        icon={SparklesIcon}
        targetPage='chat:llama3.2:latest'
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

      <Typography
        variant='caption'
        className='absolute bottom-2 right-5 text-primary-600'
      >
        v.0.0.1p
      </Typography>
    </div>
  )
}

const ModelsGroup = ({ models }: { models: Record<string, Model> }) => {
  return (
    <div className='relative px-2 grow'>
      <input
        type='text'
        className='resize-none mb-2 w-full outline-none bg-primary-300 px-4 py-2 rounded-md text-sm'
        placeholder='Search Models...'
      />
      {Object.values(models).map((mo, i) => (
        <ModelButton model={mo.name} key={i} />
      ))}
    </div>
  )
}

const CollapsibleSidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, models } =
    React.useContext(GlobalContext)

  const toggleSidebar = () => {
    setSidebarOpen((x) => !x)
  }

  return (
    <div className='sticky left-0'>
      {!sidebarOpen && (
        <Button
          variant='icon'
          className='absolute top-5 left-5 z-50 w-10 h-10'
          onClick={toggleSidebar}
        >
          <ViewColumnsIcon className='w-7 h-7 text-primary-900' />
        </Button>
      )}
      <div
        className={`h-screen relative ${
          sidebarOpen ? 'w-60' : 'w-0'
        } left-0 z-50 transition-width duration-300 bg-primary-100 border-r-1 border-primary-400`}
      >
        <div
          className={`${
            sidebarOpen ? 'visible' : 'hidden'
          } overflow-hidden pt-5`}
        >
          {/* Sidebar Content */}

          {/* Main Tabs */}
          <div className='overflow-hidden text-nowrap grid space-y-4'>
            <div className='flex items-center space-x-5 pl-5'>
              <img src='/omhlogo-dark.svg' className='w-10' />
            </div>
            <ModelsGroup models={models} />
            <SidebarButtonGroup />
          </div>

          {/* Close Button */}
          <Button
            variant='icon'
            className='absolute top-5 right-5 z-50 w-10 h-10'
            onClick={toggleSidebar}
          >
            <XMarkIcon className='w-7 h-7 text-primary-900' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CollapsibleSidebar
