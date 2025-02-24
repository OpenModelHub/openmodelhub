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
  children: React.ReactNode
  className?: string
}

const variantClasses = {
  h1: 'text-4xl text-primary-900',
  h2: 'text-3xl text-primary-900',
  h3: 'text-2xl text-primary-900',
  h4: 'text-xl text-primary-900',
  h5: 'text-lg',
  h6: 'text-base',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs',
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
}) => {
  const Component = variant as keyof JSX.IntrinsicElements
  return (
    <Component className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Component>
  )
}

export default Typography
