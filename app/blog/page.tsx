'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getBlogs } from '@/lib/api'
import { getCategories } from '@/lib/api'

export default async function BlogListingPage() {
  const [blogs] = useState(await getBlogs())
  const [categories] = useState(await getCategories())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Simulate trending blogs (in real app: fetch from /api/analytics)
  const trendingBlogs = blogs.slice(0, 3)

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           blog.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                            blog.category?.name === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  )

  return (
    <div className="min-h-screen bg-primary-dark dark:bg-primary-dark transition-colors duration-300">
      {/* Header */}
      <header className="py-12 px-4 max-w-7xl mx-auto border-b border-[#FFFFFF]/10">
        <h1 className="text-4xl font-bold text-text-dark dark:text-text-dark">Latest Articles</h1>
        <p className="text-muted-dark dark:text-muted-dark mt-2 max-w-2xl">
          Read insights, tutorials, and stories from creators around the world.
        </p>
      </header>

      <main className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-text-dark dark:text-text-dark mb-2">
                Search Blogs
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Find a post..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-lg text-text-dark dark:text-text-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-dark focus:border-transparent"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-3.5 text-muted-dark dark:text-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-dark dark:text-text-dark mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-lg text-text-dark dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-dark focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trending Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-text-dark dark:text-text-dark mb-4">Trending Now</h2>
              <ul className="space-y-4">
                {trendingBlogs.map((blog, i) => (
                  <motion.li 
                    key={blog._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent-dark/10 text-accent-dark text-xs font-bold mr-3 flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <a 
                        href={`/blog/${blog._id}`} 
                        className="font-medium text-text-dark dark:text-text-dark hover:text-accent-dark transition-colors line-clamp-2"
                      >
                        {blog.title}
                      </a>
                      <p className="text-xs text-muted-dark dark:text-muted-dark mt-1">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Blog Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentBlogs.map((blog, i) => (
                <motion.article 
                  key={blog._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl overflow-hidden transition-all hover:border-[#FFFFFF]/20"
                >
                  <div className="h-48 bg-gradient-to-r from-accent-dark/10 to-success-dark/10"></div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-accent-dark/10 text-accent-dark text-xs font-medium rounded-full mb-3">
                      {blog.category?.name || 'Uncategorized'}
                    </span>
                    <h2 className="text-xl font-bold text-text-dark dark:text-text-dark mb-2">{blog.title}</h2>
                    <p className="text-muted-dark dark:text-muted-dark text-sm mb-4 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-dark dark:text-muted-dark">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <a 
                        href={`/blog/${blog._id}`} 
                        className="text-accent-dark dark:text-accent-dark text-sm font-medium hover:underline"
                      >
                        Read →
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav aria-label="Pagination" className="inline-flex items-center -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${currentPage === 1 ? 'bg-secondary-dark/30 text-muted-dark cursor-not-allowed' : 'bg-secondary-dark/30 text-text-dark hover:bg-secondary-dark/50'}`}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? 'bg-accent-dark text-primary-dark' : 'bg-secondary-dark/30 text-text-dark hover:bg-secondary-dark/50'}`}
                      aria-current={currentPage === i + 1 ? 'page' : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${currentPage === totalPages ? 'bg-secondary-dark/30 text-muted-dark cursor-not-allowed' : 'bg-secondary-dark/30 text-text-dark hover:bg-secondary-dark/50'}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}