import React from 'react'

interface TooltipProps {
  children: React.ReactNode
  className?: string
  direction: 'up' | 'down' | 'left' | 'right'
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  direction,
  className,
  ...props
}) => {
  const directionClass = {
    up: '-top-12',
    down: '-bottom-20',
    left: '-left-12',
    right: '-right-2',
  }

  return (
    <span
      className={`${directionClass[direction]} ${className} absolute invisible opacity-0 group-hover:opacity-100 translate-y-2 group-hover:visible group-hover:translate-y-0 duration-50 shadow-md bg-primary-1000 group rounded-md text-white px-3 py-2`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Tooltip
