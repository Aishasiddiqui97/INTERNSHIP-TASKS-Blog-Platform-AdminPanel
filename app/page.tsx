import { getBlogs } from '@/lib/api'
import { getCategories } from '@/lib/api'

export default async function HomePage() {
  const blogs = await getBlogs()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-primary-dark dark:bg-primary-dark transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-dark dark:text-text-dark leading-tight">
              Share Your Ideas, <span className="text-accent-dark dark:text-accent-dark">Inspire the World</span>
            </h1>
            <p className="text-muted-dark dark:text-muted-dark mt-6 text-lg max-w-2xl">
              A modern, beautifully designed blog platform for creators who value simplicity, speed, and elegance.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a 
                href="/blog" 
                className="px-8 py-4 bg-accent-dark dark:bg-accent-dark text-primary-dark dark:text-primary-dark font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Explore Blogs
              </a>
              <a 
                href="/admin/login" 
                className="px-8 py-4 bg-success-dark dark:bg-success-dark text-primary-dark dark:text-primary-dark font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all border border-success-dark/20"
              >
                Start Writing
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-accent-dark/10 rounded-full blur-3xl"></div>
            <div className="relative bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-dark flex items-center justify-center text-primary-dark font-bold">
                    N
                  </div>
                  <span className="ml-3 text-text-dark font-medium">Nexa Blog</span>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-2">How to Write a Great Blog Post</h3>
                <p className="text-muted-dark text-sm mb-4">Learn proven techniques for engaging headlines, storytelling, SEO, and visual content.</p>
                <div className="flex items-center text-xs text-muted-dark">
                  <span className="mr-4">By Aisha Siddiqui</span>
                  <span>May 12, 2026</span>
                </div>
              </div>
              <div className="h-48 bg-gradient-to-r from-accent-dark/20 to-success-dark/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-text-dark dark:text-text-dark">Featured Articles</h2>
          <a href="/blog" className="text-accent-dark dark:text-accent-dark font-medium hover:underline">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog, i) => (
            <article 
              key={blog._id}
              className="bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl overflow-hidden transition-all hover:border-[#FFFFFF]/20"
            >
              <div className="h-48 bg-gradient-to-r from-accent-dark/10 to-success-dark/10"></div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-accent-dark/10 text-accent-dark text-xs font-medium rounded-full mb-3">
                  {blog.category?.name || 'Uncategorized'}
                </span>
                <h3 className="text-xl font-bold text-text-dark dark:text-text-dark mb-2">{blog.title}</h3>
                <p className="text-muted-dark dark:text-muted-dark text-sm mb-4 line-clamp-2">{blog.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-dark dark:text-muted-dark">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                  <a 
                    href={`/blog/${blog._id}`} 
                    className="text-accent-dark dark:text-accent-dark text-sm font-medium hover:underline"
                  >
                    Read →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-text-dark dark:text-text-dark mb-8">Explore by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, i) => (
            <a 
              key={category._id}
              href={`/blog/category/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="flex flex-col items-center justify-center p-4 bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-xl hover:border-[#FFFFFF]/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-accent-dark/10 flex items-center justify-center mb-3 group-hover:bg-accent-dark/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21v1a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2v1m2 10v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v1m2 10v1a2 2 0 01-2 2h-2a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v1" />
                </svg>
              </div>
              <span className="text-text-dark dark:text-text-dark font-medium">{category.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 max-w-4xl mx-auto bg-secondary-dark/30 backdrop-blur-sm border border-[#FFFFFF]/10 rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text-dark dark:text-text-dark mb-4">Join Our Newsletter</h2>
          <p className="text-muted-dark dark:text-muted-dark max-w-xl mx-auto mb-8">
            Get the latest blog posts, design tips, and exclusive updates delivered straight to your inbox.
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

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#FFFFFF]/10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-text-dark dark:text-text-dark mb-4">Nexa Blog</h3>
            <p className="text-muted-dark dark:text-muted-dark text-sm">
              Empowering creators with elegant tools for publishing, collaboration, and growth.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text-dark dark:text-text-dark mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-dark dark:text-text-dark mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Docs</a></li>
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-dark dark:text-text-dark mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">GitHub</a></li>
              <li><a href="#" className="text-muted-dark dark:text-muted-dark hover:text-accent-dark transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#FFFFFF]/10 text-center text-sm text-muted-dark dark:text-muted-dark">
          © {new Date().getFullYear()} Nexa Blog. All rights reserved.
        </div>
      </footer>
    </div>
  )
}