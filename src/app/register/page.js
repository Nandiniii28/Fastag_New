// // app/register/page.tsx  (Next.js 13+ app router)
// import Image from "next/image";
// import Link from "next/link";

// export default function RegisterPage() {
//   return (
//     <main className="min-h-screen bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat text-white">
//       <div className="min-h-screen bg-black/60">
//         <div className="container mx-auto flex min-h-screen flex-col md:flex-row px-4">
//           {/* Left side */}
//           <section className="flex h-[40vh] md:h-screen w-full md:w-1/2 flex-col items-center justify-end pb-16 text-center">
//             <h2 className="text-5xl md:text-6xl font-bold leading-none mb-3">
//               WELCOME
//             </h2>
//             <p className="text-xl md:text-2xl text-white/85">
//               Smart support for every vehicle.
//             </p>
//           </section>

//           {/* Right side – Register form */}
//           <section className="flex h-[60vh] md:h-screen w-full md:w-1/2 items-center justify-center">
//             <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 py-6 px-5 md:px-7 shadow-2xl">
//               <div className="text-left mb-5">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-1">
//                   Register Yourself!
//                 </h2>
//                 <p className="text-xs text-white/70">
//                   Create your account to manage FASTag & e‑Challan in one place.
//                 </p>
//               </div>

//               <form className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Your Name"
//                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     Phone / Email
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter email or phone"
//                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="Enter password"
//                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold mb-1">
//                     Confirm Password
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="Confirm password"
//                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2.5 text-sm font-semibold text-white hover:bg-[#d15805] transition-colors"
//                 >
//                   Continue
//                 </button>
//               </form>


//               <p className="mt-3 text-center text-[11px] text-white/70">
//                 By continuing you agree to our{" "}
//                 <a href="#" className="underline underline-offset-2">
//                   privacy policy
//                 </a>{" "}
//                 &{" "}
//                 <a href="#" className="underline underline-offset-2">
//                   terms
//                 </a>
//                 .
//               </p>

//               <div className="mt-4 text-right text-xs">
//                 <Link href="/login" className="text-[#ff6f00] hover:underline">
//                   Already have an account?
//                 </Link>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import axiosInstance from "../services/axiosInstance";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   // Validation
//   const validate = () => {
//     if (!form.firstName.trim()) return "First name is required";
//     if (!form.lastName.trim()) return "Last name is required";

//     const isEmail = /\S+@\S+\.\S+/.test(form.email);
//     if (!isEmail) return "Enter a valid email address";

//     const isMobile = /^[0-9]{10}$/.test(form.mobile);
//     if (!isMobile) return "Enter valid 10-digit mobile number";

//     if (!form.password) return "Password is required";
//     if (form.password.length < 6) return "Password must be at least 6 characters";

//     if (form.password !== form.confirmPassword)
//       return "Passwords do not match";

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const validationErr = validate();
//     if (validationErr) {
//       setError(validationErr);
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("firstName", form.firstName);
//       formData.append("lastName", form.lastName);
//       formData.append("email", form.email);
//       formData.append("mobile", form.mobile);
//       formData.append("password", form.password);

//       if (profileImage) {
//         formData.append("profileImage", profileImage);
//       }

//       const res = await axiosInstance.post("/auth/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       console.log("Register Response:", res.data);

//       // 🔥 Show Toast on Success
//       toast.success("Registration Successful!", {
//         position: "top-center",
//       });

//       // 🔥 Redirect to Login after 1.5 sec
//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);

//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//       toast.error(error.response?.data?.message || "Registration Failed", {
//         position: "top-center",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat text-white">
//       {/* Toast Container */}
//       <ToastContainer />

//       <div className="min-h-screen bg-black/60">
//         <div className="container mx-auto flex min-h-screen flex-col md:flex-row px-4">

//           {/* Left Side */}
//           <section className="flex h-[40vh] md:h-screen w-full md:w-1/2 flex-col items-center justify-end pb-16 text-center">
//             <h2 className="text-5xl md:text-6xl font-bold leading-none mb-3">
//               WELCOME
//             </h2>
//             <p className="text-xl md:text-2xl text-white/85">
//               Smart support for every vehicle.
//             </p>
//           </section>

//           {/* Right Side Form */}
//           <section className="flex h-[60vh] md:h-screen w-full md:w-1/2 items-center justify-center">
//             <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 py-6 px-5 md:px-7 shadow-2xl">

//               <div className="text-left mb-5">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-1">
//                   Register Yourself!
//                 </h2>
//                 <p className="text-xs text-white/70">
//                   Create your account to manage FASTag & e-Challan in one place.
//                 </p>
//               </div>

//               {error && (
//                 <p className="mb-2 text-sm text-red-400 font-semibold">
//                   {error}
//                 </p>
//               )}

//               <form className="space-y-3" onSubmit={handleSubmit}>

//                 {/* Full Name */}
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={form.firstName}
//                     onChange={handleChange}
//                     placeholder="First Name"
//                     className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={form.lastName}
//                     onChange={handleChange}
//                     placeholder="Last Name"
//                     className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                   />
//                 </div>

//                 {/* Email */}
//                 <input
//                   type="text"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Mobile */}
//                 <input
//                   type="text"
//                   name="mobile"
//                   maxLength={10}
//                   value={form.mobile}
//                   onChange={handleChange}
//                   placeholder="Enter mobile number"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Password */}
//                 <input
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Confirm Password */}
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm password"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Profile Image */}
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="text-xs text-white"
//                 />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2.5 text-sm font-semibold text-white hover:bg-[#d15805] transition-colors disabled:opacity-50"
//                 >
//                   {loading ? "Please wait..." : "Continue"}
//                 </button>
//               </form>

