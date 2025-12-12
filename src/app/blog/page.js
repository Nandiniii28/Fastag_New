// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import BlogsSection from "../../../components/BlogSection";

// export default function page() {
//   return (
//     <>
//     <section className="w-full bg-white py-12 md:py-15 md:px-10 overflow-hidden shadow-xl">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-0 gap-10">

//         {/* LEFT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="md:w-1/2 space-y-5"
//         >
//           <p className="text-gray-500 font-medium">
//             Everything You Need to Know About FASTag & E-Challan Services
//           </p>

//           <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
//             Latest <span className="text-[#fa9404] swing">FASTag</span> Updates <br />
//             & <span className="text-[#fa9404] backInLeft">Vehicle Toll</span> Solutions
//           </h1>

//           <p className="text-gray-500 text-base md:text-lg leading-relaxed">
//             Stay informed with the newest FASTag rules, recharge guides, challan updates, 
//             vehicle service tips, and expert insights to help you manage tolls smarter.
//           </p>

        
//         </motion.div>

//         {/* RIGHT IMAGE */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="md:w-1/2 relative"
//         >
//           <div className="relative w-[500px] h-[190px] rounded-2xl overflow-hidden group">
//             <span className="absolute inset-0 rounded-2xl border-4 border-transparent bg-[conic-gradient(from_0deg,#fa9404_0%,transparent_100%)] animate-spin-slow group-hover:animate-spin-fast"></span>

//             <div className="absolute inset-1 rounded-2xl overflow-hidden">
//               <Image
//                 src="/image/blog-banner.jpg"
//                 alt="FASTag Blog"
//                 fill
//                 className="object-contain transition-transform duration-700 group-hover:scale-105"
//               />
//             </div>
//           </div>

           
//         </motion.div>

//       </div>

//       <Link href="/contact">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-[#00186b] hover:bg-[#fa9404] font-bold text-white px-6 my-6 py-2 rounded-full shadow-md transition-all duration-300"
//             >
//               Get in touch
//             </motion.button>
//           </Link>
//     </section>
//     <BlogsSection />
//     </>
//   );
// }




"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogsSection from "../../../components/BlogSection";
import { useEffect, useState } from "react";
import axiosInstance from "../../../components/axiosInstance"; // Adjust path as needed

export default function BlogPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // You can add any page-specific data fetching here if needed
  }, []);

  return (
    <>
      <section className="w-full bg-white py-12 md:py-15 md:px-10 overflow-hidden shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-0 gap-10">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-5"
          >
            <p className="text-gray-500 font-medium">
              Everything You Need to Know About FASTag & E-Challan Services
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Latest <span className="text-[#fa9404] swing">FASTag</span> Updates <br />
              & <span className="text-[#fa9404] backInLeft">Vehicle Toll</span> Solutions
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Stay informed with the newest FASTag rules, recharge guides, challan updates, 
              vehicle service tips, and expert insights to help you manage tolls smarter.
            </p>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative"
          >
            <div className="relative w-[500px] h-[190px] rounded-2xl overflow-hidden group">
              <span className="absolute inset-0 rounded-2xl border-4 border-transparent bg-[conic-gradient(from_0deg,#fa9404_0%,transparent_100%)] animate-spin-slow group-hover:animate-spin-fast"></span>

              <div className="absolute inset-1 rounded-2xl overflow-hidden">
                <Image
                  src="/image/blog-banner.jpg"
                  alt="FASTag Blog"
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

        </div>

        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#00186b] hover:bg-[#fa9404] font-bold text-white px-6 my-6 py-2 rounded-full shadow-md transition-all duration-300"
          > 
            Get in touch
          </motion.button>
        </Link>
      </section>
      
      <BlogsSection />
    </>
  );
}