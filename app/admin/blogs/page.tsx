'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

interface Blog {
  id: string
  title: string
  category: string
  content: string
  status: string
  createdAt: string
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]')
    setBlogs(storedBlogs)
    setLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      const updatedBlogs = blogs.filter((blog: any) => blog.id !== id)
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      setBlogs(updatedBlogs)
    }
  }

  const handleToggleStatus = (id: string) => {
    const updatedBlogs = blogs.map((blog: any) => {
      if (blog.id === id) {
        return {
          ...blog,
          status: blog.status === 'published' ? 'draft' : 'published',
          updatedAt: new Date().toISOString()
        }
      }
      return blog
    })
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
    setBlogs(updatedBlogs)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 max-w-6xl mx-auto bg-[#09090B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-6xl mx-auto bg-[#09090B]">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#FAFAFA]">Blog Management</h1>
            <p className="text-[#A1A1AA] mt-1">Manage your blog posts</p>
          </div>
          <a 
            href="/admin/blogs/new" 
            className="px-5 py-2.5 bg-[#EC4899] hover:bg-[#DB2777] text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            + Create New Blog
          </a>
        </div>
      </header>

      {/* Search & Filter Bar */}
      <Card variant="glass" className="mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full bg-[#18181B]/50 border border-[#FFFFFF]/10 rounded-lg pl-10 pr-4 py-3 text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select className="bg-[#18181B]/50 border border-[#FFFFFF]/10 rounded-lg px-4 py-3 text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30">
            <option>All Status</option>
            <option>Draft</option>
            <option>Published</option>
          </select>
        </div>
      </Card>

      {/* Blogs Table */}
      <Card variant="glass">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#FFFFFF]/10">
            <thead>
              <tr className="text-left text-sm font-semibold text-[#FAFAFA]">
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FFFFFF]/5">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="text-[#A1A1AA]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">No blogs yet</p>
                      <p className="text-sm mt-1">Create your first blog post to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                blogs.map((blog: any) => (
                  <motion.tr 
                    key={blog.id}
                    whileHover={{ backgroundColor: '#18181B/30' }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#FAFAFA]">{blog.title}</div>
                      <div className="text-sm text-[#A1A1AA] line-clamp-1">
                        {blog.content?.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#18181B]/50 border border-[#FFFFFF]/10 text-[#6366F1]">
                        {blog.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${blog.status === 'published' ? 'bg-[#EC4899]/20 text-[#EC4899]' : 'bg-[#18181B]/50 border border-[#FFFFFF]/10 text-[#A1A1AA]'}`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A1A1AA]">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <motion.button 
                          type="button"
                          onClick={() => handleToggleStatus(blog.id)}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#6366F1]/20 text-[#6366F1] hover:bg-[#6366F1]/30"
                        >
                          {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        </motion.button>
                        <motion.button 
                          type="button"
                          onClick={() => handleDelete(blog.id)}
                          whileHover={{ scale: 1.05 }}
                          className="text-[#EF4444] hover:text-[#F87171] px-3 py-1.5"
                        >
                          Delete
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
)
}
