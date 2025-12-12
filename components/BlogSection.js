// "use client";
// import { FaArrowRight } from "react-icons/fa6";
// import Image from "next/image";

// // 1) BLOGS DATA ARRAY
// const blogsData = [
//   {
//     id: 1,
//     image: "/image/blog1.jpg",
//     alt: "FASTag Recharge and Toll Automation",
//     title: "How FASTag is Revolutionizing Toll Payments Across Highways",
//   },
//   {
//     id: 2,
//     image: "/image/blog2.jpg",
//     alt: "FASTag App Recharge Guide",
//     title: "A Complete Guide to FASTag Recharge, Balance Check & Transaction Alerts",
//   },
//   {
//     id: 3,
//     image: "/user/car2.jpg",
//     alt: "FASTag for Commercial Fleets",
//     title: "Why FASTag is Essential for Fleet Owners: Savings, Tracking & Automation",
//   },
// ];


// export default function BlogsSection() {
//   return (
//     <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      
//       {/* Title */}
//       <div className="mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#00186b] leading-snug">
//           Check out our impressive and <br />
//           <span className="text-[#fa9404]">Latest Blogs</span>
//         </h2>
//       </div>

//       {/* Blogs Grid */}
//       <div className="grid md:grid-cols-3 gap-10">
//         {blogsData.map((blog) => (
//           <div
//             key={blog.id}
//             className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
//           >
//             <div className="overflow-hidden">
//               <Image
//                 src={blog.image}
//                 alt={blog.alt}
//                 width={600}
//                 height={400}
//                 className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//             <div className="p-5">
//               <h3 className="text-xl font-semibold text-[#00186b] group-hover:text-[#fa9404] transition">
//                 {blog.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
// {/* <Link href="/blog" className="my-3 md:my-5 float-end ">
//    <span> <FaArrowRight className="bg-[#00186b] rounded-full text-white w-10 h-10  p-2" /></span>
// </Link> */}
//     </section>
//   );
// }




"use client";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";

export default function BlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get("/blogs/all");
      
      if (response.data.success) {
        setBlogs(response.data.data || []);
      } else {
        throw new Error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.response?.data?.message || "Failed to load blogs. Please try again later.");
      setBlogs([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/image/blog1.jpg"; // Fallback image
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path starting with /uploads, construct full URL
    if (imagePath.startsWith('/uploads')) {
      return `http://localhost:5000${imagePath}`;
    }
    
    // For other relative paths
    return imagePath;
  };

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14">
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00186b] leading-snug">
          Check out our impressive and <br />
          <span className="text-[#fa9404]">Latest Blogs</span>
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00186b]"></div>
          <p className="mt-2 text-gray-600">Loading blogs...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-10">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchBlogs}
            className="bg-[#00186b] text-white px-4 py-2 rounded-md hover:bg-[#fa9404] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && blogs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No blogs available at the moment.</p>
        </div>
      )}

      {/* Blogs Grid */}
      {!loading && !error && blogs.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-10">
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="overflow-hidden relative h-56">
                    <Image
                      src={getImageUrl(blog.thumbnail || blog.thumbnailUrl)}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#00186b] group-hover:text-[#fa9404] transition line-clamp-2">
                      {blog.title}
                    </h3>
                    {blog.shortDescription && (
                      <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                        {truncateText(blog.shortDescription, 100)}
                      </p>
                    )}
                    <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <span className="mr-1">By:</span>
                        <span className="font-medium">{blog.author || "Admin"}</span>
                      </span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* View All Blogs Link - Only show if there are more than 3 blogs */}
          {blogs.length > 3 && (
            <div className="mt-10 text-center">
              <Link 
                href="/blog/all" 
                className="inline-flex items-center gap-2 bg-[#00186b] text-white px-6 py-3 rounded-full hover:bg-[#fa9404] transition-colors duration-300"
              >
                View All Blogs
                <FaArrowRight />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}