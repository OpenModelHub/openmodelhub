import React from 'react'
import Button from './Button'
import Typography from './Typography'
import { GlobalContext, ValidPage } from '../pages/preview'

interface SidebarButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string
      titleId?: string
    } & React.RefAttributes<SVGSVGElement>
  >
  label: string
  targetPage: ValidPage
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  targetPage,
}) => {
  const { setPage, page } = React.useContext(GlobalContext)
  const Icon = icon
  return (
    <Button
      variant='text'
      onClick={() => setPage(targetPage)}
      className={`${
        page == targetPage && 'bg-primary-300'
      } flex items-center space-x-2 w-full`}
    >
      <Icon className='w-5 text-primary-900' />
      <Typography variant='body1' className='text-primary-900'>
        {label}
      </Typography>
    </Button>
  )
}

export default SidebarButton
