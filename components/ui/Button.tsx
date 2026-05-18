import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6]'
  
  const variantClasses = {
    primary: 'bg-[#8B5CF6] text-white hover:bg-[#A78BFA] focus:ring-[#8B5CF6]/50',
    secondary: 'bg-[#1E293B] text-[#F8FAFC] hover:bg-[#334155] focus:ring-[#8B5CF6]/50',
    outline: 'border border-[#334155] text-[#F8FAFC] hover:bg-[#334155] focus:ring-[#8B5CF6]/50',
    danger: 'bg-[#EF4444] text-white hover:bg-[#F87171] focus:ring-[#EF4444]/50',
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
