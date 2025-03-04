import React from 'react'
import Typography from './Typography'

interface StatusProps {
  status: 'available' | 'running' | 'connected' | 'offline'
}

const Status: React.FC<StatusProps> = ({ status }) => {
  const baseClasses = {
    available: 'bg-green-500',
    running: 'bg-green-500',
    connected: 'bg-blue-500',
    offline: 'bg-gray-500',
  }

  const capitalized = status[0].toUpperCase() + status.slice(1)

  return (
    <div className='flex items-center space-x-2'>
      <div className={`w-2 h-2 rounded-full ${baseClasses[status]}`}></div>
      <Typography variant='body2'>{capitalized}</Typography>
    </div>
  )
}

export default Status
