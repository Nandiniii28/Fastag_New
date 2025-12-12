
// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
// import axiosInstance from "../../../components/axiosInstance";
// import { CgLogOff } from "react-icons/cg";
// import { GoPencil } from "react-icons/go";
// import { FaSave, FaTimes } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { useUser } from "./context";

// export default function Page() {
    
//     const { user, loading, setUser } = useUser();
//     console.log("user = ",user);
//     const [active, setActive] = useState("profile");
//     const router = useRouter();

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="text-center">
//                 <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0060c9]"></div>
//                 <p className="mt-4 text-gray-600">Loading profile...</p>
//             </div>
//         </div>
//     );

//     if (!user) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-red-600 mb-4">Failed to load profile</p>
//                     <button
//                         onClick={() => router.push("/login")}
//                         className="bg-[#0060c9] text-white px-4 py-2 rounded-md hover:bg-[#ff6f00] transition-colors"
//                     >
//                         Go to Login
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         window.location.href = "/";
//     };

//     const sections = [
//         { id: "profile", component: <ProfileCard user={user} setUser={setUser} /> },
//         // { id: "wallet", component: <WalletCard user={user} /> },
//         { id: "history", component: <HistoryCard /> },
//         { id: "offers", component: <OffersCard /> },
//     ];

//     return (
//         <div className="md:flex gap-6 min-h-screen p-2 md:p-6 bg-[#F0F4FF]">
//             {/* Sidebar */}
//             <div className="md:w-64 bg-white h-fit shadow-md rounded-2xl p-6 md:sticky top-10 my-5 md:my-0">
//                 <div className="text-center">
//                     <div className="border-2 border-[#0060c9] w-fit p-1.5 rounded-full mx-auto">
//                         <Image
//                             src={"/user/user.jpg"}
//                             className="w-24 aspect-square rounded-full mx-auto object-cover"
//                             width={100}
//                             height={100}
//                             alt="Profile"
//                         />
//                     </div>
//                     <h3 className="py-3 text-[#0060c9] font-semibold">
//                         {user.firstName} {user.lastName}
//                     </h3>
//                     <p className="text-[#0060c9] text-xs pb-2">● Active</p>
//                 </div>
//                 <div className="flex justify-between items-center flex-col">
//                     {["profile", "history", "offers"].map((tab) => (
//                         <button
//                             key={tab}
//                             onClick={() => setActive(tab)}
//                             className={`block w-full p-4 rounded-xl text-lg font-medium transition text-center
//                                 ${active === tab
//                                     ? "bg-gradient-to-r from-[#0060c9] to-[#ff6f00] text-white font-semibold shadow-lg"
//                                     : "hover:bg-gray-100"
//                                 }`}
//                         >
//                             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                         </button>
//                     ))}

//                     <button
//                         onClick={handleLogout}
//                         className="text-[#6F6F6F] cursor-pointer font-medium flex gap-2 items-center pt-6 hover:text-[#0060c9] transition-colors"
//                     >
//                         <CgLogOff /> Log Out
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="md:flex-1 flex flex-col gap-6">
//                 <AnimatePresence>
//                     {sections.map((item) => (
//                         <motion.div
//                             key={item.id}
//                             layout
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: item.id === active ? 1 : 0, y: item.id === active ? 0 : 40 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.35 }}
//                             className={`w-full ${item.id === active ? 'block' : 'hidden'}`}
//                         >
//                             {item.component}
//                         </motion.div>
//                     ))}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

