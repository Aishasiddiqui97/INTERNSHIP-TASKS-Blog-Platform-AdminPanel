'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Card from '@/components/ui/Card'
import { TrendingUp, Users, FolderOpen, FileText, Calendar, Eye, CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface DashboardClientProps {
  blogs: Array<{
    _id: string
    title: string
    createdAt: Date
    status: string
  }>
  categories: Array<{
    _id: string
    name: string
  }>
}

export default function DashboardClient({
  blogs,
  categories,
}: DashboardClientProps) {
  // Calculate stats
  const publishedBlogs = blogs.filter(blog => blog.status === 'published').length
  const draftBlogs = blogs.filter(blog => blog.status === 'draft').length
  const totalViews = 12400
  
  return (
    <div className="min-h-screen py-6 px-4 max-w-7xl mx-auto">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Blogs Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Blogs</p>
              <p className="text-3xl font-bold text-white mt-1">{blogs.length}</p>
              <p className="text-purple-100 text-xs mt-1">Published & Draft</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-purple-200" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex-1 bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-purple-400 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(publishedBlogs / blogs.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="ml-3 text-purple-100">{publishedBlogs} Published</span>
          </div>
        </motion.div>
        
        {/* Published Blogs Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Published</p>
              <p className="text-3xl font-bold text-white mt-1">{publishedBlogs}</p>
              <p className="text-green-100 text-xs mt-1">Live on your site</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-200" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex-1 bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-500" 
                style={{ width: '100%' }}
              ></div>
            </div>
            <span className="ml-3 text-green-100">100% Ready</span>
          </div>
        </motion.div>
        
        {/* Draft Blogs Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Drafts</p>
              <p className="text-3xl font-bold text-white mt-1">{draftBlogs}</p>
              <p className="text-yellow-100 text-xs mt-1">In progress</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Clock className="w-6 h-6 text-yellow-200" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex-1 bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(draftBlogs / blogs.length) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="ml-3 text-yellow-100">{draftBlogs} In Progress</span>
          </div>
        </motion.div>
        
        {/* Categories Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-white mt-1">{categories.length}</p>
              <p className="text-blue-100 text-xs mt-1">Content organization</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FolderOpen className="w-6 h-6 text-blue-200" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex-1 bg-gray-700/50 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${categories.length > 0 ? Math.min(100, categories.length * 20) : 0}%` }}
              ></div>
            </div>
            <span className="ml-3 text-blue-100">{categories.length} Categories</span>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Section */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Analytics Overview</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Week
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Month
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Year
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Page Views Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Page Views</h3>
                <div className="h-64 relative">
                  <div className="absolute inset-0 flex items-end justify-between p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-24 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Mon</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-32 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Tue</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-40 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Wed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-36 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Thu</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-44 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Fri</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-32 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Sat</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-28 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Sun</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700"></div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <span>0</span>
                  <span>500</span>
                  <span>1,000</span>
                  <span>1,500</span>
                  <span>2,000</span>
                </div>
              </div>
              
              {/* Blog Status Distribution */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Blog Status</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">Published</span>
                      <span className="text-gray-900 dark:text-white font-medium">{publishedBlogs}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${(publishedBlogs / blogs.length) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">Drafts</span>
                      <span className="text-gray-900 dark:text-white font-medium">{draftBlogs}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${(draftBlogs / blogs.length) * 100 || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Drafts</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <div>
          <Card variant="glass" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">New blog post published</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">How to use Next.js App Router</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                  <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">New category created</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Next.js Tutorials</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3">
                  <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">Analytics updated</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Page views increased by 12%</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg mr-3">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">New user registered</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">aishaanjumsidddiqui97@gmail.com</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Recent Blogs & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Blogs */}
        <div>
          <Card variant="glass" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Blogs</h2>
              <div className="flex items-center space-x-2">
                <a 
                  href="/admin/blogs/new"
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Blog
                </a>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">View All</button>
              </div>
            </div>
            
            <div className="space-y-4">
              {blogs.slice(0, 4).map((blog) => (
                <div 
                  key={blog._id || blog.id} 
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                    {blog.title.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{blog.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {blog.status}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        
        {/* Recent Categories */}
        <div>
          <Card variant="glass" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Categories</h2>
              <div className="flex items-center space-x-2">
                <a 
                  href="/admin/categories/new"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Category
                </a>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">View All</button>
              </div>
            </div>
            
            <div className="space-y-4">
              {categories.length > 0 ? (
                categories.slice(0, 4).map((category) => (
                  <div 
                    key={category._id} 
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                      {category.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white">{category.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {blogs.filter(blog => blog.category === category._id || blog.category === category.name).length} blogs
                      </p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FolderOpen className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">No categories yet</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create your first category to organize your content</p>
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Create Category
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}