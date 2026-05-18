'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setSubmitError('')
    
    // Simulate API call
    try {
      await new Promise((r) => setTimeout(r, 800))
      
      setIsSubmitted(true)
      setIsSubmitting(false)
    } catch (err) {
      setSubmitError('Failed to send reset link. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#18181B] backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#FAFAFA]">Check your inbox</h2>
          <p className="text-[#A1A1AA] mt-2">
            We've sent a password reset link to your email address.
          </p>
          <p className="text-[#A1A1AA] mt-4 text-sm">
            Didn't receive it? Check your spam folder or{' '}
            <button 
              onClick={() => setIsSubmitted(false)}
              className="font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors"
            >
              try again
            </button>
          </p>
          <div className="mt-6">
            <button
              onClick={() => window.location.href = '/admin/login'}
              className="w-full py-3 px-4 bg-[#EC4899] hover:bg-[#DB2777] text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Back to Login
            </button>
          </div>
        </motion.div>
      </div>
    )
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
              Reset your password in seconds. Secure, simple, and fast.
            </p>
          </div>
          <div className="mt-16 space-y-4">
            <div className="flex items-center text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6366F1]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Secure password reset</span>
            </div>
            <div className="flex items-center text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-lg bg-[#EC4899]/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EC4899]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>No SMS or phone required</span>
            </div>
            <div className="flex items-center text-[#A1A1AA]">
              <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#14B8A6]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Encrypted end-to-end</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Form */}
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
              <h2 className="text-3xl font-bold text-[#FAFAFA]">Reset Password</h2>
              <p className="text-[#A1A1AA] mt-2">
                Enter your email to receive a reset link
              </p>
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
                    className={`w-full px-4 py-3 bg-[#18181B] border ${errors.email ? 'border-red-500' : 'border-[#FFFFFF]/10'} rounded-lg text-[#FAFAFA] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent transition-colors`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all ${isSubmitting ? 'bg-[#14B8A6]/70 cursor-not-allowed' : 'bg-[#14B8A6] hover:bg-[#0D9488] shadow-lg hover:shadow-xl'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-[#A1A1AA]">
              <p>
                Remember your password?{' '}
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