// function ProfileCard({ user, setUser }) {
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         firstName: user.firstName || "",
//         lastName: user.lastName || "",
//         email: user.email || "",
//         mobile: user.mobile || "",
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     const handleEditToggle = () => {
//         if (isEditing) {
//             // Reset form data when cancelling edit
//             setFormData({
//                 firstName: user.firstName || "",
//                 lastName: user.lastName || "",
//                 email: user.email || "",
//                 mobile: user.mobile || "",
//             });
//             setError("");
//             setSuccess("");
//         }
//         setIsEditing(!isEditing);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//         // Clear errors when user starts typing
//         if (error) setError("");
//     };

//     const validateForm = () => {
//         if (!formData.firstName.trim()) {
//             setError("First name is required");
//             return false;
//         }
//         if (!formData.lastName.trim()) {
//             setError("Last name is required");
//             return false;
//         }
//         if (!formData.email.trim()) {
//             setError("Email is required");
//             return false;
//         }
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             setError("Please enter a valid email address");
//             return false;
//         }
//         if (!formData.mobile.trim()) {
//             setError("Mobile number is required");
//             return false;
//         }
//         if (!/^\d{10}$/.test(formData.mobile)) {
//             setError("Mobile number must be 10 digits");
//             return false;
//         }
//         return true;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccess("");

//         if (!validateForm()) {
//             return;
//         }

//         try {
//             setLoading(true);
//             const response = await axiosInstance.put(`/auth/${user._id}`, {
//                 firstName: formData.firstName.trim(),
//                 lastName: formData.lastName.trim(),
//                 email: formData.email.trim(),
//                 mobile: formData.mobile.trim(),
//             });

//             if (response.data.success) {
//                 setSuccess("Profile updated successfully!");
//                 // Update user in context/state
//                 setUser(response.data.updated);
//                 setIsEditing(false);
                
//                 // Clear success message after 3 seconds
//                 setTimeout(() => {
//                     setSuccess("");
//                 }, 3000);
//             } else {
//                 throw new Error("Failed to update profile");
//             }
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             if (error.response?.status === 409) {
//                 setError("Email or mobile number already exists");
//             } else if (error.response?.status === 400) {
//                 setError(error.response.data?.message || "Invalid data");
//             } else {
//                 setError("Failed to update profile. Please try again.");
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-white rounded-2xl p-4 shadow">
//             <div className="md:flex gap-6 items-center border border-[#E0F0FF] p-6 rounded-2xl relative">
//                 <div className="flex flex-col items-center">
//                     <div className="border-2 border-[#0060c9] w-fit p-1.5 rounded-full">
//                         <Image
//                             src={"/user/user.jpg"}
//                             className="w-38 aspect-square rounded-full object-cover"
//                             width={120}
//                             height={120}
//                             alt="Profile"
//                         />
//                     </div>
//                     {/* {isEditing && (
//                         <button className="mt-3 text-[#0060c9] text-sm hover:text-[#ff6f00] transition-colors">
//                             Change Photo
//                         </button>
//                     )} */}
//                 </div>

//                 <div className="flex-1">
//                     {!isEditing ? (
//                         // View Mode
//                         <>
//                             <h2 className="text-xl font-medium text-[#0060c9]">
//                                 {user.firstName} {user.lastName}
//                             </h2>
//                             <p className="text-[#ff6f00] text-xs">● Active</p>

//                             <div className="grid lg:grid-cols-2 gap-4 mt-6 text-sm text-[#5B4033]">
//                                 <div className="space-y-1">
//                                     <p className="font-medium text-[#0060c9]">First Name</p>
//                                     <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.firstName}</p>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <p className="font-medium text-[#0060c9]">Last Name</p>
//                                     <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.lastName}</p>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <p className="font-medium text-[#0060c9]">Email</p>
//                                     <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.email}</p>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <p className="font-medium text-[#0060c9]">Mobile Number</p>
//                                     <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.mobile}</p>
//                                 </div>

//                                 {/* <div className="space-y-1">
//                                     <p className="font-medium text-[#0060c9]">User Role</p>
//                                     <p className="text-gray-700 bg-gray-50 p-2 rounded capitalize">{user.role}</p>
//                                 </div> */}

//                                 <div className="space-y-1">
//                                     <p className="font-medium text-[#0060c9]">Member Since</p>
//                                     <p className="text-gray-700 bg-gray-50 p-2 rounded">
//                                         {new Date(user.createdAt).toLocaleDateString('en-US', {
//                                             day: 'numeric',
//                                             month: 'long',
//                                             year: 'numeric'
//                                         })}
//                                     </p>
//                                 </div>
//                             </div>
//                         </>
//                     ) : (
//                         // Edit Mode
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             <h2 className="text-xl font-medium text-[#0060c9]">Edit Profile</h2>
                            
//                             {/* Success Message */}
//                             {success && (
//                                 <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
//                                     <p className="text-green-600 text-sm">{success}</p>
//                                 </div>
//                             )}

//                             {/* Error Message */}
//                             {error && (
//                                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
//                                     <p className="text-red-600 text-sm">{error}</p>
//                                 </div>
//                             )}

//                             <div className="grid lg:grid-cols-2 gap-4">
//                                 <div className="space-y-2">
//                                     <label className="block font-medium text-[#0060c9]">
//                                         First Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="firstName"
//                                         value={formData.firstName}
//                                         onChange={handleChange}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
//                                         placeholder="Enter first name"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="block font-medium text-[#0060c9]">
//                                         Last Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="lastName"
//                                         value={formData.lastName}
//                                         onChange={handleChange}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
//                                         placeholder="Enter last name"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="block font-medium text-[#0060c9]">
//                                         Email *
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
//                                         placeholder="Enter email"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="space-y-2">
//                                     <label className="block font-medium text-[#0060c9]">
//                                         Mobile Number *
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="mobile"
//                                         value={formData.mobile}
//                                         onChange={handleChange}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
//                                         placeholder="Enter 10-digit mobile number"
//                                         maxLength={10}
//                                         pattern="[0-9]{10}"
//                                         required
//                                     />
//                                 </div>
// {/* 
//                                 <div className="space-y-2">
//                                     <label className="block font-medium text-[#0060c9]">
//                                         User Role
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={user.role}
//                                         className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
//                                         disabled
//                                     />
//                                     <p className="text-xs text-gray-500">Role cannot be changed</p>
//                                 </div> */}
//                             </div>

//                             <div className="flex gap-3 pt-4">
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="bg-gradient-to-r from-[#0060c9] to-[#ff6f00] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
//                                             Saving...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <FaSave />
//                                             Save Changes
//                                         </>
//                                     )}
//                                 </button>

//                                 <button
//                                     type="button"
//                                     onClick={handleEditToggle}
//                                     className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium hover:border-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
//                                 >
//                                     <FaTimes />
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     )}
//                 </div>

