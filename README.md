# Blog Platform with Admin Panel

A modern, scalable, and fully responsive blog platform with admin panel built with Next.js, MongoDB, and Tailwind CSS.

## Features

### Admin Features
- Secure admin authentication with JWT
- Create, edit, delete, and publish/unpublish blog posts
- Manage blog categories
- Upload blog thumbnails and images via Cloudinary
- Admin dashboard with statistics

### User Features
- View all blogs with pagination
- Read full blog details
- Search blogs
- Filter blogs by category
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Rich Text Editor**: Quill Editor
- **Image Storage**: Cloudinary

## Getting Started

### Prerequisites
- Node.js (v18.0 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account

### Installation

1. Clone the repository:
```bash
npm install
```

2. Create a `.env.local` file in the root directory and add your environment variables:
```
MONGODB_URI="mongodb://localhost:27017/blog-platform"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/                    # Next.js App Router
├── layout.tsx          # Root layout with dark theme
├── page.tsx            # Home page (blog listing)
├── blog/
│   ├── page.tsx        # Blog listing with pagination
│   ├── [id]/
│   │   └── page.tsx    # Single blog detail page
│   └── category/
│       └── [slug]/
│           └── page.tsx # Category filter page
├── admin/
│   ├── login/
│   │   └── page.tsx    # Admin login page
│   ├── dashboard/
│   │   └── page.tsx    # Admin dashboard
│   ├── blogs/
│   │   ├── page.tsx    # Blog management list
│   │   ├── new/
│   │   │   └── page.tsx # Create blog form
│   │   └── [id]/
│   │       └── page.tsx # Edit blog form
│   └── categories/
│       ├── page.tsx    # Category management
│       └── new/
│           └── page.tsx # Create category
├── api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── logout/route.ts
│   ├── blogs/
│   │   ├── route.ts    # GET all blogs, POST new blog
│   │   └── [id]/
│   │       ├── route.ts # GET, PUT, DELETE specific blog
│   │       └── publish/route.ts # Toggle publish status
│   ├── categories/
│   │   ├── route.ts    # GET all categories, POST new category
│   │   └── [id]/
│   │       └── route.ts # GET, PUT, DELETE specific category
│   └── upload/
│       └── route.ts    # Cloudinary image upload endpoint
lib/
├── db.ts             # MongoDB connection
├── mongoose.ts       # Mongoose models
├── auth.ts           # JWT authentication middleware
└── cloudinary.ts     # Cloudinary configuration
models/
├── User.ts           # User model (admin/user roles)
├── Blog.ts           # Blog model with rich text content
└── Category.ts       # Category model
components/
├── ui/               # Reusable UI components
├── editors/
│   └── QuillEditor.tsx # Custom Quill editor with Cloudinary integration
├── layouts/
│   └── AdminLayout.tsx # Admin-specific layout
└── blog/
    ├── BlogCard.tsx
    ├── BlogList.tsx
    └── BlogContent.tsx # Rich text renderer
public/
└── images/           # Static assets
types/
└── index.ts          # TypeScript interfaces
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab
2. Import the project into [Vercel](https://vercel.com/new)
3. In the project settings, add these **Environment Variables**:
   - `MONGODB_URI` → Your MongoDB connection string (e.g., Atlas URI)
   - `JWT_SECRET` → A strong secret (generate at https://generate-secret.now.sh/)
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `NEXT_PUBLIC_BASE_URL` → Your deployed domain (e.g., `https://your-app.vercel.app`)
4. Set build command to `npm run build`
5. Output directory: `.next`
6. Click **Deploy**

> 💡 Tip: For local development, keep `.env.local` — Vercel uses its own env system in production.

### Backend (Optional)
API routes are bundled into the Next.js app and deployed with frontend. No separate backend deploy needed.

## License

This project is licensed under the MIT License.
