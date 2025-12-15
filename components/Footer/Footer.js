import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiMail, FiPhoneCall, FiMapPin, FiChevronRight } from "react-icons/fi";

export default function Footer() {
  return (
<footer
  className="relative pt-12 pb-6 overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/Home/hero.jpg')" }}
>
  {/* White Overlay */}
  <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]"></div>

      <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-200/25 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-200/30 blur-[130px] rounded-full"></div>

      <div className="relative max-w-8xl mx-auto px-6">

        {/* Floating Glass Card */}
        <div className="backdrop-blur-xl bg-white/60 border border-white/80 shadow-[0_8px_28px_rgba(0,0,0,0.05)] rounded-3xl py-8 px-6 md:px-12 ">
          
          <div className="grid md:grid-cols-4 gap-14">

            {/* Logo + Description */}
            <div>
              <div className="mb-3">
                  <Link
              href="/"
              className="text-2xl font-bold "
            >
              <Image src={"/fastpaysave.png"} alt="fastpaysave" width={100} height={100} className="" />
            </Link>

              </div>

              <p className="text-gray-600 text-[15.5px] leading-relaxed">
                Your trusted platform for FASTag recharge & e-challan payments.  
                Secure • Fast • Seamless service across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[18px] font-semibold text-gray-900 mb-4">
                Quick Links
              </h4>
              <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-6"></div>

              <ul className="space-y-3 text-gray-600 text-[15px]">
                {[
                  { label: "Home", href: "/" },
                  { label: "FASTag", href: "/fastag" },
                  { label: "E-Challan", href: "/echallan" },
                   { label: "Blog", href: "/blog" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 group hover:text-gray-900 transition-all"
                    >
                      <FiChevronRight className="text-blue-500 group-hover:translate-x-1 transition duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[18px] font-semibold text-gray-900 mb-4">
                Services
              </h4>
              <div className="h-0.5 w-12 bg-linear-to-r from-blue-500 to-teal-400 rounded-full mb-6"></div>

              <ul className="space-y-3 text-gray-600 text-[15px]">
                {[
                  // { label: "Login", href: "/login" },
                  { label: "contact us", href: "/contact" },
                  { label: "Privacy Policy", href: "/praivacy-policy" },
                  { label: "Terms & Conditions", href: "/terms-and-conditions" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 group hover:text-gray-900 transition-all"
                    >
                      <FiChevronRight className="text-blue-500 group-hover:translate-x-1 transition duration-200" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[18px] font-semibold text-gray-900 mb-4">
                Contact
              </h4>
              <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mb-6"></div>

              <div className="space-y-4 text-gray-600 text-[15px]">

                <p className="flex items-start gap-3 hover:text-gray-900 transition">
                  <FiMail className="text-blue-500 text-xl mt-1" />
                  support@7unique.in
                </p>

                <p className="flex items-start gap-3 hover:text-gray-900 transition">
                  <FiPhoneCall className="text-blue-500 text-xl mt-1" />
                  0141-4511098
                </p>

                <p className="flex items-start gap-3 leading-relaxed">
                  <FiMapPin className="text-blue-500 text-xl mt-1" />
                  Plot No 97, Dakshinpuri - I, Shrikishan,  
                  Sanganer, Jagatpura, Jaipur, Rajasthan 302017, India
                </p>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-6 text-center">
          <p className="text-sm ">
            © 2025 Finunique Small Private Limited. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
