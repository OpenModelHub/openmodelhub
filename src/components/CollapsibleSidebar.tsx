import Button from './Button'
import { ViewColumnsIcon, XMarkIcon } from '@heroicons/react/24/outline'

type SidebarState = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

interface SidebarProps {
  sidebarState: SidebarState
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({ sidebarState }) => {
  const [isOpen, setIsOpen] = sidebarState

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='sticky left-0'>
      {!isOpen && (
        <Button
          variant='text'
          className='absolute top-5 left-5 z-50 w-10 h-10 px-0 py-0 grid items-center justify-center'
          onClick={toggleSidebar}
        >
          <ViewColumnsIcon className='w-7 h-7 text-primary-900' />
        </Button>
      )}
      <div
        className={`h-screen relative ${
          isOpen ? 'w-xs' : 'w-0'
        } left-0 z-50 transition-width duration-300 bg-primary-100 border-r-1 border-primary-400`}
      >
        <div className={`${isOpen ? 'visible' : 'hidden'}`}>
          <Button
            variant='text'
            className='absolute top-5 right-5 z-50 w-10 h-10 px-0 py-0 grid items-center justify-center'
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
