import React from 'react'

interface TooltipProps {
  message: React.ReactNode
  children: React.ReactNode
  className?: string
  direction: 'up' | 'down' | 'left' | 'right'
}

const Tooltip: React.FC<TooltipProps> = ({
  message,
  children,
  direction,
  className,
  ...props
}) => {
  const directionClass = {
    up: '-top-2',
    down: 'top-12',
    left: '-left-2',
    right: '-right-2',
  }

  return (
    <div className={`${className} z-50 group`} {...props}>
      <div className='peer'>{children}</div>
      <div
        className={`${directionClass[direction]} absolute invisible opacity-0 translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 duration-50 shadow-md bg-primary-1000 group rounded-md text-white px-3 py-2`}
      >
        {message}
      </div>
    </div>
  )
}

export default Tooltip
