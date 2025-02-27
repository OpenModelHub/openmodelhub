import React from 'react'
import Button from './Button'
import Typography from './Typography'
import { PageState } from '../pages/preview'

interface SidebarButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string
      titleId?: string
    } & React.RefAttributes<SVGSVGElement>
  >
  label: string
  targetPage: PageState
  setPageState: React.Dispatch<React.SetStateAction<PageState>>
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  targetPage,
  setPageState,
}) => {
  const Icon = icon
  return (
    <Button
      variant='text'
      onClick={() => setPageState(targetPage)}
      className='flex items-center space-x-2 w-full'
    >
      <Icon className='w-5 text-primary-900' />
      <Typography variant='body1' className='text-primary-900'>
        {label}
      </Typography>
    </Button>
  )
}

export default SidebarButton
