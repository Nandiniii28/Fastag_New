// "use client"
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import { CgLogOff } from "react-icons/cg";
// import { GoPencil } from "react-icons/go";

// export default function page() {
//     const [active, setActive] = useState("profile");

//     const sections = [
//         { id: "profile", component: <ProfileCard /> },
//         { id: "wallet", component: <WalletCard /> },
//         { id: "history", component: <HistoryCard /> },
//         { id: "offers", component: <OffersCard /> },
//     ];

//     const sorted = [
//         ...sections.filter((s) => s.id === active),
//         ...sections.filter((s) => s.id !== active),
//     ];

//     return (
//         <div className="md:flex gap-6 min-h-screen p-2 md:p-6 bg-[#F0F4FF]">
//             {/* Sidebar */}
//             <div className="md:w-64 bg-white h-fit shadow-md rounded-2xl p-6 md:sticky top-10 my-5 md:my-0">
//                 <div className="text-center">
//                     <div className="border-2 border-[#0060c9] w-fit p-1.5 rounded-full mx-auto">
//                         <Image src="/user/user.jpg" className="w-24 aspect-square rounded-full mx-auto object-cover" width={100} height={100} alt="" />
//                     </div>
//                     <h3 className="py-3 text-[#0060c9] font-semibold">RAHUL VERMA</h3>
//                     <p className="text-[#0060c9] text-xs pb-2">● Active</p>
//                 </div>

//                 {["profile", "wallet", "history", "offers"].map((tab) => (
//                     <button
//                         key={tab}
//                         onClick={() => setActive(tab)}
//                         className={`block w-full p-4 rounded-xl text-lg font-medium transition text-center
//               ${active === tab
//                   ? "bg-gradient-to-r from-[#0060c9] to-[#ff6f00] text-white font-semibold shadow-lg"
//                   : "hover:bg-gray-100"
//               }`}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}

//                 <button className="text-[#6F6F6F] font-medium flex gap-2 items-center pt-6 hover:text-[#0060c9] transition-colors">
//                     <CgLogOff /> Log Out
//                 </button>
//             </div>

//             {/* Main Content */}
//             <div className="md:flex-1 flex flex-col gap-6">
//                 <AnimatePresence>
//                     {sorted.map((item) => (
//                         <motion.div
//                             key={item.id}
//                             layout
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.35 }}
//                             className="w-full"
//                         >
//                             {item.component}
//                         </motion.div>
//                     ))}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

// // ----------------- Profile Card -----------------
// function ProfileCard() {
//     return (
//         <div className="bg-white rounded-2xl p-4 shadow">
//             <div className="md:flex gap-6 items-center border border-[#E0F0FF] p-6 rounded-2xl relative">
//                 <Image
//                     src="/user/user.jpg"
//                     className="w-38 aspect-square rounded-full mx-auto object-cover"
//                     width={100}
//                     height={100}
//                     alt=""
//                 />

//                 <div className="flex-1">
//                     <h2 className="text-xl font-medium text-[#0060c9]">RAHUL VERMA</h2>
//                     <p className="text-[#ff6f00] text-xs">● Active</p>

//                     <div className="grid lg:grid-cols-3 gap-4 mt-4 text-sm text-[#5B4033]">
//                         <div>
//                             <p className="font-medium text-base">Mobile Number</p>
//                             <p>91+ 98765 43210</p>
//                         </div>

//                         <div>
//                             <p className="font-medium text-base">Email</p>
//                             <p>rahulv.fastag@gmail.com</p>
//                         </div>

//                         <div>
//                             <p className="font-medium text-base">Vehicle Number</p>
//                             <p>RJ14 CD 5623</p>
//                         </div>
//                     </div>
//                 </div>

//                 <button className="absolute lg:right-10 top-5 border border-[#C0C0C0] text-[#6F6F6F] px-5 py-1 rounded-full hover:scale-105 flex items-center gap-2 w-fit hover:border-[#0060c9] hover:text-[#0060c9] transition-colors">
//                     Edit <GoPencil />
//                 </button>
//             </div>
//         </div>
//     );
// }

// // ----------------- Wallet Card -----------------
// function WalletCard() {
//     return (
//         <div className="bg-white p-4 rounded-2xl shadow flex justify-between">
//             <div className="md:flex gap-6 w-full items-center justify-between border border-[#E0F0FF] p-6 rounded-2xl relative">
//                 <div
//                     className="text-3xl font-semibold mb-3 px-10 rounded-lg py-3 w-fit text-white"
//                     style={{
//                         background:
//                             "linear-gradient(90deg, #0060c9 0%, #ff6f00 100%)",
//                     }}
//                 >
//                     ₹1,250
//                 </div>
//                 <button className="border px-6 py-2 rounded-2xl text-[#6F6F6F] hover:scale-105 flex items-center gap-2 h-fit mt-auto hover:border-[#0060c9] hover:text-[#0060c9] transition-colors">
//                     <span className="border border-[#6F6F6F] flex items-center w-fit px-2 rounded-full">+</span>
//                     Add Money to FASTag
//                 </button>
//             </div>
//         </div>
//     );
// }

