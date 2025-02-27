import React from 'react'

interface TypographyProps {
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'b'
  children: React.ReactNode
  className?: string
}

const variantClasses = {
  h1: 'text-4xl text-primary-900',
  h2: 'text-3xl text-primary-900',
  h3: 'text-2xl text-primary-900',
  h4: 'text-xl text-primary-900',
  h5: 'text-lg text-primary-900',
  h6: 'text-base text-primary-900',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  element = 'p',
  children,
  className,
}) => {
  const Component = element as keyof JSX.IntrinsicElements
  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  )
}

export default Typography
