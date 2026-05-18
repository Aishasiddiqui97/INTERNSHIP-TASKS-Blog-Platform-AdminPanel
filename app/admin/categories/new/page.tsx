'use client'

import { useRouter } from 'next/navigation'

export default function AdminCreateCategoryPage() {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = e.currentTarget
    const nameInput = form.elements.namedItem('name') as HTMLInputElement
    const name = nameInput?.value?.trim() || ''
    
    if (!name) {
      alert('Please enter a category name')
      return
    }
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Show success message and redirect
        alert('Category created successfully!')
        router.push('/admin/categories')
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('An error occurred while creating the category')
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#F8FAFC]">Create New Category</h1>
        <p className="text-[#94A3B8] mt-2">Add a new blog category</p>
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
            Create Category
          </button>
        </div>
      </form>
    </div>
  )
}
