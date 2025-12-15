"use client";

import { motion } from "framer-motion";
import { FaHandshake, FaStar } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import Image from 'next/image'
import Link from 'next/link'
import WalletKeyFeatures from "../../../components/keyfeature";
import CTASectionCombined from "../../../components/about/cta";
import FAQSection from "../../../components/FAQSection";
import FastagForm from "../../../components/FastagForm";
import { useRef } from "react";


const echallanFaqs = [
    {
        question: "What is an e‑Challan?",
        answer:
            "An e‑Challan is a digitally generated traffic challan issued by the traffic department when a rule is violated, such as overspeeding, signal jumping, or not wearing a seat belt. It is recorded in the system and can be viewed and paid online.",
    },
    {
        question: "How can I check if my vehicle has any pending e‑Challans?",
        answer:
            "Go to the e‑Challan section, enter your vehicle registration number and, if required, your driving licence or chassis number. The system will show all pending challans with date, location, and violation details.",
    },
    {
        question: "Can I pay my e‑Challan online through this website?",
        answer:
            "Yes. After you fetch your e‑Challan details, you can select one or multiple challans and pay them instantly using UPI, debit or credit cards, net banking, or your wallet balance on our platform.",
    },
    {
        question: "How long does it take for the paid e‑Challan status to update?",
        answer:
            "In most cases, the status is updated immediately or within a few minutes after successful payment. Sometimes it may take a few hours for the traffic department’s system to reflect the updated status.",
    },
    {
        question: "What happens if I do not pay my e‑Challan on time?",
        answer:
            "If an e‑Challan remains unpaid beyond the due date, penalties may increase and the case can be forwarded to the traffic court. Continued non‑payment can also lead to issues during vehicle fitness, insurance renewal, or RC/DL related services.",
    },
    //   {
    //     question: "I think the e‑Challan issued to my vehicle is wrong. What should I do?",
    //     answer:
    //       "If you find incorrect vehicle details, violation type, or evidence, use the dispute or grievance option linked with the challan or contact the respective state traffic department. Share clear proof such as timestamps, location details, or vehicle documents when raising your complaint.",
    //   },
    //   {
    //     question: "Can I pay e‑Challans for multiple vehicles from one account?",
    //     answer:
    //       "Yes. You can add and manage multiple vehicles from a single account. The dashboard lets you switch between vehicles, view their pending e‑Challans, and clear all dues digitally.",
    //   },
    //   {
    //     question: "Is it safe to pay e‑Challans online on this platform?",
    //     answer:
    //       "Payments are processed through secure, encrypted gateways. Your card, UPI, or banking details are handled by the payment provider and are not stored on our servers, ensuring a safe payment experience.",
    //   },
    //   {
    //     question: "Will I receive a receipt after paying my e‑Challan?",
    //     answer:
    //       "Yes. Once the payment is successful, a digital receipt is generated with the transaction ID and challan reference. You can download it immediately and later access it anytime from the Transactions or History section.",
    //   },
    //   {
    //     question: "Will I get alerts for new e‑Challans raised on my vehicle?",
    //     answer:
    //       "If you enable notifications, you will receive SMS, email, or in‑app alerts whenever a new e‑Challan is issued against your registered vehicle number, helping you clear dues on time.",
    //   },
];

