import React from 'react'
import Typography from './Typography'

interface StatusProps {
  isRunning: boolean
}

const Status: React.FC<StatusProps> = ({ isRunning }) => {
  const statusText = isRunning ? 'Running' : 'Offline'
  const statusColor = isRunning ? 'bg-green-500' : 'bg-gray-500'

  return (
    <div className='flex items-center space-x-2'>
      <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
      <Typography variant='body2'>{statusText}</Typography>
    </div>
  )
}

export default Status
