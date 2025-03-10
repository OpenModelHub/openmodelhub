import React from 'react'

interface TooltipProps {
  message: React.ReactNode
  children: React.ReactNode
  direction: 'up' | 'down' | 'left' | 'right'
}

const Tooltip: React.FC<TooltipProps> = ({
  message,
  children,
  direction,
  ...props
}) => {
  const directionClass = {
    up: '-top-2',
    down: 'top-12',
    left: '-left-2',
    right: '-right-2',
  }

  return (
    <div {...props}>
      <div className='peer'>{children}</div>
      <div
        className={`${directionClass[direction]} absolute invisible peer-hover:visible duration-100 shadow-md bg-black group rounded-md text-white px-3 py-2`}
      >
        {message}
      </div>
    </div>
  )
}

export default Tooltip
