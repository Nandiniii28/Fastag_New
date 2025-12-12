"use client";

import { motion } from "framer-motion";
import {
  IoCarSportOutline,
  IoDocumentTextOutline,
  IoWalletOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

export default function FastagTimeline() {
  const steps = [
    {
      icon: <IoCarSportOutline className="w-8 h-8 text-[#0060c9]" />,
      title: "Enter Vehicle Details",
      desc: "Start by entering your vehicle number to fetch your FASTag information instantly.",
    },
    {
      icon: <IoDocumentTextOutline className="w-8 h-8 text-[#ff6f00]" />,
      title: "Verify FASTag",
      desc: "We automatically identify your FASTag issuing bank and verify your details securely.",
    },
    {
      icon: <IoWalletOutline className="w-8 h-8 text-[#0060c9]" />,
      title: "Add Recharge Amount",
      desc: "Choose or manually enter the amount you want to recharge in your FASTag wallet.",
    },
    {
      icon: <IoCheckmarkCircleOutline className="w-8 h-8 text-[#ff6f00]" />,
      title: "Instant FASTag Update",
      desc: "Your FASTag is recharged instantly and ready for toll payments without any delay.",
    },
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="px-4 py-1 rounded-full bg-[#0060c9]/10 text-[#0060c9] font-semibold">
          FASTag Journey
        </span>

        <h2 className="text-4xl font-bold mt-4 text-gray-900">
          Step-by-Step <span className="text-[#ff6f00]">FASTag Recharge</span>
        </h2>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Simple, transparent and lightning-fast process to recharge your FASTag.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative  ml-6 md:ml-0 md:border-l-0 md:grid md:grid-cols-4 md:gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative mb-12 md:mb-0 md:text-center"
          >
        
            <div className="
              absolute -left-12 top-1 z-10 md:static md:mx-auto 
              w-12 h-12 flex items-center justify-center
              rounded-full bg-linear-to-br from-[#0060c9]/10 to-[#ff6f00]/10 border
              border-[#0060c9]/20 shadow-md
            ">
              {step.icon}
            </div>

            {/* Connector for Desktop */}
            {index < steps.length - 1 && (
              <div
                className="
                  hidden md:block absolute top-6 -right-4 
                  transform translate-x-1/2
                  w-full h-1 bg-linear-to-r
                  from-[#0060c9] to-[#ff6f00]
                "
              ></div>
            )}

            {/* Content */}
            <div className="mt-6 md:mt-5">
              <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
