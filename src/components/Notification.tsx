import React from 'react'
import Typography from './Typography'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Button from './Button'
import { cutStrLen } from '../lib/util'
import {
  CheckIcon,
  ChevronUpIcon,
  Square2StackIcon,
} from '@heroicons/react/24/outline'
import { v4 as uuidv4 } from 'uuid'

type NotificationType = 'info' | 'success' | 'warning' | 'error'

interface Notification {
  id: string
  type: NotificationType
  message: string
}

interface NotificationContextState {
  notifications: Notification[]
  pushNotification: (type: NotificationType, message: string) => void
  deleteNotification: (notificationId: string) => void
}

export const NotificationContext =
  React.createContext<NotificationContextState>({} as NotificationContextState)

const MAXLEN = 50
const NOTIFICATION_TIMEOUT = 2000
const COPY_TIMEOUT = 750

export const Notification: React.FC<Notification> = ({ type, message, id }) => {
  const { deleteNotification } = React.useContext(NotificationContext)
  const [expanded, setExpanded] = React.useState(false)
  const [copyLoading, setCopyLoading] = React.useState(false)
  const baseClass =
    'pl-6 pr-4 py-3 flex whitespace-pre-wrap rounded-xl lg:w-md sm:w-xs w-60 relative shadow-lg border text-black font-semibold block text-left'

  const variantClasses = {
    info: 'bg-cyan-100 border-cyan-900',
    success: 'bg-green-100 border-green-900',
    warning: 'bg-yellow-100 border-yellow-900',
    error: 'bg-red-100 border-red-900',
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
    setCopyLoading(true)

    setTimeout(() => setCopyLoading(false), COPY_TIMEOUT)
  }

  React.useEffect(() => {
    // don't timeout on errors
    if (type == 'error') return
    const timeout = setTimeout(
      () => deleteNotification(id),
      NOTIFICATION_TIMEOUT
    )
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className={`${baseClass} ${variantClasses[type]}`}>
      {message.length > MAXLEN && (
        <button
          className='absolute top-4 left-2'
          onClick={() => setExpanded((x) => !x)}
        >
          {expanded ? (
            <ChevronDownIcon className='w-3' />
          ) : (
            <ChevronUpIcon className='w-3' />
          )}
        </button>
      )}

      <Typography variant='caption' className='mr-10 flex overflow-auto'>
        {expanded ? message : cutStrLen(message, MAXLEN)}
      </Typography>
      <div className='absolute right-2 top-0.5 flex -space-x-2.5 z-10'>
        <Button
          variant='icon'
          className={type == 'error' ? 'visible' : 'hidden'}
          onClick={copyToClipboard}
          disabled={copyLoading}
        >
          {!copyLoading ? (
            <Square2StackIcon className='w-5' />
          ) : (
            <CheckIcon className='w-5' />
          )}
        </Button>
        <Button variant='icon' onClick={() => deleteNotification(id)}>
          <XMarkIcon className='w-5' />
        </Button>
      </div>
    </div>
  )
}

export const useNotification = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const pushNotification = (type: NotificationType, message: string) => {
    setNotifications((x) => [
      ...x,
      {
        id: uuidv4(),
        type,
        message,
      },
    ])
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((x) => x.filter((y) => y.id != notificationId))
  }

  return { notifications, pushNotification, deleteNotification }
}

export const NotificationGroup = () => {
  const { notifications } = React.useContext(NotificationContext)
  return (
    <div className='absolute z-50 top-5 grid space-y-2 items-center justify-center right-5'>
      {notifications.map((notification) => (
        <Notification
          id={notification.id}
          type={notification.type}
          message={notification.message}
          key={notification.id}
        />
      ))}
    </div>
  )
}