//                 {/* Edit Button */}
//                 {!isEditing && (
//                     <button
//                         onClick={handleEditToggle}
//                         className="absolute lg:right-10 top-5 border border-[#C0C0C0] text-[#6F6F6F] px-5 py-2 rounded-full hover:scale-105 flex items-center gap-2 w-fit hover:border-[#0060c9] hover:text-[#0060c9] transition-colors"
//                     >
//                         Edit <GoPencil />
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }

// // History Card Component (same as before)
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
//                         className={`px-4 py-1 rounded-full text-sm ${activeTab === "today"
//                             ? "border border-[#0060c9] text-[#0060c9] font-semibold"
//                             : "border border-[#C0C0C0] text-[#C0C0C0]"
//                             }`}
//                     >
//                         Today
//                     </button>
//                     <button
//                         onClick={() => setActiveTab("previous")}
//                         className={`px-4 py-1 rounded-full border text-sm ${activeTab === "previous"
//                             ? "border border-[#0060c9] text-[#0060c9] font-semibold"
//                             : "border border-[#C0C0C0] text-[#C0C0C0]"
//                             }`}
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

// // Offers Card Component (same as before)
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
import axiosInstance from "../../../components/axiosInstance";
import { CgLogOff } from "react-icons/cg";
import { GoPencil } from "react-icons/go";
import { FaSave, FaTimes, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUser } from "./context";

