import Button from './Button'

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
    <div
      className={`h-screen ${
        isOpen ? 'w-64' : 'w-0'
      } z-50 transition-width duration-300 bg-primary-100 border-r-1 border-primary-400`}
    >
      <Button onClick={toggleSidebar}>{isOpen ? 'Close' : 'Open'}</Button>
    </div>
  )
}

export default CollapsibleSidebar
