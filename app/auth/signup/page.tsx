'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const password = watch('password')

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    // Simulate API call
    try {
      await new Promise((r) => setTimeout(r, 800))
      
      // In real app: redirect or show success
      window.location.href = '/admin/login'
    } catch (err) {
      setSubmitError('Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col md:flex-row">
      {/* Left Hero Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-1/2 lg:w-2/5 bg-gradient-to-br from-[#18181B] to-[#09090B] p-12 flex-col justify-center items-start"
      >
        <div className="max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#FAFAFA] mb-4">Nexa Blog</h1>
            <p className="text-xl text-[#A1A1AA] max-w-lg">
              Create your blog platform in minutes. No setup, no configuration — just write.
            </p>
          </div>
          <div className="mt-16 space-y-4">
            <div className="flex items-center text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Zero-config deployment</span>
            </div>
            <div className="flex items-center text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-lg bg-[#EC4899]/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EC4899]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>AI-powered content suggestions</span>
            </div>
            <div className="flex items-center text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#14B8A6]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Real-time collaboration tools</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Signup Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 flex items-center justify-center p-6 md:p-12"
      >
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#18181B] backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#FAFAFA]">Create Account</h2>
              <p className="text-[#A1A1AA] mt-2">Join thousands of creators using Nexa Blog</p>
            </div>

            {submitError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/30 border border-red-700/30 rounded-lg text-red-200 text-sm"
              >
                {submitError}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#FAFAFA] mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters',
                      },
                    })}
                    className={`w-full px-4 py-3 bg-[#18181B] border ${errors.name ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors`}
                    placeholder="Aisha A. Siddiqui"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#FAFAFA] mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 
                        message: 'Please enter a valid email address',
                      },
                    })}
                    className={`w-full px-4 py-3 bg-[#18181B] border ${errors.email ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#FAFAFA] mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    className={`w-full px-4 py-3 bg-[#18181B] border ${errors.password ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#FAFAFA] mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                    className={`w-full px-4 py-3 bg-[#18181B] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      type="checkbox"
                      {...register('agreeToTerms', {
                        required: 'You must agree to the terms and privacy policy',
                      })}
                      className="h-4 w-4 rounded border-[#FFFFFF]/20 bg-[#18181B] text-[#6366F1] focus:ring-[#6366F1]"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="font-normal text-[#A1A1AA]">
                      I agree to the{' '}
                      <a href="#" className="font-medium text-[#6366F1] hover:text-[#818CF8]">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="font-medium text-[#6366F1] hover:text-[#818CF8]">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                {errors.agreeToTerms && (
                  <p className="mt-1 text-xs text-red-400">{errors.agreeToTerms.message}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${isSubmitting ? 'bg-[#6366F1]/70 cursor-not-allowed' : 'bg-[#6366F1] hover:bg-[#4F46E5] shadow-lg hover:shadow-xl'}`}
                  >
                    {isSubmitting ? 'Creating account...' : 'Sign Up'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-[#A1A1AA]">
              <p>
                Already have an account?{' '}
                <a 
                  href="/admin/login" 
                  className="font-medium text-[#EC4899] hover:text-[#DB2777] transition-colors"
                >
                  Sign in
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}