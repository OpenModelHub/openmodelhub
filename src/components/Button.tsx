import React from 'react'
import Link from './Link'
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'text' | 'contained' | 'outlined' | 'icon'
  color?: 'light' | 'dark'
  element?: 'button' | 'link'
  href?: string
  className?: string
  disabled?: boolean
}

const baseClasses = 'block px-4 py-1 rounded-md cursor-pointer underline-none'
const variantClasses = {
  // [light, dark]
  // light buttons have a dark foreground
  contained: [
    'bg-primary-800 hover:bg-primary-900 active:bg-primary-900/95 text-white',
    'bg-white hover:bg-primary-100 active:bg-primary-200 text-black',
  ],
  outlined: [
    'border hover:bg-primary-900/5 active:bg-primary-900/10',
    'border hover:bg-primary-100/10 active:bg-primary-100/15',
  ],
  text: [
    'text-black hover:bg-primary-900/10 active:bg-primary-900/15',
    'text-white hover:bg-primary-100/10 active:bg-primary-100/15',
  ],
  icon: [
    'text-black hover:bg-primary-900/10 active:bg-primary-900/15 px-0 py-0 grid items-center justify-center',
    'text-white hover:bg-primary-100/10 active:bg-primary-100/15 px-0 py-0 grid items-center justify-center',
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
}) => {
  className = `${baseClasses} ${
    variantClasses[variant][color == 'light' ? 0 : 1]
  } ${className}`

  if (type === 'link') {
    return (
      <Link className={className} href={href} external={false}>
        {children}
      </Link>
    )
  }

  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button
