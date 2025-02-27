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
import { PageState } from '../pages/preview'

type State<X> = [X, React.Dispatch<React.SetStateAction<X>>]

interface SidebarProps {
  pageState: State<PageState>
  sidebarState: State<boolean>
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({
  sidebarState,
  pageState,
}) => {
  const [isOpen, setIsOpen] = sidebarState

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='sticky left-0 shadow-2xl'>
      {!isOpen && (
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
          isOpen ? 'w-60' : 'w-0'
        } left-0 z-50 transition-width duration-300 bg-primary-100 border-r-1 border-primary-400`}
      >
        <div
          className={`${isOpen ? 'visible' : 'hidden'} overflow-hidden pt-5`}
        >
          {/* Sidebar Content */}

          {/* Main Tabs */}
          <div className='overflow-hidden text-nowrap'>
            <div className='flex items-center space-x-5 pl-5'>
              <img src='/omhlogo-dark.svg' className='w-10' />
              {/* <div>
                <Typography variant='h6'>Open Model Hub</Typography>
                <Typography variant='caption'>preview (Unfinished)</Typography>
              </div> */}
            </div>

            <div className='relative py-5 px-2'>
              <SidebarButton
                icon={SparklesIcon}
                targetPage='chat:llama3.2:latest'
                label='Contribute'
                setPageState={pageState[1]}
              />

              <SidebarButton
                icon={Squares2X2Icon}
                targetPage='tab:manageModels'
                label='Manage Models'
                setPageState={pageState[1]}
              />

              <SidebarButton
                icon={CloudArrowDownIcon}
                targetPage='tab:pullModels'
                label='Pull Models'
                setPageState={pageState[1]}
              />

              <SidebarButton
                icon={Cog6ToothIcon}
                targetPage='tab:settings'
                label='Settings'
                setPageState={pageState[1]}
              />

              <Typography
                variant='caption'
                className='absolute bottom-2 right-5 text-primary-600'
              >
                v.0.0.1p
              </Typography>
            </div>

            <div></div>
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
