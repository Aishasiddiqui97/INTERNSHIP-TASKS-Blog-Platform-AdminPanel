import { useState, useEffect } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const generatePages = () => {
      const pageNumbers = []
      
      // Always show first page
      pageNumbers.push(1)
      
      // Show ellipsis if current page is far from first
      if (currentPage > 3) {
        pageNumbers.push(-1) // ellipsis
      }
      
      // Show current page and neighbors
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i)
      }
      
      // Show ellipsis if current page is far from last
      if (currentPage < totalPages - 2) {
        pageNumbers.push(-1) // ellipsis
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages)
      }
      
      setPages(pageNumbers)
    }
    
    generatePages()
  }, [currentPage, totalPages])

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1 ? 'text-[#94A3B8] cursor-not-allowed' : 'text-[#8B5CF6] hover:bg-[#1E293B]'} transition-colors`}
      >
        Previous
      </button>
      
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => page !== -1 && goToPage(page)}
          className={`w-10 h-10 rounded-lg font-medium flex items-center justify-center ${page === currentPage ? 'bg-[#8B5CF6] text-white' : 'text-[#F8FAFC] hover:bg-[#1E293B]'}`}
        >
          {page === -1 ? '...' : page}
        </button>
      ))}
      
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-medium ${currentPage === totalPages ? 'text-[#94A3B8] cursor-not-allowed' : 'text-[#8B5CF6] hover:bg-[#1E293B]'} transition-colors`}
      >
        Next
      </button>
    </div>
  )
}
