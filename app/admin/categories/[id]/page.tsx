'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CategoryDocument } from '@/models/Category'

export default function AdminEditCategoryPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  
  const [category, setCategory] = useState<CategoryDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${id}`)
        const result = await response.json()
        if (result.success) {
          setCategory(result.data)
        } else {
          setError(result.message || 'Failed to load category')
        }
      } catch (err) {
        setError('Error loading category')
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategory()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        alert('Category updated successfully!')
        router.push('/admin/categories')
      } else {
        setError(result.message || 'Failed to update category')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      setError('An error occurred while updating the category')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#F8FAFC]">Edit Category</h1>
          <p className="text-[#94A3B8] mt-2">Loading category...</p>
        </header>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#F8FAFC]">Edit Category</h1>
          <p className="text-[#94A3B8] mt-2">{error}</p>
        </header>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#F8FAFC]">Edit Category</h1>
          <p className="text-[#94A3B8] mt-2">Category not found</p>
        </header>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8FAFC]">Edit Category</h1>
        <p className="text-[#94A3B8] mt-2">Update category information</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-[#1E293B] rounded-xl p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#F8FAFC] mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={category.name}
            required
            className="w-full px-4 py-3 bg-[#0B0F19] border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] text-[#F8FAFC]"
            placeholder="Enter category name"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-6 py-3 border border-[#334155] text-[#F8FAFC] font-medium rounded-lg hover:bg-[#334155] transition-colors"
            onClick={() => router.push('/admin/categories')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-medium rounded-lg transition-colors"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  )
}