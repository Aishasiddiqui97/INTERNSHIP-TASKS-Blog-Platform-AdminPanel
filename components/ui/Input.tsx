import { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[#F8FAFC]">
          {label}
        </label>
      )}
      
      <input
        className={`w-full px-4 py-3 bg-[#0B0F19] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#F8FAFC] placeholder:text-[#94A3B8] ${error ? 'border-[#EF4444]' : 'border-[#334155]'} ${className}`}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-[#EF4444]">{error}</p>
      )}
      
      {helperText && (
        <p className="text-sm text-[#94A3B8]">{helperText}</p>
      )}
    </div>
  )
}