// // // ----------------- History Card -----------------
// function HistoryCard() {
//     const [activeTab, setActiveTab] = useState("today");

//     const todayData = [
//         { id: 1, name: "Toll Plaza – Manoharpur", address: "NH 48, Jaipur", price: 90, date: "10/12/2025" },
//         { id: 2, name: "Toll Plaza – Chandwaji", address: "NH 48, Jaipur", price: 65, date: "10/12/2025" },
//     ];

//     const previousData = [
//         { id: 3, name: "eChallan – Overspeeding", address: "Tonk Road, Jaipur", price: 500, date: "02/12/2025" },
//         { id: 4, name: "Toll Plaza – Shahpura", address: "NH 48, Jaipur", price: 80, date: "28/11/2025" },
//     ];

//     const items = activeTab === "today" ? todayData : previousData;

//     return (
//         <div className="bg-white p-4 rounded-2xl shadow">
//             <div className="border border-[#E0F0FF] p-6 rounded-2xl relative bg-white">
//                 <div className="flex gap-3 mb-6">
//                     <button
//                         onClick={() => setActiveTab("today")}
//                         className={`px-4 py-1 rounded-full text-sm ${
//                             activeTab === "today"
//                                 ? "border border-[#0060c9] text-[#0060c9] font-semibold"
//                                 : "border border-[#C0C0C0] text-[#C0C0C0]"
//                         }`}
//                     >
//                         Today
//                     </button>

//                     <button
//                         onClick={() => setActiveTab("previous")}
//                         className={`px-4 py-1 rounded-full border text-sm ${
//                             activeTab === "previous"
//                                 ? "border border-[#0060c9] text-[#0060c9] font-semibold"
//                                 : "border border-[#C0C0C0] text-[#C0C0C0]"
//                         }`}
//                     >
//                         Previous
//                     </button>
//                 </div>

//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={activeTab}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -20 }}
//                         transition={{ duration: 0.25 }}
//                         className="flex flex-col gap-3"
//                     >
//                         {items.map((item) => (
//                             <div key={item.id} className="flex justify-between rounded-xl">
//                                 <div className="flex gap-3 w-full">
//                                     <Image
//                                         src="/user/c1.jpg"
//                                         className="w-16 h-12"
//                                         width={100}
//                                         height={100}
//                                         alt=""
//                                     />

//                                     <div className="flex flex-col w-full justify-between">
//                                         <div className="flex justify-between">
//                                             <p className="font-medium text-[#5B4033]">{item.name}</p>
//                                             <p className="font-bold text-[#0060c9]">₹{item.price}</p>
//                                         </div>

//                                         <div className="flex justify-between">
//                                             <p className="text-xs text-[#5B4033]">{item.address}</p>
//                                             <p className="text-[#6F6F6F] text-[11px]">{item.date}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </motion.div>
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

// // ----------------- Offers Card -----------------
// function OffersCard() {
//     const offers = [
//         {
//             id: 1,
//             img: "/user/car1.jpg",
//             title: "FASTag Cashback",
//             offer: "₹50 Cashback on Recharge",
//             validity: "Valid till 31/12/2025",
//         },
//         {
//             id: 2,
//             img: "/user/car2.jpg",
//             title: "eChallan Discount",
//             offer: "10% Off on First Payment",
//             validity: "Valid till 15/01/2026",
//         },
//     ];

//     return (
//         <div className="bg-white p-4 rounded-2xl shadow">
//             <div className="border border-[#E0F0FF] p-6 rounded-2xl relative bg-white">
//                 <div className="grid md:grid-cols-2 gap-6">
//                     {offers.map((item) => (
//                         <div key={item.id} className="rounded-xl overflow-hidden shadow relative p-0">
//                             <Image
//                                 src={item.img}
//                                 className="w-full h-44 object-cover"
//                                 width={400}
//                                 height={400}
//                                 alt={item.title}
//                             />

//                             <div
//                                 className="absolute inset-0"
//                                 style={{
//                                     background:
//                                         "linear-gradient(180deg, rgba(0, 96, 201, 0) 0%, rgba(255, 111, 0, 0.8) 100%)",
//                                 }}
//                             />