//               <div className="mt-4 text-right text-xs">
//                 <Link href="/login" className="text-[#ff6f00] hover:underline">
//                   Already have an account?
//                 </Link>
//               </div>

//             </div>
//           </section>

//         </div>
//       </div>
//     </main>
//   );
// }




// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import axiosInstance from "../../../components/axiosInstance";

// export default function RegisterPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [profileImage, setProfileImage] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔥 Allow only letters in name fields
//   const handleNameInput = (e) => {
//     const value = e.target.value.replace(/[^A-Za-z]/g, "");
//     setForm({ ...form, [e.target.name]: value });
//   };

//   // 🔥 Allow only digits in mobile (first digit must be 6–9)
//   const handleMobileInput = (e) => {
//     let value = e.target.value.replace(/[^0-9]/g, "");

//     if (value.length === 1 && !/^[6-9]$/.test(value)) value = "";
//     if (value.length > 10) value = value.slice(0, 10);

//     setForm({ ...form, mobile: value });
//   };

//   // Default handle for remaining fields
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setProfileImage(e.target.files[0]);
//   };

//   // Validation
//   const validate = () => {
//     if (!form.firstName.trim()) return "First name is required";
//     if (!form.lastName.trim()) return "Last name is required";

//     const isEmail = /\S+@\S+\.\S+/.test(form.email);
//     if (!isEmail) return "Enter a valid email address";

//     const isMobile = /^[6-9][0-9]{9}$/.test(form.mobile);
//     if (!isMobile) return "Enter valid 10-digit mobile number starting with 6–9";

//     if (!form.password) return "Password is required";
//     if (form.password.length < 6) return "Password must be at least 6 characters";

//     if (form.password !== form.confirmPassword)
//       return "Passwords do not match";

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const validationErr = validate();
//     if (validationErr) {
//       setError(validationErr);
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("firstName", form.firstName);
//       formData.append("lastName", form.lastName);
//       formData.append("email", form.email);
//       formData.append("mobile", form.mobile);
//       formData.append("password", form.password);

//       if (profileImage) {
//         formData.append("profileImage", profileImage);
//       }

//       const res = await axiosInstance.post("/auth/register", formData);

//       toast.success("Registration Successful!", {
//         position: "top-center",
//       });

//       setTimeout(() => {
//         router.push("/login");
//       }, 1500);

//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//       toast.error(error.response?.data?.message || "Registration Failed", {
//         position: "top-center",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat text-white">
//       <ToastContainer />

//       <div className="min-h-screen bg-black/60">
//         <div className="container mx-auto flex min-h-screen flex-col md:flex-row px-4">

//           {/* Left Side */}
//           <section className="flex h-[40vh] md:h-screen w-full md:w-1/2 flex-col items-center justify-end pb-16 text-center">
//             <h2 className="text-5xl md:text-6xl font-bold leading-none mb-3">
//               WELCOME
//             </h2>
//             <p className="text-xl md:text-2xl text-white/85">
//               Smart support for every vehicle.
//             </p>
//           </section>

//           {/* Right Side Form */}
//           <section className="flex h-[60vh] md:h-screen w-full md:w-1/2 items-center justify-center">
//             <div className="w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 py-6 px-5 md:px-7 shadow-2xl">

//               <div className="text-left mb-5">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-1">
//                   Register Yourself!
//                 </h2>
//                 <p className="text-xs text-white/70">
//                   Create your account to manage FASTag & e-Challan in one place.
//                 </p>
//               </div>

//               {error && (
//                 <p className="mb-2 text-sm text-red-400 font-semibold">
//                   {error}
//                 </p>
//               )}

//               <form className="space-y-3" onSubmit={handleSubmit}>

//                 {/* Full Name */}
//                 <div className="grid grid-cols-2 gap-2">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={form.firstName}
//                     onChange={handleNameInput}
//                     placeholder="First Name"
//                     className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                   />
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={form.lastName}
//                     onChange={handleNameInput}
//                     placeholder="Last Name"
//                     className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                   />
//                 </div>

//                 {/* Email */}
//                 <input
//                   type="text"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   placeholder="Enter email"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Mobile */}
//                 <input
//                   type="text"
//                   name="mobile"
//                   maxLength={10}
//                   value={form.mobile}
//                   onChange={handleMobileInput}
//                   placeholder="Enter mobile number"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Password */}
//                 <input
//                   type="password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   placeholder="Enter password"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Confirm Password */}
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={form.confirmPassword}
//                   onChange={handleChange}
//                   placeholder="Confirm password"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white"
//                 />

//                 {/* Profile Image */}
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   className="text-xs text-white"
//                 />

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2.5 text-sm font-semibold text-white hover:bg-[#d15805] transition-colors disabled:opacity-50"
//                 >
//                   {loading ? "Please wait..." : "Continue"}
//                 </button>
//               </form>

//               <div className="mt-4 text-right text-xs">
//                 <Link href="/login" className="text-[#ff6f00] hover:underline">
//                   Already have an account?
//                 </Link>
//               </div>

//             </div>
//           </section>

//         </div>
//       </div>
//     </main>
//   );
// }
