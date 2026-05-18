import { Blog } from '@/types'
import BlogCard from './BlogCard'

interface BlogListProps {
  blogs: Blog[]
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  )
}