export default function Page() {
    
    const { user, loading, setUser } = useUser();
    const [active, setActive] = useState("profile");
    const router = useRouter();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0060c9]"></div>
                <p className="mt-4 text-gray-600">Loading profile...</p>
            </div>
        </div>
    );

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Failed to load profile</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="bg-[#0060c9] text-white px-4 py-2 rounded-md hover:bg-[#ff6f00] transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const sections = [
        { id: "profile", component: <ProfileCard user={user} setUser={setUser} /> },
        { id: "history", component: <HistoryCard user={user} /> },
        { id: "offers", component: <OffersCard /> },
    ];

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
                    {["profile", "history", "offers"].map((tab) => (
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
                    {sections.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: item.id === active ? 1 : 0, y: item.id === active ? 0 : 40 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            className={`w-full ${item.id === active ? 'block' : 'hidden'}`}
                        >
                            {item.component}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ProfileCard({ user, setUser }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleEditToggle = () => {
        if (isEditing) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                mobile: user.mobile || "",
            });
            setError("");
            setSuccess("");
        }
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
    };

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError("First name is required");
            return false;
        }
        if (!formData.lastName.trim()) {
            setError("Last name is required");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }
        if (!formData.mobile.trim()) {
            setError("Mobile number is required");
            return false;
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
            setError("Mobile number must be 10 digits");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.put(`/auth/${user._id}`, {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                mobile: formData.mobile.trim(),
            });

            if (response.data.success) {
                setSuccess("Profile updated successfully!");
                setUser(response.data.updated);
                setIsEditing(false);
                
                setTimeout(() => {
                    setSuccess("");
                }, 3000);
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response?.status === 409) {
                setError("Email or mobile number already exists");
            } else if (error.response?.status === 400) {
                setError(error.response.data?.message || "Invalid data");
            } else {
                setError("Failed to update profile. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow">
            <div className="md:flex gap-6 items-center border border-[#E0F0FF] p-6 rounded-2xl relative">
                <div className="flex flex-col items-center">
                    <div className="border-2 border-[#0060c9] w-fit p-1.5 rounded-full">
                        <Image
                            src={"/user/user.jpg"}
                            className="w-38 aspect-square rounded-full object-cover"
                            width={120}
                            height={120}
                            alt="Profile"
                        />
                    </div>
                </div>

                <div className="flex-1">
                    {!isEditing ? (
                        <>
                            <h2 className="text-xl font-medium text-[#0060c9]">
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className="text-[#ff6f00] text-xs">● Active</p>

                            <div className="grid lg:grid-cols-2 gap-4 mt-6 text-sm text-[#5B4033]">
                                <div className="space-y-1">
                                    <p className="font-medium text-[#0060c9]">First Name</p>
                                    <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.firstName}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="font-medium text-[#0060c9]">Last Name</p>
                                    <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.lastName}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="font-medium text-[#0060c9]">Email</p>
                                    <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.email}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="font-medium text-[#0060c9]">Mobile Number</p>
                                    <p className="text-gray-700 bg-gray-50 p-2 rounded">{user.mobile}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="font-medium text-[#0060c9]">Member Since</p>
                                    <p className="text-gray-700 bg-gray-50 p-2 rounded">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-xl font-medium text-[#0060c9]">Edit Profile</h2>
                            
                            {success && (
                                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-600 text-sm">{success}</p>
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}

                            <div className="grid lg:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block font-medium text-[#0060c9]">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
                                        placeholder="Enter first name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-medium text-[#0060c9]">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
                                        placeholder="Enter last name"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-medium text-[#0060c9]">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block font-medium text-[#0060c9]">
                                        Mobile Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060c9]/30 focus:border-[#0060c9]"
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength={10}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-[#0060c9] to-[#ff6f00] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            Save Changes
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleEditToggle}
                                    className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-medium hover:border-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                                >
                                    <FaTimes />
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {!isEditing && (
                    <button
                        onClick={handleEditToggle}
                        className="absolute lg:right-10 top-5 border border-[#C0C0C0] text-[#6F6F6F] px-5 py-2 rounded-full hover:scale-105 flex items-center gap-2 w-fit hover:border-[#0060c9] hover:text-[#0060c9] transition-colors"
                    >
                        Edit <GoPencil />
                    </button>
                )}
            </div>
        </div>
    );
}

// History Card Component - Updated with API data
function HistoryCard({ user }) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("all"); // all, debit, credit

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await axiosInstance.get("/topup/wallet/report");
            
            if (response.data.success) {
                setTransactions(response.data.data || []);
            } else {
                throw new Error("Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setError(error.response?.data?.message || "Failed to load transaction history");
        } finally {
            setLoading(false);
        }
    };

    // Filter transactions based on selected filter
    const filteredTransactions = transactions.filter(transaction => {
        if (filter === "all") return true;
        if (filter === "debit") return transaction.transaction_type === "debit";
        if (filter === "credit") return transaction.transaction_type === "credit";
        return true;
    });

    // Get status color and icon
    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case "success":
            case "completed":
                return {
                    color: "text-green-600 bg-green-50 border-green-200",
                    icon: <FaCheckCircle className="text-green-500" />,
                    bgColor: "bg-green-100"
                };
            case "failed":
                return {
                    color: "text-red-600 bg-red-50 border-red-200",
                    icon: <FaTimesCircle className="text-red-500" />,
                    bgColor: "bg-red-100"
                };
            case "pending":
                return {
                    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
                    icon: <FaClock className="text-yellow-500" />,
                    bgColor: "bg-yellow-100"
                };
            default:
                return {
                    color: "text-gray-600 bg-gray-50 border-gray-200",
                    icon: <FaClock className="text-gray-500" />,
                    bgColor: "bg-gray-100"
                };
        }
    };

    // Get transaction type color
    const getTransactionTypeColor = (type) => {
        return type === "debit" ? "text-red-600" : "text-green-600";
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Format time
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-white p-4 rounded-2xl shadow">
            <div className="border border-[#E0F0FF] p-6 rounded-2xl relative bg-white">
                <div className="flex flex-col gap-6">
                    {/* Header with filter buttons */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-[#0060c9]">Transaction History</h2>
                            <p className="text-gray-600 text-sm">All your FASTag and wallet transactions</p>
                        </div>
                        
                        {/* <div className="flex gap-2">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-[#0060c9] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter("debit")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "debit" ? "bg-red-100 text-red-600 border border-red-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                Debit
                            </button>
                            <button
                                onClick={() => setFilter("credit")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === "credit" ? "bg-green-100 text-green-600 border border-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                Credit
                            </button>
                        </div> */}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-10">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0060c9]"></div>
                            <p className="mt-2 text-gray-600">Loading transactions...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-10">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchTransactions}
                                className="bg-[#0060c9] text-white px-4 py-2 rounded-md hover:bg-[#ff6f00] transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && filteredTransactions.length === 0 && (
                        <div className="text-center py-10">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <FaClock className="text-gray-400 text-2xl" />
                            </div>
                            <p className="text-gray-600">No transactions found</p>
                            <p className="text-gray-500 text-sm mt-1">Your transaction history will appear here</p>
                        </div>
                    )}

                    {/* Transactions List */}
                    {!loading && !error && filteredTransactions.length > 0 && (
                        <div className="space-y-4">
                            {filteredTransactions.map((transaction) => {
                                const statusInfo = getStatusInfo(transaction.status);
                                return (
                                    <div 
                                        key={transaction._id} 
                                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            {/* Left Section */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                                                        {statusInfo.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-gray-800">
                                                            {transaction.fastagMeta?.billerName || transaction.type || "Transaction"}
                                                        </h3>
                                                        <div className="flex items-center gap-4 mt-1">
                                                            <span className={`text-xs px-2 py-1 rounded-full border ${statusInfo.color}`}>
                                                                {transaction.status || "Unknown"}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {formatDate(transaction.createdAt)} at {formatTime(transaction.createdAt)}
                                                            </span>
                                                            <span className={`text-xs font-medium ${getTransactionTypeColor(transaction.transaction_type)}`}>
                                                                {transaction.transaction_type === "debit" ? "DEBIT" : "CREDIT"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {transaction.description && (
                                                    <p className="text-sm text-gray-600 mt-2 ml-13">
                                                        {transaction.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Right Section */}
                                            <div className="text-right">
                                                <div className={`text-lg font-bold ${transaction.transaction_type === "debit" ? "text-red-600" : "text-green-600"}`}>
                                                    {transaction.transaction_type === "debit" ? "-" : "+"}₹{transaction.amount || 0}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Ref: {transaction.transaction_reference_id || "N/A"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Mode: {transaction.payment_mode || "Wallet"}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Details */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Transaction ID:</span>
                                                    <p className="font-medium">{transaction._id}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Category:</span>
                                                    <p className="font-medium">{transaction.fastagMeta?.categoryName || "FASTag Recharge"}</p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Balance After:</span>
                                                    <p className="font-medium">₹{transaction.balance_after || 0}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Summary Stats */}
                    {!loading && !error && transactions.length > 0 && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Total Transactions</p>
                                    <p className="text-xl font-bold text-[#0060c9]">{transactions.length}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Successful</p>
                                    <p className="text-xl font-bold text-green-600">
                                        {transactions.filter(t => t.status?.toLowerCase() === "success" || t.status?.toLowerCase() === "completed").length}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Pending</p>
                                    <p className="text-xl font-bold text-yellow-600">
                                        {transactions.filter(t => t.status?.toLowerCase() === "pending").length}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500">Failed</p>
                                    <p className="text-xl font-bold text-red-600">
                                        {transactions.filter(t => t.status?.toLowerCase() === "failed").length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Offers Card Component
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