export default function page() {

    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <>
            <section className="w-full bg-white py-12 md:py-16 overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-0 gap-10">
                    {/* Left Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 space-y-5"
                    >
                        <p className="text-gray-500 font-medium">
                            India’s most trusted e‑Challan & FASTag management platform
                        </p>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                            Instant <span className="text-[#fa9404] swing">e‑Challan</span> <br />
                            & <span className="text-[#fa9404] backInLeft">FASTag</span> Services
                        </h1>

                        <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                            Check pending e‑Challans by vehicle number, pay fines securely, and
                            keep your FASTag wallet active – all from one simple dashboard.
                        </p>

                        <motion.button
                            onClick={scrollToForm}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#00186b] hover:bg-[#fa9404] font-bold text-white px-6 py-2 rounded-full shadow-md transition-all duration-300"
                        >
                            Check e‑Challan Now
                        </motion.button>

                        {/* Ratings Section */}
                        <div className="flex items-center gap-3 pt-4">
                            <span className="text-gray-700 font-medium">User Rating</span>
                            <FaStar className="text-yellow-400 fill-yellow-400 w-5 h-5" />
                            <span className="text-lg font-semibold text-gray-800">4.9</span>

                            <div className="flex -space-x-2 ml-2">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <Image
                                        key={i}
                                        src="/user/user.jpg"
                                        alt="User"
                                        width={32}
                                        height={40}
                                        className="rounded-full w-10 h-10 border-2 border-white shadow-sm"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 relative"
                    >
                        <div className="relative w-[400px] h-[400px] rounded-2xl overflow-hidden group">
                            <span className="absolute inset-0 rounded-2xl border-4 border-transparent bg-[conic-gradient(from_0deg,#fa9404_0%,transparent_100%)] animate-spin-slow group-hover:animate-spin-fast"></span>

                            <div className="absolute inset-1 rounded-2xl overflow-hidden">
                                <Image
                                    src="/image/challan-min.jpg"
                                    alt="e‑Challan and FASTag services"
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div ref={formRef} className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 ">
                    <div className="">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight pb">
                            Get your <br />
                            <span className="text-[#00186b] ">echallan Bill </span>
                        </h2>
                        <Image
                            className=""
                            src="/user/bill.jpg"
                            width={500}
                            height={600}
                            alt="FASTag bill payment"
                        />
                    </div>
                    <div>
                        <FastagForm categoryKey={"C31"} />
                    </div>
                </div>
            </div>

            <section className="max-w-7xl mx-auto my-20 px-4 sm:px-6 md:px-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    About <span className="text-[#fa9404]">e‑Challan</span> & FASTag
                </h2>

                <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                    {/* Left Card */}
                    <div className="relative rounded-lg overflow-hidden flex-1 w-full h-64 sm:h-80 md:h-80 max-w-full md:max-w-[600px]">
                        <Image
                            src="/Home/toll.jpg"
                            alt="Driver using a digital dashboard to manage FASTag and e‑Challan payments"
                            className="w-full h-full object-cover"
                            width={600}
                            height={320}
                        />
                        <div className="absolute inset-0 bg-black/55 p-4 sm:p-6 md:p-6 flex flex-col justify-end rounded-lg">
                            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-2">
                                Our Promise
                            </h3>
                            <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed mb-4 max-w-[90%]">
                                One platform to check e‑Challans, recharge FASTag, and track every
                                trip in real time with secure digital payments.
                            </p>
                            <Link
                                href="/fastag"
                                className="bg-[#ff6f00] text-white font-semibold text-xs sm:text-sm rounded px-4 sm:px-5 py-2 w-max hover:bg-[#d15805] transition"
                            >
                                Explore FASTag Services
                            </Link>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex-1 w-full bg-orange-100 rounded-lg p-5 sm:p-6 md:p-8 text-white max-w-full md:max-w-[600px]">
                        <h3 className="font-bold text-base text-gray-900 sm:text-lg md:text-xl mb-3 leading-snug">
                            Seamless FASTag and e‑Challan in one place
                        </h3>
                        <p className="text-xs sm:text-sm md:text-[14px] leading-relaxed text-gray-800">
                            Fastpaysave connects FASTag wallets and state traffic systems to give
                            vehicle owners a single, unified experience. Check pending e‑Challans
                            by vehicle number, recharge FASTag with UPI or cards, and view toll
                            deductions and penalties on a clean dashboard. Real‑time status,
                            instant confirmations, and secure payments ensure you stay compliant on
                            the road without visiting banks or offices. Whether you manage one car
                            or an entire fleet, our integration keeps your journeys smooth and
                            hassle‑free.
                        </p>
                    </div>
                </div>
            </section>

            <WalletKeyFeatures />
            <section className="max-w-6xl mx-auto my-10">
                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    <span className="text-[#09343D]">Our</span>{" "}
                    <span className="text-[#ff6f00]">Services</span>
                </h2>
                <p className="text-gray-600 text-sm md:text-base max-w-2xl mb-4">
                    Explore our secure and seamless wallet, UPI, payment gateway, and
                    API integration services.
                </p>
                <div className=" rounded-lg p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x">
                    {[
                        {
                            icon: "/Home/fastag-recharge.png",
                            title: "FASTag Recharge",
                            description:
                                "Top up your FASTag instantly using UPI, cards, or net‑banking with real‑time balance updates.",
                        },
                        {
                            icon: "/Home/echallan-check.png",
                            title: "e‑Challan Check & Pay",
                            description:
                                "Search challans by vehicle number, view offence details, and clear dues in a few clicks.",
                        },
                        {
                            icon: "/Home/wallet.png",
                            title: "Smart Payment",
                            description:
                                "Maintain a Smart Payment for tolls and challans, with detailed transaction history.",
                        },
                        {
                            icon: "/Home/trip-analytics.png",
                            title: "Trips & Analytics",
                            description:
                                "Track toll spends, challan payments, and vehicle‑wise usage to keep your costs under control.",
                        },
                    ].map((service, idx) => (
                        <div key={idx} className="flex flex-col items-center px-6 py-6">
                            <div className="flex border p-3 shadow-[0px_1px_9.4px_3px_#0000001A] justify-center mb-4 rounded-md">
                                <Image
                                    src={service.icon}
                                    alt={service.title}
                                    width={60}
                                    height={60}
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-[#09343D] mb-2 text-center">
                                {service.title}
                            </h3>

                            <p className="text-sm text-gray-600 text-center">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <FAQSection
                title="e‑Challan"
                subtitle="Frequently Asked Questions"
                imageSrc="/user/faq.png"
                faqs={echallanFaqs}
            />
            <CTASectionCombined />
        </>
    )
}
