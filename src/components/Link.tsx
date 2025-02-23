import { openUrl } from '@tauri-apps/plugin-opener'
import React from 'react'

interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
}

const baseClasses = 'underline cursor-pointer'
const Link: React.FC<LinkProps> = ({
  href,
  children,
  className,
  external = false,
}) => {
  // make underline be overwritten when a
  // custom className is added.
  if (!className) className = baseClasses

  if (external)
    return (
      <button onClick={() => openUrl(href)} className={className}>
        {children}
      </button>
    )

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export default Link
