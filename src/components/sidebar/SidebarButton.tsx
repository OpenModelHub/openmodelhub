import React from 'react'
import Button from '../Button'
import Typography from '../Typography'
import { GlobalContext, ValidPage } from '../../pages/preview'
import { openUrl } from '@tauri-apps/plugin-opener'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

interface SidebarButtonProps {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string
      titleId?: string
    } & React.RefAttributes<SVGSVGElement>
  >
  label: string
  targetPage: ValidPage | string
  external?: boolean
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  label,
  targetPage,
  external = false,
}) => {
  const { setPage, page } = React.useContext(GlobalContext)
  const Icon = icon
  return (
    <Button
      variant='text'
      element={'button'}
      external={external}
      onClick={() => {
        if (!external) setPage(targetPage as ValidPage)
        else openUrl(targetPage)
      }}
      className={`${
        page == targetPage && 'bg-primary-300'
      } flex items-center space-x-2 w-full`}
    >
      <Icon className='w-5 text-primary-900' />
      <Typography variant='body1' className='text-primary-900 relative'>
        {external && (
          <ArrowTopRightOnSquareIcon className='w-2.5 absolute -right-3 top-1' />
        )}
        {label}
      </Typography>
    </Button>
  )
}

export default SidebarButton
