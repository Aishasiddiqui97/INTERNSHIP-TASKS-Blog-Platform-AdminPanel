'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function BlogListingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const blogs: any[] = []
  const categories = [
    { _id: 'tech', name: 'Technology' },
    { _id: 'defense', name: 'Defense' },
    { _id: 'lifestyle', name: 'Lifestyle' },
    { _id: 'business', name: 'Business' },
    { _id: 'health', name: 'Health' },
  ]

  return (
    <div className="min-h-screen bg-[#09090B]">
      <header className="py-12 px-4 max-w-7xl mx-auto border-b border-[#FFFFFF]/10">
        <h1 className="text-4xl font-bold text-white">Latest Articles</h1>
        <p className="text-[#A1A1AA] mt-2">Read insights, tutorials, and stories from creators around the world.</p>
      </header>

      <main className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-[#18181B] border border-[#FFFFFF]/10 rounded-lg text-white placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#18181B] border border-[#FFFFFF]/10 rounded-lg text-white focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-3">
            {blogs.length === 0 ? (
              <div className="text-center py-20 text-[#A1A1AA]">
                <p className="text-xl">No blogs published yet.</p>
                <p className="text-sm mt-2">Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog, i) => (
                  <motion.article
                    key={blog._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#18181B] border border-[#FFFFFF]/10 rounded-2xl overflow-hidden hover:border-[#FFFFFF]/20 transition-all"
                  >
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-white mb-2">{blog.title}</h2>
                      <p className="text-[#A1A1AA] text-sm mb-4 line-clamp-2">{blog.description}</p>
                      <a href={`/blog/${blog._id}`} className="text-[#6366F1] text-sm font-medium hover:underline">
                        Read →
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
