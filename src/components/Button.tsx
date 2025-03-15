import React from 'react'
import Link from './Link'
import Tooltip from './Tooltip'
import Typography from './Typography'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'text' | 'contained' | 'outlined' | 'icon'
  color?: 'light' | 'dark'
  element?: 'button' | 'link'
  href?: string
  className?: string
  disabled?: boolean
  external?: boolean
  tooltip?: React.ReactNode
}

const baseClasses = 'block cursor-pointer underline-none select-none'
const variantClasses = {
  // [light, dark]
  // light buttons have a dark foreground
  contained: [
    'px-4 py-1 rounded-md bg-primary-800 hover:brightness-90 active:brightness-85 text-white',
    'px-4 py-1 rounded-md bg-white hover:brightness-105 active:brightness-110 text-black',
  ],
  outlined: [
    'px-4 py-1 bg-primary-100 border hover:brightness-95 active:brightness-90 rounded-full',
    'px-4 py-1 border hover:brightness-95 active:brightness-90 rounded-full',
  ],
  text: [
    'px-4 py-1 rounded-md bg-primary-100 text-black hover:brightness-95 active:brightness-90',
    'px-4 py-1 rounded-md text-white hover:brightness-105 active:brightness-110',
  ],
  icon: [
    'p-2 rounded-md text-black hover:bg-primary-200/50 hover:brightness-80 active:brightness-70 grid items-center justify-center',
    'p-2 rounded-md text-white hover:bg-primary-200/50 hover:brightness-120 active:brightness-130 grid items-center justify-center',
  ],
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'contained',
  color = 'light',
  element: type = 'button',
  href = '#',
  className = '',
  disabled = false,
  external = false,
  tooltip,
  ...props
}) => {
  const cls = `${baseClasses} ${
    variantClasses[variant][color == 'light' ? 0 : 1]
  } group ${className}`

  if (type === 'link') {
    return (
      <Link className={cls} href={href} external={external} {...props}>
        {children}
        {tooltip && (
          <Tooltip direction='up'>
            <Typography variant='caption'>{tooltip}</Typography>
          </Tooltip>
        )}
      </Link>
    )
  }

  return (
    <button disabled={disabled} onClick={onClick} className={cls} {...props}>
      {children}
      {tooltip && (
        <Tooltip direction='up'>
          <Typography variant='caption'>{tooltip}</Typography>
        </Tooltip>
      )}
    </button>
  )
}

export default Button
