import { getBlogById } from '@/lib/api'
import { getBlogs } from '@/lib/api'

// Simulate reading time (1 min per 200 words)
const estimateReadingTime = (content: string) => {
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

export default async function SingleBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id)
  const relatedBlogs = await getBlogs()

  if (!blog) {
    return (
      <div className="min-h-screen bg-primary-dark dark:bg-primary-dark flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark dark:text-text-dark">Post Not Found</h2>
          <p className="text-muted-dark dark:text-muted-dark mt-2">The blog post you're looking for doesn't exist.</p>
          <a 
            href="/blog" 
            className="mt-4 inline-block px-5 py-2 bg-accent-dark dark:bg-accent-dark text-primary-dark dark:text-primary-dark rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Browse All Posts
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-dark dark:bg-primary-dark transition-colors duration-300">
      {/* Hero */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-64 bg-gradient-to-r from-accent-dark/10 to-success-dark/10 rounded-2xl mb-6"></div>
          <span className="inline-block px-4 py-1 bg-accent-dark/10 text-accent-dark text-sm font-medium rounded-full mb-4">
            {blog.category?.name || 'Uncategorized'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-text-dark leading-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center text-muted-dark dark:text-muted-dark text-sm">
            <span>By {typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Nexa Team'}</span>
            <span className="mx-2">•</span>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{estimateReadingTime(blog.content || '')}</span>
          </div>
        </div>
      </section>

      <main className="py-8 px-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-invert max-w-none">
              <p className="text-muted-dark dark:text-muted-dark text-lg leading-relaxed">
                {blog.content || 'This is a sample blog post. In production, this will render rich HTML content from your Quill editor.'}
              </p>
              
              <div className="mt-12 pt-8 border-t border-[#FFFFFF]/10">
                <h3 className="text-xl font-bold text-text-dark dark:text-text-dark mb-4">Share this post</h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="flex items-center px-4 py-2 bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-lg text-text-dark dark:text-text-dark hover:bg-secondary-dark/50 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      alert('Link copied to clipboard!')
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy Link
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-lg text-text-dark dark:text-text-dark hover:bg-secondary-dark/50 transition-colors"
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061c0 2.385 1.708 4.374 3.949 4.827a4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.2 0-.403-.014-.602.94-.677 1.797-1.562 2.457-2.549z" />
                    </svg>
                    Twitter
                  </button>
                  <button 
                    className="flex items-center px-4 py-2 bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-lg text-text-dark dark:text-text-dark hover:bg-secondary-dark/50 transition-colors"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Author Card */}
            <div className="bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-text-dark dark:text-text-dark mb-4">About the Author</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-accent-dark/10 flex items-center justify-center text-accent-dark font-bold mr-3">
                  {(typeof blog.author === 'string' ? blog.author : blog.author?.name)?.charAt(0) || 'N'}.toUpperCase()
                </div>
                <div>
                  <h3 className="font-bold text-text-dark dark:text-text-dark">{typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Nexa Team'}</h3>
                  <p className="text-xs text-muted-dark dark:text-muted-dark">Joined {new Date(blog.createdAt).getFullYear()}</p>
                </div>
              </div>
              <p className="text-muted-dark dark:text-muted-dark text-sm">
                A passionate creator sharing insights on design, development, and digital storytelling.
              </p>
            </div>

            {/* Related Posts */}
            <div className="bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-text-dark dark:text-text-dark mb-4">Related Posts</h2>
              <ul className="space-y-4">
                {relatedBlogs
                  .filter(b => b._id !== blog._id)
                  .slice(0, 3)
                  .map((b) => (
                    <li key={b._id} className="flex items-start">
                      <div className="w-10 h-10 rounded-lg bg-accent-dark/10 flex items-center justify-center text-accent-dark text-xs font-bold mr-3 flex-shrink-0">
                        {b.title.charAt(0)}
                      </div>
                      <div>
                        <a 
                          href={`/blog/${b._id}`} 
                          className="font-medium text-text-dark dark:text-text-dark hover:text-accent-dark transition-colors line-clamp-2"
                        >
                          {b.title}
                        </a>
                        <p className="text-xs text-muted-dark dark:text-muted-dark mt-1">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* Newsletter CTA (Bottom) */}
      <section className="py-12 px-4 max-w-4xl mx-auto bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark dark:text-text-dark mb-2">Love what you read?</h2>
          <p className="text-muted-dark dark:text-muted-dark max-w-xl mx-auto mb-6">
            Subscribe to our newsletter and get new posts delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-5 py-3 bg-primary-dark/50 border border-[#FFFFFF]/10 rounded-lg text-text-dark dark:text-text-dark placeholder-muted-dark focus:outline-none focus:ring-2 focus:ring-accent-dark focus:border-transparent"
            />
            <button 
              className="px-6 py-3 bg-accent-dark dark:bg-accent-dark text-primary-dark dark:text-primary-dark font-medium rounded-lg transition-all hover:opacity-90"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}