'use client'

import { useState, useEffect } from 'react'
import SimpleEditor from '@/components/editors/SimpleEditor'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { motion } from 'framer-motion'

interface Category {
  _id: string
  name: string
}

export default function CreateBlogPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  // Form data
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        const cats = Array.isArray(data) ? data : (data.data || [])
        
        // If no categories, add some default ones
        if (cats.length === 0) {
          setCategories([
            { _id: 'tech', name: 'Technology' },
            { _id: 'defense', name: 'Defense' },
            { _id: 'lifestyle', name: 'Lifestyle' },
            { _id: 'business', name: 'Business' },
            { _id: 'health', name: 'Health' },
            { _id: 'travel', name: 'Travel' },
            { _id: 'food', name: 'Food' },
          ])
        } else {
          setCategories(cats)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching categories:', err)
        // Set default categories on error
        setCategories([
          { _id: 'tech', name: 'Technology' },
          { _id: 'defense', name: 'Defense' },
          { _id: 'lifestyle', name: 'Lifestyle' },
          { _id: 'business', name: 'Business' },
          { _id: 'health', name: 'Health' },
          { _id: 'travel', name: 'Travel' },
          { _id: 'food', name: 'Food' },
        ])
        setLoading(false)
      })
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to server
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success && data.data?.url) {
        setFeaturedImage(data.data.url)
      }
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (status: 'published' | 'draft') => {
    if (!title.trim()) {
      alert('Please enter a blog title')
      return
    }
    if (!category) {
      alert('Please select a category')
      return
    }
    if (!content.trim()) {
      alert('Please write some content')
      return
    }

    setSubmitting(true)

    try {
      // Get existing blogs from localStorage
      const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]')
      
      // Create new blog object
      const newBlog = {
        id: Date.now().toString(),
        title,
        category,
        content,
        featuredImage: featuredImage || '',
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      // Add to existing blogs
      existingBlogs.push(newBlog)
      
      // Save to localStorage
      localStorage.setItem('blogs', JSON.stringify(existingBlogs))
      
      alert(`Blog ${status === 'published' ? 'published' : 'saved as draft'} successfully!`)
      
      // Reset form
      setTitle('')
      setCategory('')
      setContent('')
      setFeaturedImage(null)
      setImagePreview('')
      
      // Redirect to blogs page after 1 second
      setTimeout(() => {
        window.location.href = '/admin/blogs'
      }, 1000)
    } catch (err) {
      console.error('Submit failed:', err)
      alert('Failed to save blog: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto bg-[#09090B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto bg-[#09090B]">
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#FAFAFA]">Create New Blog</h1>
        <p className="text-[#A1A1AA] mt-2">Write and publish your next article</p>
      </motion.header>

      <Card variant="glass" className="mb-8">
        <form className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#FAFAFA] mb-2">
              Blog Title
            </label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title..." 
              className="bg-[#18181B]/50 border-[#FFFFFF]/10 focus:border-[#6366F1] focus:ring-[#6366F1]/20"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#FAFAFA] mb-2">
              Category
            </label>
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#18181B]/50 border border-[#FFFFFF]/10 rounded-lg px-4 py-3 text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30"
            >
              <option value="">Select a category</option>
              {Array.isArray(categories) && categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
              Featured Image
            </label>
            <input
              type="file"
              id="featured-image"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <label
              htmlFor="featured-image"
              className="flex items-center justify-center w-full border-2 border-dashed border-[#FFFFFF]/10 rounded-xl p-8 bg-[#18181B]/30 cursor-pointer hover:border-[#6366F1]/50 hover:bg-[#18181B]/50 transition-all"
            >
              {uploading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2 text-sm text-[#A1A1AA]">Uploading...</p>
                </div>
              ) : imagePreview ? (
                <div className="text-center">
                  <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-2" />
                  <p className="text-sm text-[#22C55E]">✓ Image uploaded</p>
                  <p className="text-xs text-[#71717A] mt-1">Click to change</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-[#A1A1AA]">Click to upload featured image</p>
                  <p className="text-xs text-[#71717A] mt-1">PNG, JPG, WEBP up to 5MB</p>
                </div>
              )}
            </label>
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
              Content
            </label>
            <SimpleEditor 
              value={content}
              onChange={setContent}
              placeholder="Start writing your blog content..." 
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={submitting}
                className="px-6 py-3 bg-[#EC4899] hover:bg-[#DB2777] text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Publishing...' : 'Publish'}
              </button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                disabled={submitting}
                className="px-6 py-3 border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/10 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Saving...' : 'Save as Draft'}
              </button>
            </motion.div>
          </div>
        </form>
      </Card>
    </div>
  )
}