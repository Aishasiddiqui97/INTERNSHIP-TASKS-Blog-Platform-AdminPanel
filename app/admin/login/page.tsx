'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    // Simulate API call
    try {
      await new Promise((r) => setTimeout(r, 800))
      
      // In real app: redirect or set auth token
      window.location.href = '/admin/dashboard'
    } catch (err) {
      setSubmitError('Invalid email or password. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#0B1120] flex flex-col md:flex-row overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#06B6D4]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Left Hero Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: isMounted ? 1 : 0, x: isMounted ? 0 : -50 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gradient-to-br from-[#0B1120] to-[#111827] p-12 flex-col justify-center items-start relative overflow-hidden"
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06B6D4]/5 to-transparent"></div>
        
        {/* Floating animated blobs */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-[#06B6D4]/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-[#8B5CF6]/20 rounded-full blur-xl animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#22C55E]/20 rounded-full blur-xl animate-bounce delay-1400"></div>
        
        <div className="max-w-md z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-[#F8FAFC] mb-4 bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Nexa Blog
            </h1>
            <p className="text-xl text-[#CBD5E1] max-w-lg">
              A modern blog platform for creators. Manage content, users, and analytics in one place.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 space-y-6"
          >
            <div className="flex items-start text-[#CBD5E1]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#22C55E] mr-4 mt-2"></div>
              <span className="text-base">Secure admin dashboard with role-based access</span>
            </div>
            <div className="flex items-start text-[#CBD5E1]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] mr-4 mt-2"></div>
              <span className="text-base">Real-time analytics & insights with beautiful charts</span>
            </div>
            <div className="flex items-start text-[#CBD5E1]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#22C55E] to-[#14B8A6] mr-4 mt-2"></div>
              <span className="text-base">Cloud-powered media upload with Cloudinary integration</span>
            </div>
            <div className="flex items-start text-[#CBD5E1]">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#EF4444] to-[#EC4899] mr-4 mt-2"></div>
              <span className="text-base">SEO-optimized content management system</span>
            </div>
          </motion.div>
          
          {/* Dashboard preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isMounted ? 1 : 0, scale: isMounted ? 1 : 0.95 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-[#111827]/50 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-xl p-4 max-w-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-xs text-[#CBD5E1]">Dashboard Preview</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-[#06B6D4] to-[#22C55E] h-2 rounded-full"></div>
              <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] h-2 rounded-full"></div>
              <div className="bg-gradient-to-r from-[#14B8A6] to-[#EF4444] h-2 rounded-full"></div>
              <div className="bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] h-2 rounded-full"></div>
            </div>
            <div className="mt-4 text-xs text-[#CBD5E1]">
              <div className="flex justify-between mb-1">
                <span>Total Blogs</span>
                <span>24</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Published</span>
                <span>18</span>
              </div>
              <div className="flex justify-between">
                <span>Drafts</span>
                <span>6</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: isMounted ? 1 : 0, x: isMounted ? 0 : 50 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex items-center justify-center p-6 md:p-12"
      >
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: isMounted ? 1 : 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#111827] backdrop-blur-xl border border-[#FFFFFF]/10 rounded-2xl p-8 shadow-2xl shadow-[#06B6D4]/10"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#F8FAFC]">Welcome Back</h2>
              <p className="text-[#CBD5E1] mt-2">Sign in to your admin dashboard</p>
            </div>

            <AnimatePresence>
              {submitError && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-gradient-to-r from-red-900/30 to-red-700/30 border border-red-700/30 rounded-lg text-red-200 text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {submitError}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#F8FAFC] mb-2 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[#06B6D4]" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, 
                          message: 'Please enter a valid email address',
                        },
                      })}
                      className={`w-full px-4 py-3 pl-12 pr-4 bg-[#111827] border ${errors.email ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all duration-300 ${errors.email ? 'ring-red-500' : ''}`}
                      placeholder="you@example.com"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-[#CBD5E1]/50" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#F8FAFC] mb-2 flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-[#06B6D4]" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                      className={`w-full px-4 py-3 pl-12 pr-12 bg-[#111827] border ${errors.password ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#F8FAFC] placeholder-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-transparent transition-all duration-300 ${errors.password ? 'ring-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-[#CBD5E1]/50" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#CBD5E1]/50 hover:text-[#06B6D4] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      {...register('remember')}
                      className="h-4 w-4 rounded border-[#FFFFFF]/20 bg-[#111827] text-[#06B6D4] focus:ring-[#06B6D4]"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-[#CBD5E1]">
                      Remember me
                    </label>
                  </div>
                  <a 
                    href="/auth/forgot-password" 
                    className="text-sm font-medium text-[#06B6D4] hover:text-[#8B5CF6] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center ${isSubmitting ? 'bg-gradient-to-r from-[#06B6D4]/70 to-[#8B5CF6]/70 cursor-not-allowed' : 'bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#06B6D4] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V5a7 7 0 00-7 7h1z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-[#CBD5E1]">
              <p>
                Don't have an account?{' '}
                <a 
                  href="/auth/signup" 
                  className="font-medium text-[#06B6D4] hover:text-[#8B5CF6] transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#FFFFFF]/10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#FFFFFF]/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-[#111827] text-[#CBD5E1]">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#FFFFFF]/10 rounded-lg bg-[#111827] text-[#F8FAFC] hover:bg-[#1E293B] transition-all duration-300 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#FFFFFF]/10 rounded-lg bg-[#111827] text-[#F8FAFC] hover:bg-[#1E293B] transition-all duration-300 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2 text-[#8B5CF6]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#FFFFFF]/10 rounded-lg bg-[#111827] text-[#F8FAFC] hover:bg-[#1E293B] transition-all duration-300 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-[#FFFFFF]/10 rounded-lg bg-[#111827] text-[#F8FAFC] hover:bg-[#1E293B] transition-all duration-300 flex items-center"
                >
                  <svg className="h-5 w-5 mr-2 text-[#8B5CF6]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}