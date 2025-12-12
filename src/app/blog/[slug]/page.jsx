"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
    FaCalendarAlt,
    FaUser,
    FaTags,
    FaArrowLeft,
} from "react-icons/fa"
import { MdArrowOutward } from "react-icons/md"
import axiosInstance from "../../../../components/axiosInstance"
import { useParams } from "next/navigation"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug
  
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (slug) {
      fetchBlogPost()
      fetchRelatedPosts()
    }
  }, [slug])

  const fetchBlogPost = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await axiosInstance.get(`/blogs/${slug}`)
      
      if (response.data.success) {
        setPost(response.data.data)
      } else {
        throw new Error("Failed to fetch blog post")
      }
    } catch (error) {
      console.error("Error fetching blog post:", error)
      setError(error.response?.data?.message || "Failed to load blog post. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async () => {
    try {
      const response = await axiosInstance.get("/blogs/all")
      
      if (response.data.success) {
        // Filter out current post and take 2 other posts as related
        const allPosts = response.data.data || []
        const filtered = allPosts.filter(p => p.slug !== slug).slice(0, 2)
        setRelatedPosts(filtered)
      }
    } catch (error) {
      console.error("Error fetching related posts:", error)
      // Don't set error state for related posts - main content is more important
    }
  }

  // Function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/home/HomeBanner2.webp" // Fallback image
    
    if (imagePath.startsWith('http')) {
      return imagePath
    }
    
    if (imagePath.startsWith('/uploads')) {
      return `http://localhost:5000${imagePath}`
    }
    
    return imagePath
  }

  // Format content with line breaks
  const formatContent = (content) => {
    if (!content) return ""
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.trim() === "") return null
      return `<p key=${index}>${paragraph}</p>`
    }).join('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00186b]"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog</h2>
          <p className="text-gray-600 mb-6">{error || "Blog post not found"}</p>
          <Link
            href="/blog"
            className="inline-flex items-center text-[#0060c9] hover:underline"
          >
            <FaArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {/* HERO SECTION */}
      <div className="relative h-[50vh] md:h-[75vh]">
        <Image
          src={getImageUrl(post.thumbnail || post.thumbnailUrl)}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-white text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <FaCalendarAlt className="h-4 w-4 mr-1" />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>

              <div className="flex items-center">
                <FaUser className="h-4 w-4 mr-1" />
                {post.author || "Admin"}
              </div>

              {post.categoryName && (
                <div className="flex items-center">
                  <FaTags className="h-4 w-4 mr-1" />
                  {post.categoryName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-14 pt-16 pb-20">
        <div className="">
          {/* MAIN CONTENT */}
          <div className="p-4 md:p-6 rounded-lg">
            <Link
              href="/blog"
              className="inline-flex items-center text-[#0060c9] mb-8 hover:underline"
            >
              <FaArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Short Description */}
            {post.shortDescription && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-[#00186b] mb-2">Summary</h3>
                <p className="text-gray-700">{post.shortDescription}</p>
              </div>
            )}

            {/* Main Content */}
            <article
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />

            {/* RELATED POSTS */}
            {relatedPosts.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">
                  Related Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <div
                      key={related._id}
                      className="group relative min-h-[300px] rounded-2xl overflow-hidden"
                    >
                      <Image
                        src={getImageUrl(related.thumbnail || related.thumbnailUrl)}
                        fill
                        alt={related.title}
                        className="object-cover group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute bottom-0 left-0 p-5 text-white">
                        <div className="flex justify-between text-xs mb-2 opacity-90">
                          <span className="bg-white/20 px-2 py-1 rounded-full backdrop-blur">
                            {related.author || "Admin"}
                          </span>
                          <span>
                            {new Date(related.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>

                        <h4 className="text-xl font-semibold">
                          {related.title}
                        </h4>
                        {related.shortDescription && (
                          <p className="text-white/80 text-sm line-clamp-2 mt-1">
                            {related.shortDescription.length > 100 
                              ? related.shortDescription.substring(0, 100) + "..." 
                              : related.shortDescription}
                          </p>
                        )}

                        <Link
                          href={`/blog/${related.slug}`}
                          className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg text-gray-900 text-xs font-semibold mt-4 hover:bg-gray-200 transition-colors"
                        >
                          Read More
                          <MdArrowOutward />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}