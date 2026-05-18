'use client'

import { useState } from 'react'

interface SimpleEditorProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

export default function SimpleEditor({
  value = '',
  onChange,
  placeholder = 'Start writing your blog content...',
}: SimpleEditorProps) {
  const [content, setContent] = useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setContent(newValue)
    if (onChange) onChange(newValue)
  }

  return (
    <div className="bg-[#0A0A0F] border border-[#FFFFFF]/10 rounded-xl overflow-hidden">
      <textarea
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full min-h-[400px] p-5 bg-[#0A0A0F] text-white placeholder:text-gray-500 focus:outline-none resize-none"
        style={{
          color: '#FFFFFF',
          caretColor: '#FFFFFF',
        }}
      />
    </div>
  )
}