//                             <div className="absolute bottom-3 right-3 text-white font-semibold text-sm">
//                                 <p className="font-medium text-[18px] text-right mb-1">{item.title}</p>

//                                 <p className="font-bold text-[20px]">{item.offer}</p>

//                                 <p className="text-[10px] font-extralight text-right">{item.validity}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }





"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axiosInstance from "../../app/services/axiosInstance";
import { CgLogOff } from "react-icons/cg";
import { GoPencil } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useUser } from "./context";

export default function Page() {
    const { user, loading } = useUser();
    const [active, setActive] = useState("profile");
    const router = useRouter();


    // useEffect(() => {
    //     const token= localStorage.getItem("token")
    //     if (!token) {
    //         router.push("/login");
    //     }
    // }, []);

    if (loading) return <p className="p-10">Loading...</p>;

    const sections = [
        { id: "profile", component: <ProfileCard user={user} /> },
        { id: "wallet", component: <WalletCard user={user} /> },
        { id: "history", component: <HistoryCard /> },
        { id: "offers", component: <OffersCard /> },
    ];

    const sorted = [
        ...sections.filter((s) => s.id === active),
        ...sections.filter((s) => s.id !== active),
    ];

    if (loading) {
        return <p className="p-10 text-center text-lg">Loading...</p>;
    }

    if (!user) {
        return <p className="p-10 text-center text-lg text-red-600">Failed to load profile.</p>;
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className="md:flex gap-6 min-h-screen p-2 md:p-6 bg-[#F0F4FF]">
            {/* Sidebar */}
            <div className="md:w-64 bg-white h-fit shadow-md rounded-2xl p-6 md:sticky top-10 my-5 md:my-0">
                <div className="text-center">
                    <div className="border-2 border-[#0060c9] w-fit p-1.5 rounded-full mx-auto">
                        <Image
                            src={"/user/user.jpg"}
                            className="w-24 aspect-square rounded-full mx-auto object-cover"
                            width={100}
                            height={100}
                            alt="Profile"
                        />
                    </div>
                    <h3 className="py-3 text-[#0060c9] font-semibold">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-[#0060c9] text-xs pb-2">● Active</p>
                </div>
                <div className="flex justify-between items-center flex-col">

                    {["profile", "wallet", "history", "offers"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActive(tab)}
                            className={`block w-full p-4 rounded-xl text-lg font-medium transition text-center
                        ${active === tab
                                    ? "bg-gradient-to-r from-[#0060c9] to-[#ff6f00] text-white font-semibold shadow-lg"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}

                    <button
                        onClick={handleLogout}
                        className="text-[#6F6F6F] cursor-pointer font-medium flex gap-2 items-center pt-6 hover:text-[#0060c9] transition-colors"
                    >
                        <CgLogOff /> Log Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:flex-1 flex flex-col gap-6">
                <AnimatePresence>
                    {sorted.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className="w-full"
                        >
                            {item.component}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}


function ProfileCard({ user }) {
    console.log("sdfsfsdfsdf", user.profileImage);

    return (
        <div className="bg-white rounded-2xl p-4 shadow">
            <div className="md:flex gap-6 items-center border border-[#E0F0FF] p-6 rounded-2xl relative">

                {/* <Image
          src={user.profileImage || "/user/user.jpg"}
          className="w-38 aspect-square rounded-full mx-auto object-cover"
          width={120}
          height={120}
          alt="Profile"
        /> */}

                <Image
                    src={"/user/user.jpg"}
                    className="w-38 aspect-square rounded-full mx-auto object-cover"
                    width={120}
                    height={120}
                    alt="Profile"
                />




                <div className="flex-1">
                    <h2 className="text-xl font-medium text-[#0060c9]">
                        {user.firstName} {user.lastName}
                    </h2>

                    <p className="text-[#ff6f00] text-xs">● Active</p>

                    <div className="grid lg:grid-cols-3 gap-4 mt-4 text-sm text-[#5B4033]">
                        <div>
                            <p className="font-medium text-base">Mobile Number</p>
                            <p>{user.mobile}</p>
                        </div>

                        <div>
                            <p className="font-medium text-base">Email</p>
                            <p>{user.email}</p>
                        </div>

                        <div>
                            <p className="font-medium text-base">User Role</p>
                            <p>{user.role}</p>
                        </div>
                    </div>
                </div>

                {/* <button className="absolute lg:right-10 top-5 border border-[#C0C0C0] text-[#6F6F6F] px-5 py-1 rounded-full hover:scale-105 flex items-center gap-2 w-fit hover:border-[#0060c9] hover:text-[#0060c9] transition-colors">
                    Edit <GoPencil />
                </button> */}
            </div>
        </div>
    );
}


function WalletCard({ user }) {
    return (
        <div className="bg-white p-4 rounded-2xl shadow flex justify-between">
            <div className="md:flex gap-6 w-full items-center justify-between border border-[#E0F0FF] p-6 rounded-2xl relative">

                <div
                    className="text-3xl font-semibold mb-3 px-10 rounded-lg py-3 w-fit text-white"
                    style={{ background: "linear-gradient(90deg, #0060c9 0%, #ff6f00 100%)" }}
                >
                    ₹{user.wallet?.balance || 0}
                </div>

                {/* <button className="border px-6 py-2 rounded-2xl text-[#6F6F6F] hover:scale-105 flex items-center gap-2 h-fit mt-auto hover:border-[#0060c9] hover:text-[#0060c9] transition-colors">
                    <span className="border border-[#6F6F6F] flex items-center w-fit px-2 rounded-full">+</span>
                    Add Money to FASTag
                </button> */}
            </div>
        </div>
    );
}



// // ----------------- History Card -----------------
function HistoryCard() {
    const [activeTab, setActiveTab] = useState("today");

    const todayData = [
        { id: 1, name: "Toll Plaza – Manoharpur", address: "NH 48, Jaipur", price: 90, date: "10/12/2025" },
        { id: 2, name: "Toll Plaza – Chandwaji", address: "NH 48, Jaipur", price: 65, date: "10/12/2025" },
    ];

    const previousData = [
        { id: 3, name: "eChallan – Overspeeding", address: "Tonk Road, Jaipur", price: 500, date: "02/12/2025" },
        { id: 4, name: "Toll Plaza – Shahpura", address: "NH 48, Jaipur", price: 80, date: "28/11/2025" },
    ];

    const items = activeTab === "today" ? todayData : previousData;

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="border border-[#E0F0FF] p-6 rounded-2xl relative bg-white">
                <div className="flex gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("today")}
                        className={`px-4 py-1 rounded-full text-sm ${activeTab === "today"
                            ? "border border-[#0060c9] text-[#0060c9] font-semibold"
                            : "border border-[#C0C0C0] text-[#C0C0C0]"
                            }`}
                    >
                        Today
                    </button>

                    <button
                        onClick={() => setActiveTab("previous")}
                        className={`px-4 py-1 rounded-full border text-sm ${activeTab === "previous"
                            ? "border border-[#0060c9] text-[#0060c9] font-semibold"
                            : "border border-[#C0C0C0] text-[#C0C0C0]"
                            }`}
                    >
                        Previous
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col gap-3"
                    >
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between rounded-xl">
                                <div className="flex gap-3 w-full">
                                    <Image
                                        src="/user/c1.jpg"
                                        className="w-16 h-12"
                                        width={100}
                                        height={100}
                                        alt=""
                                    />

                                    <div className="flex flex-col w-full justify-between">
                                        <div className="flex justify-between">
                                            <p className="font-medium text-[#5B4033]">{item.name}</p>
                                            <p className="font-bold text-[#0060c9]">₹{item.price}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p className="text-xs text-[#5B4033]">{item.address}</p>
                                            <p className="text-[#6F6F6F] text-[11px]">{item.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// ----------------- Offers Card -----------------
function OffersCard() {
    const offers = [
        {
            id: 1,
            img: "/user/car1.jpg",
            title: "FASTag Cashback",
            offer: "₹50 Cashback on Recharge",
            validity: "Valid till 31/12/2025",
        },
        {
            id: 2,
            img: "/user/car2.jpg",
            title: "eChallan Discount",
            offer: "10% Off on First Payment",
            validity: "Valid till 15/01/2026",
        },
    ];

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="border border-[#E0F0FF] p-6 rounded-2xl relative bg-white">
                <div className="grid md:grid-cols-2 gap-6">
                    {offers.map((item) => (
                        <div key={item.id} className="rounded-xl overflow-hidden shadow relative p-0">
                            <Image
                                src={item.img}
                                className="w-full h-44 object-cover"
                                width={400}
                                height={400}
                                alt={item.title}
                            />

                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        "linear-gradient(180deg, rgba(0, 96, 201, 0) 0%, rgba(255, 111, 0, 0.8) 100%)",
                                }}
                            />

                            <div className="absolute bottom-3 right-3 text-white font-semibold text-sm">
                                <p className="font-medium text-[18px] text-right mb-1">{item.title}</p>

                                <p className="font-bold text-[20px]">{item.offer}</p>

                                <p className="text-[10px] font-extralight text-right">{item.validity}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}