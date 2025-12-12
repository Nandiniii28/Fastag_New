"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FaCreditCard, FaRupeeSign, FaBolt } from "react-icons/fa";
import { MdDirectionsCar, MdSearch } from "react-icons/md";
import FastagForm from "./FastagForm";

const slides = [
    {
        image: "/Home/hero.jpg",
        title: (
            <>
                Drive smart, skip the queue <span className="text-[#ff6f00]">FASTag & e‑Challan</span> in one click.{" "}
            </>
        ),
        subtitle: "Automate salaries, compliance, and payouts in one secure platform designed for growing businesses.",
    },
    {
        image: "/Home/HomeBanner.jpg",
        title: (
            <>
                Enter your vehicle number <span className="text-[#ff6f00]">pay tolls and challans</span>  the smart way.
            </>
        ),
        subtitle: "Cut down manual work and ensure every payout is on time.",
    },
    {
        image: "/Home/HomeBanner2.webp",
        title: (
            <>
                Tap, check, pay <span className="text-[#ff6f00]">FASTag balance and e‑Challan</span> in seconds.
            </>
        ),
        subtitle: "Keep up with regulations without extra effort.",
    },
];

export default function Homepage() {
    const [index, setIndex] = useState(0);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [activeTab, setActiveTab] = useState('echallan');
    const [fastagNumber, setFastagNumber] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setIsSearching(true);
    //     // Simulate API call
    //     setTimeout(() => {
    //         setIsSearching(false);
    //         onSubmit({ type: activeTab, [activeTab === 'echallan' ? 'vehicleNumber' : 'fastagNumber']: activeTab === 'echallan' ? vehicleNumber : fastagNumber });
    //     }, 2000);
    // };

    useEffect(() => {
        const id = setInterval(
            () => setIndex((prev) => (prev + 1) % slides.length),
            5000
        );
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative h-screen md:h-auto w-full overflow-hidden bg-slate-800 text-white">
            {/* background slides */}
            <div className="absolute inset-0">
                {slides.map((slide, i) => (
                    <div
                        key={slide.image}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                        style={{ backgroundImage: `url(${ slide.image })` }}
                    />
                ))}
                <div className="absolute inset-0 bg-black/30 sm:bg-black/20" />
            </div>

            {/* content */}
            <div className="relative z-10 flex h-full flex-col lg:flex-row items-center px-4 sm:px-6 md:px-10 lg:px-16 pt-16 md:pt-20 lg:gap-12 xl:gap-20">
                {/* Left content - stacks on mobile */}
                <div className="w-full lg:w-[60%] lg:max-w-xl xl:max-w-2xl order-2 lg:order-1 mb-2 md:mb-5">
                    <div key={index} className="animate-slideUpFade">
                        <p className="mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-widest text-white/90">
                            Your Fastag, our precision
                        </p>

                        {/* Responsive Heading */}
                        <h1 className="mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-3xl lg:text-[42px] xl:text-[40px] leading-tight md:leading-[1.2] font-bold">
                            {slides[index].title}
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-8 sm:mb-10 text-sm sm:text-base md:text-lg text-slate-100 max-w-lg leading-relaxed">
                            Fast, secure, and reliable services
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link
                                href="/contact"
                                className="rounded-xl sm:rounded-md border w-full sm:w-fit border-slate-200/80 px-6 py-3 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 hover:border-[#ff6f00] hover:text-[#ff6f00] hover:bg-white/10 text-center backdrop-blur-sm"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right form card - full width on mobile */}
                <div className="w-full max-w-full order-1 lg:order-2 mb-6">
                    <div className="">
                        <div className="md:px-0">
                            {/* Tabs */}
                            <div className="flex bg-gradient-to-r from-gray-100/70 to-gray-200/70 rounded-2xl p-1 mb-6 shadow-lg">
                                <button
                                    onClick={() => setActiveTab('echallan')}
                                    className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'echallan'
                                        ? 'bg-gradient-to-r from-[#0060c9] to-[#1a73e8] text-white shadow-xl shadow-blue-500/25 scale-[1.02]'
                                        : 'text-gray-600 hover:text-[#0060c9] hover:bg-blue-50/50 hover:scale-[1.01]'
                                        }`}
                                >
                                    <MdDirectionsCar className="w-4 h-4 sm:w-5 sm:h-5" />
                                    e-Challan
                                </button>
                                <button
                                    onClick={() => setActiveTab('fastag')}
                                    className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'fastag'
                                        ? 'bg-gradient-to-r from-[#ff6f00] to-[#d15805] text-white shadow-xl shadow-orange-500/25 scale-[1.02]'
                                        : 'text-gray-600 hover:text-[#ff6f00] hover:bg-orange-50/50 hover:scale-[1.01]'
                                        }`}
                                >
                                    <FaCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                                    FASTag
                                </button>
                            </div>

                            <div className="space-y-5 sm:space-y-6">
                                {/* e-Challan Form */}
                                {activeTab === 'echallan' && (
                                    <div>
                                        {/* <label htmlFor="vehicleNo" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 uppercase tracking-widest">
                                            Vehicle Registration Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                                                <MdDirectionsCar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                                            </div>
                                            <input
                                                id="vehicleNo"
                                                type="text"
                                                placeholder="MH01AB1234"
                                                value={vehicleNumber}
                                                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                                                minLength="8"
                                                required
                                                className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 border-2 text-black border-gray-200 rounded-2xl text-base sm:text-lg uppercase font-mono tracking-widest bg-gradient-to-r from-slate-50 to-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                            Real-time data from traffic authorities
                                        </p> */}
                                        <FastagForm categoryKey={"C31"} />
                                    </div>
                                )}

                                {/* FASTag Form */}
                                {activeTab === 'fastag' && (
                                    <div>
                                        {/* <label htmlFor="fastagNo" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 uppercase tracking-widest">
                                            FASTag ID / Wallet Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                                                <FaBolt className="w-3 h-3" />
                                            </div>
                                            <input
                                                id="fastagNo"
                                                type="text"
                                                placeholder="FASTAG1234567890"
                                                value={fastagNumber}
                                                onChange={(e) => setFastagNumber(e.target.value.replace(/[^A-Z0-9]/g, '').toUpperCase())}
                                                minLength="10"
                                                required
                                                className="w-full pl-10 sm:pl-12 pr-4 py-3.5 sm:py-4 border-2 text-black border-gray-200 rounded-2xl text-base sm:text-lg uppercase font-mono tracking-widest bg-gradient-to-r from-orange-50/50 to-white focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <FaRupeeSign className="w-3 h-3 text-orange-500" />
                                                <span>Min ₹100 recharge</span>
                                            </div>
                                            <div className="flex items-center gap-1 justify-end">
                                                <FaBolt className="w-3 h-3 text-green-500" />
                                                <span>Instant activation</span>
                                            </div>
                                        </div> */}
                                        <FastagForm categoryKey={"C10"} />
                                    </div>
                                )}

                                {/* Submit Button */}
                                {/* <button
                                    type="submit"
                                    disabled={isSearching}
                                    className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 data-[tab=fastag]:from-orange-500 data-[tab=fastag]:to-orange-600 hover:from-blue-700 hover:to-blue-800 data-[tab=fastag]:hover:from-orange-600 data-[tab=fastag]:hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/30 data-[tab=fastag]:focus:ring-orange-500/30"
                                    data-tab={activeTab}
                                >
                                    <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                                        {isSearching ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                <span className="font-medium">Processing...</span>
                                            </>
                                        ) : activeTab === 'echallan' ? (
                                            <>
                                                <MdSearch className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                                Check Challan Status
                                            </>
                                        ) : (
                                            <>
                                                <FaBolt className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                                                Recharge FASTag
                                            </>
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </button> */}

                                {/* <p className="text-xs text-center text-gray-500 pt-3 sm:pt-4 opacity-75">
                                    🔒 Secure • Powered by Finunique Small Private Limited
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicators - responsive positioning */}
            <div className="absolute right-4 bottom-8 sm:right-6 sm:bottom-10 md:top-1/2 md:-translate-y-1/2 flex flex-col items-center gap-2 sm:gap-3 z-20">
                {slides.map((_, i) => {
                    const active = i === index;
                    return (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={
                                active
                                    ? "flex h-8 w-8 sm:h-10 sm:w-10 md:h-10 md:w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-slate-800/95 text-white text-xs sm:text-sm font-mono shadow-lg backdrop-blur-sm border border-white/30"
                                    : "flex h-6 w-6 sm:h-8 sm:w-8 md:h-8 md:w-8 items-center justify-center text-white/70 hover:text-white text-xs font-mono transition-colors"
                            }
                        >
                            {String(i + 1).padStart(2, "0")}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}