import { Blog } from '@/types'

interface BlogContentProps {
  blog: Blog
}

export default function BlogContent({ blog }: BlogContentProps) {
  // Simple HTML sanitization - in production, use a proper library like DOMPurify
  const sanitizeHTML = (html: string): string => {
    // Remove potentially dangerous tags and attributes
    return html
      .replace(/<script[^>]*>[sS]*?<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/<iframe[^>]*>[sS]*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>[sS]*?<\/object>/gi, '')
      .replace(/<embed[^>]*>[sS]*?<\/embed>/gi, '')
  }

  const safeContent = sanitizeHTML(blog.content || '')

  return (
    <div 
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: safeContent }}
    />
  )
}
