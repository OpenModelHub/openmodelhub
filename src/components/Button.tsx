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
  external?: boolean
}

const baseClasses = 'block rounded-md cursor-pointer underline-none select-none'
const variantClasses = {
  // [light, dark]
  // light buttons have a dark foreground
  contained: [
    'px-4 py-1 bg-primary-800 hover:bg-primary-900 active:bg-primary-900/95 text-white',
    'px-4 py-1 bg-white hover:bg-primary-100 active:bg-primary-200 text-black',
  ],
  outlined: [
    'px-4 py-1 border hover:bg-primary-900/5 active:bg-primary-900/10',
    'px-4 py-1 border hover:bg-primary-100/10 active:bg-primary-100/15',
  ],
  text: [
    'px-4 py-1 text-black hover:bg-primary-900/10 active:bg-primary-900/15',
    'px-4 py-1 text-white hover:bg-primary-100/10 active:bg-primary-100/15',
  ],
  icon: [
    'p-2 text-black hover:bg-primary-900/10 active:bg-primary-900/15 grid items-center justify-center',
    'p-2 text-white hover:bg-primary-100/10 active:bg-primary-100/15 grid items-center justify-center',
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
  ...props
}) => {
  className = `${baseClasses} ${
    variantClasses[variant][color == 'light' ? 0 : 1]
  } ${className}`

  if (type === 'link') {
    return (
      <Link className={className} href={href} external={external} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
