import { Blog } from '@/types'

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article 
      className="bg-[#1E293B] rounded-xl p-6 hover:bg-[#334155] transition-colors duration-300"
    >
      <div className="mb-4">
        <img 
          src={blog.image || '/placeholder.jpg'} 
          alt={blog.title}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-[#8B5CF6] text-xs font-medium rounded-full mb-2">
          {(blog.categoryId as any)?.name || 'Uncategorized'}
        </span>
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-[#94A3B8] mb-4">{blog.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#94A3B8]">{new Date(blog.createdAt).toLocaleDateString()}</span>
        <a 
          href={`/blog/${blog._id}`} 
          className="text-[#8B5CF6] font-medium hover:text-[#A78BFA] transition-colors"
        >
          Read more →
        </a>
      </div>
    </article>
  )
}
