import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'glass' | 'elevated' | 'plain'
}

export default function Card({
  children,
  className = '',
  variant = 'glass',
}: CardProps) {
  const baseClasses = 'rounded-xl p-6'
  const variantClasses = {
    glass: 'bg-[#0A0A0F]/20 backdrop-blur-sm border border-[#FFFFFF]/5',
    elevated: 'bg-[#161B22] shadow-lg',
    plain: 'bg-transparent',
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}
