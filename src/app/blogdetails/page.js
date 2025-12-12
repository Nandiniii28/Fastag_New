"use client"
import Image from "next/image"
import Link from "next/link"

// React Icons
import {
    FaCalendarAlt,
    FaUser,
    FaTags,
    FaArrowLeft,
} from "react-icons/fa"

import { MdShare, MdArrowOutward } from "react-icons/md"
const post = {
    title: "The Future of Web Development in 2025",
    slug: "future-of-web-development",
    created_at: "2025-09-05",
    image: "/home/HomeBanner2.webp",
    categoryName: "Technology",
    content: `
         <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
    <p>Expect more serverless, edge computing, and immersive experiences 
    powered by WebGPU and WASM.</p>   <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
    <p>Expect more serverless, edge computing, and immersive experiences 
    powered by WebGPU and WASM.</p>   <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
        <p>Expect more serverless, edge computing, and immersive experiences 
    powered by WebGPU and WASM.</p>   <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
    <p>Expect more serverless, edge computing, and immersive experiences 
    powered by WebGPU and WASM.</p>   <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
        <p>Expect more serverless, edge computing, and immersive experiences 
    powered by WebGPU and WASM.</p>   <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
    <p>Expect more serverless, edge computing, and immersive experiences 
    powered by WebGPU and WASM.</p>   <p>Web development is evolving rapidly with AI-powered tools, frameworks, 
    and better performance optimization. In this article, we explore the 
    latest trends shaping the industry.</p>
    `,
}

const relatedPosts = [
    {
        id: 1,
        title: "Why Tailwind CSS is Taking Over",
        slug: "tailwind-css-trends",
        created_at: "2025-08-15",
      image: "/home/HomeBanner2.webp",
        categoryName: "Design",
        author: "Jane Doe",
        description:
            "Discover why Tailwind CSS has become the go-to utility framework.",
    },
    {
        id: 2,
        title: "Mastering Next.js in 2025",
        slug: "nextjs-mastering",
        created_at: "2025-07-30",
       image: "/home/HomeBanner2.webp",
        categoryName: "Development",
        author: "John Smith",
        description: "Learn the latest Next.js features and best practices.",
    },
]

const trendingPosts = [
    {
        title: "10 AI Tools Every Dev Should Know",
        slug: "ai-tools",
        created_at: "2025-08-20",
       image: "/home/HomeBanner2.webp",
        categoryName: "AI",
    },
    {
        title: "React Server Components Explained",
        slug: "rsc-guide",
        created_at: "2025-07-18",
     image: "/user/car1.jpg",
        categoryName: "Development",
    },
]

const recentPosts = [
    {
        title: "Building Apps with Bun.js",
        slug: "bunjs-apps",
        created_at: "2025-09-01",
  image: "/user/c3.jpg",
        categoryName: "JavaScript",
    },
    {
        title: "CSS Tricks for Responsive Design",
        slug: "css-tricks",
        created_at: "2025-08-25",
    image: "/user/c1.jpg",
        categoryName: "Design",
    },
]

const categories = {
    Technology: 5,
    Design: 3,
    Development: 7,
    AI: 4,
}

export default function BlogPostPage() {
    return (
        <div className="">
            {/* HERO SECTION */}
            <div className="relative h-[50vh] md:h-[75vh] ">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 text-white text-center max-w-3xl">
                        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {/* <div className="flex items-center">
                                <FaCalendarAlt className="h-4 w-4 mr-1" />
                                {new Date(post.created_at).toLocaleDateString()}
                            </div> */}

                            <div className="flex items-center">
                                <FaUser className="h-4 w-4 mr-1" /> Admin
                            </div>

                            <div className="flex items-center">
                                <FaTags className="h-4 w-4 mr-1" />
                                {post.categoryName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-7xl mx-auto px-14 pt-16 pb-20">
                <div className="">
                    {/* MAIN CONTENT */}
                    <div className="p-6 rounded-lg">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-[#0060c9] mb-8 hover:underline"
                        >
                            <FaArrowLeft className="h-4 w-4 mr-2" />
                            Back to Blog
                        </Link>

                        <article
                            className="prose prose-lg max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />


                        {/* RELATED POSTS */}
                        <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-6">
                                Related Articles
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {relatedPosts.map((related) => (
                                    <div
                                        key={related.id}
                                        className="group relative min-h-[300px] rounded-2xl overflow-hidden"
                                    >
                                        <Image
                                            src={related.image}
                                            fill
                                            alt={related.title}
                                            className="object-cover group-hover:scale-105 transition-all duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                        <div className="absolute bottom-0 left-0 p-5 text-white">
                                            <div className="flex justify-between text-xs mb-2 opacity-90">
                                                <span className="bg-white/20 px-2 py-1 rounded-full backdrop-blur">
                                                    {related.author}
                                                </span>
                                                <span>
                                                    {new Date(
                                                        related.created_at
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <h4 className="text-xl font-semibold">
                                                {related.title}
                                            </h4>
                                            <p className="text-white/80 text-sm line-clamp-2 mt-1">
                                                {related.description}
                                            </p>

                                            <Link
                                                href={`/blog/${related.slug}`}
                                                className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg text-gray-900 text-xs font-semibold mt-4 hover:bg-gray-200"
                                            >
                                                Read More
                                                <MdArrowOutward />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

              
                </div>
            </div>
        </div>
    )
}
