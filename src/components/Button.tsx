import React from 'react'
import Link from './Link'
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'text' | 'contained' | 'outlined'
  color?: 'light' | 'dark'
  element?: 'button' | 'link'
  href?: string
}

const baseClasses = 'px-4 py-1 rounded-md cursor-pointer underline-none'
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
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'contained',
  color = 'light',
  element: type = 'button',
  href = '#',
}) => {
  const className = `${baseClasses} ${
    variantClasses[variant][color == 'light' ? 0 : 1]
  }`

  if (type === 'link') {
    return (
      <Link className={className} href={href} external={false}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button
