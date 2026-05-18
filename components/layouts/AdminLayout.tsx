'use client'

import { ReactNode, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, FileText, Folder, Users, Settings, LogOut, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme')
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = savedTheme === 'dark' || (!savedTheme && isSystemDark)
      
      setDarkMode(isDark)
      
      // Apply dark class immediately
      const root = document.documentElement
      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [])

  const toggleDarkMode = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const newDarkMode = !darkMode
    console.log('=== TOGGLE DARK MODE ===')
    console.log('Old value:', darkMode)
    console.log('New value:', newDarkMode)
    
    setDarkMode(newDarkMode)
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
    
    const root = document.documentElement
    const body = document.body
    
    if (newDarkMode) {
      root.classList.add('dark')
      body.classList.add('dark')
      console.log('✅ Added dark class to html and body')
    } else {
      root.classList.remove('dark')
      body.classList.remove('dark')
      console.log('✅ Removed dark class from html and body')
    }
    
    console.log('HTML classes:', root.className)
    console.log('Body classes:', body.className)
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Blogs', href: '/admin/blogs', icon: FileText },
    { name: 'Categories', href: '/admin/categories', icon: Folder },
    { name: 'Users', href: '/admin/users', icon: Users },
  ]

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // Redirect to login page
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl z-50"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-white">BP</span>
                  </div>
                  <h2 className="text-xl font-bold">Nexa Blog</h2>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <nav className="p-2 h-[calc(100vh-220px)] overflow-y-auto">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg mb-1 transition-all group"
                >
                  <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900 space-y-2">
              <button 
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all"
              >
                {darkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
                >
                  <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v5.659A5.972 5.972 0 0010 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  
                  {/* User Profile & Logout */}
                  <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-700 pl-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        A
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">Admin</span>
                    </div>
                    
                    <button 
                      onClick={handleLogout}
                      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {/* Mobile Sidebar Toggle Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
