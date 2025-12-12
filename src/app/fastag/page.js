"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHandshake, FaStar } from "react-icons/fa";
import { LuBuilding2 } from "react-icons/lu";
import { BiUser } from "react-icons/bi";
import { FiMessageCircle } from "react-icons/fi";
import { FaCar, FaMoneyCheckAlt, FaRoad } from "react-icons/fa";
import FastagProcess from "../../../components/FastagProcess";
import FAQSection from "../../../components/FAQSection";
import FastagSafetyTips from "../../../components/FastagSafetyTips";
import CTASectionCombined from "../../../components/about/cta";
import FastagForm from "../../../components/FastagForm";


function page() {
  const faqs = [
    {
      question: "What is FASTag and how does it work?",
      answer:
        "FASTag is an RFID tag linked to your vehicle and wallet. When you pass a FASTag-enabled toll plaza, the tag is scanned and the toll amount is auto-debited from your linked balance without stopping.",
    },
    {
      question: "How do I check if my vehicle has any pending e‑Challans?",
      answer:
        "Enter your vehicle registration number on the e‑Challan page of our website. The system will fetch and display all pending challans along with date, location, and violation details.",
    },
    {
      question: "Can I pay my e‑Challan directly from this website?",
      answer:
        "Yes. After you search your vehicle, you can select one or multiple pending e‑Challans and pay them online using UPI, debit or credit cards, net banking, or your wallet balance.",
    },
    {
      question: "How can I recharge my FASTag using your platform?",
      answer:
        "Go to the FASTag Recharge section, enter your vehicle or tag ID, choose a recharge amount, and complete the payment using UPI, cards, net banking, or wallet. The recharge is usually reflected within a few seconds.",
    },
    {
      question: "Why is my FASTag showing as blacklisted?",
      answer:
        "FASTag is marked blacklisted when the balance falls below the minimum threshold or when there is an issue with your tag or KYC. Recharging the tag or updating pending KYC details normally removes the blacklist status automatically.",
    },
    //   {
    //     question: "How do I check my FASTag balance?",
    //     answer:
    //       "You can check balance by entering your vehicle number or registered mobile number in the FASTag Balance section. The current available balance and recent deductions will be shown on the screen.",
    //   },
    //   {
    //     question: "Is FASTag mandatory for all vehicles?",
    //     answer:
    //       "FASTag is mandatory for most four‑wheeler vehicles at national highway toll plazas. Vehicles without FASTag usually have to pay double toll or use separate cash lanes where available.",
    //   },
    //   {
    //     question: "What happens if there is no balance in my FASTag while crossing a toll?",
    //     answer:
    //       "If your FASTag does not have sufficient balance, the transaction may be declined and the tag can get blacklisted. In such cases, the toll plaza may charge you cash or a penalty. Keeping your tag balance topped up avoids such issues.",
    //   },
    //   {
    //     question: "How secure are online payments made on this website?",
    //     answer:
    //       "All payments are processed through PCI‑DSS compliant payment gateways with encrypted connections. Card, UPI, and banking details are handled by the payment provider and are not stored on our servers.",
    //   },
    //   {
    //     question: "Can I download receipts for my e‑Challan and FASTag payments?",
    //     answer:
    //       "Yes. After every successful payment, a digital receipt is generated. You can view and download past receipts anytime from the Transactions or History section in your profile.",
    //   },
    //   {
    //     question: "Can I manage multiple vehicles from a single account?",
    //     answer:
    //       "You can link multiple vehicles and their tags to one account. The dashboard lets you switch between vehicles, view individual challans, and monitor toll expenses for each vehicle separately.",
    //   },
    //   {
    //     question: "What should I do if challan details shown are incorrect?",
    //     answer:
    //       "If you notice a wrong vehicle, amount, or violation, do not pay immediately. Use the dispute or raise‑query option provided with the challan details, or contact the respective state traffic department with proof for correction.",
    //   },
    //   {
    //     question: "Will I get notifications for new e‑Challans or low FASTag balance?",
    //     answer:
    //       "If you enable alerts, you will receive SMS, email, or in‑app notifications whenever a new e‑Challan is raised against your vehicle or when your FASTag balance falls below a set threshold.",
    //   },
    //   {
    //     question: "Can I transfer my FASTag to a new vehicle?",
    //     answer:
    //       "FASTag is generally issued for a specific vehicle and registration number, so it cannot be directly transferred. For a new vehicle, you usually need to close the old tag and apply for a new one, then link it again in your account.",
    //   },
    //   {
    //     question: "How do I contact support if my payment is successful but the challan still shows unpaid?",
    //     answer:
    //       "Go to the Help or Support section, submit a ticket with your transaction ID, payment time, and vehicle number, or use live chat/helpline if available. The support team will verify the payment with the gateway and update the status.",
    //   },
  ];

  const features = [
    {
      icon: <FaMoneyCheckAlt className="w-8 h-8 text-[#ff6f00]" />,
      title: "SEAMLESS FASTAG RECHARGE",
      description:
        "Top up your FASTag instantly using multiple payment methods and never worry about toll delays again.",
    },
    {
      icon: <FaCar className="w-8 h-8 text-[#0060c9]" />,
      title: "EASY VEHICLE MANAGEMENT",
      description:
        "Add, manage, and switch multiple vehicles with ease, keeping track of toll payments and FASTag balance in one place.",
    },
    {
      icon: <FaRoad className="w-8 h-8 text-[#ff6f00]" />,
      title: "SMART E-CHALLAN PAYMENTS",
      description:
        "Pay your eChallans securely and quickly, view history, and get notified for pending fines to stay compliant.",
    },
  ];

  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <section className="w-full bg-white py-12 md:py-15 md:px-10 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 md:px-0 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-1/2 space-y-5"
          >
            <p className="text-gray-500 font-medium">
              India’s Most Trusted FASTag Recharge & Toll Management Service
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Instant <span className="text-[#fa9404] swing">FASTag Recharge</span> <br />
              & <span className="text-[#fa9404] backInLeft">Hassle-Free</span> E-Challan Services
            </h1>

            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Recharge any FASTag, check toll balance, track deductions, pay challans,
              and manage all your vehicle toll services from one simple platform.
            </p>

            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#00186b] hover:bg-[#fa9404] font-bold text-white px-6 py-2 rounded-full shadow-md transition-all duration-300"
              >
                Explore Services
              </motion.button>
            </Link>

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
            <div className="relative w-[540px] h-[400px] rounded-2xl mx-auto overflow-hidden group">

              <span className="absolute inset-0 rounded-2xl border-4 border-transparent bg-[conic-gradient(from_0deg,#fa9404_0%,transparent_100%)] animate-spin-slow group-hover:animate-spin-fast"></span>

              <div className="absolute inset-1 rounded-2xl overflow-hidden">
                <Image
                  src="/user/car1.jpg"
                  alt="FASTag Services"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl shadow-lg p-6 rounded-xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center mt-18 md:mt-16 gap-8"
        >
          {[
            { number: "5L+", label: "FASTag Recharges", icon: LuBuilding2 },
            { number: "2L+", label: "Challan Payments", icon: BiUser },
            { number: "500+", label: "Verified Partners", icon: FaHandshake },
            { number: "25K+", label: "Customer Reviews", icon: FiMessageCircle },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-bold text-black">{stat.number}</h3>
              <p className="text-black text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <div ref={formRef} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 ">
          <div className="">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight pb">
              Get your <br />
              <span className="text-[#00186b] ">FASTag Bill </span>
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
            <FastagForm categoryKey={"C10"} />
          </div>
        </div>
      </div>
      <section className="py-10 px-4 md:px-0 max-w-6xl mx-auto">


        <div className="mt-5 grid grid-cols-1 md:grid-cols-2  items-center">


          {/* Right Features */}
          <div className="space-y-5">

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight pb">
              About <br />
              <span className="text-[#00186b] ">us </span>
            </h2>


            <p className="mt-2 text-gray-600 max-w-2xl">
              We provide professional FASTag recharge and eChallan management services with a
              focus on convenience, security, and customer satisfaction. Our platform is trusted
              by thousands of users across India.
            </p>

            {features.map((feature) => (
              <div key={feature.title} className="flex items-start">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full border-2 border-[#fa9404]">
                    {feature.icon}
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2  text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <Image
              className="w-full max-w-md ms-auto rounded-full border-l-8 border-t-8 border-[#fa9404] aspect-square  shadow-lg"
              src="/image/building.jpg"
              width={300}
              height={300}
              alt="Construction team"
            />
            <div className="hidden md:block absolute left-1/4 -bottom-5 w-48">
              <Image
                className=" w-full max-w-lg mx-auto rounded-full aspect-square  border-r-8 border-b-8 border-[#fa9404] shadow-lg"
                src="/user/c4.jpg"
                width={500}
                height={500}
                alt="Construction team"
              />
            </div>
          </div>
        </div>
      </section>

      <FastagProcess />
      <FastagSafetyTips />
      <FAQSection faqs={faqs} />
      <CTASectionCombined />

    </>
  )
}

export default page
