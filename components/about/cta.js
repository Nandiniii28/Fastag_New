"use client";
import Image from "next/image";
import Link from "next/link";

export default function CTASectionCombined() {
  return (
    <section className="relative flex items-center justify-center text-white mt-4">
      <Image
        src="/user/car4.jpg"
        alt="Background"
        fill
        className="object-cover object-bottom"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full px-6 text-right">
        <div className="flex flex-col items-end py-5">
          <span className="text-[#fa9404] uppercase tracking-widest font-medium mb-2">
            ● FASTag & E-Challan Services
          </span>

          <h3 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Manage FASTag & E-Challan <br /> Easily in One Place
          </h3>

          <p className="max-w-xl text-gray-200 mb-6">
            Apply for a <span className="text-[#fa9404] font-semibold">new FASTag</span>, recharge your existing one,  
            or instantly <span className="text-[#fa9404] font-semibold">check and pay your E-Challan</span>.  
            Fast, secure, and hassle-free service—everything you need for smooth travel.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <Link
              href="/fastag"
              className="bg-[#fa9404] hover:bg-[#fa9404]/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Apply FASTag
            </Link>
            <Link
              href="/echallan"
              className="bg-white hover:bg-gray-100 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              Check E-Challan
            </Link>
          </div>
        </div>

        {/* Background Text */}
        {/* <h3 className="hidden md:block absolute bottom-6 left-0 md:text-[120px] font-extrabold text-white/20 leading-none select-none">
          FASTag & <br /> E-Challan
        </h3> */}
      </div>
    </section>
  );
}
