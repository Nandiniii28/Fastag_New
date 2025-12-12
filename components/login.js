
// "use client";

// import { useEffect, useState } from "react";
// import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import axiosInstance from "./axiosInstance";

// export default function LoginPage() {
//   const router = useRouter();

//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [loginForm, setLoginForm] = useState({
//     emailOrMobile: "",
//     password: "",
//   });
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       router.push("/")
//     }
//   },[])

//   // Handle input
//   const handleChange = (e) => {
//     setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
//   };

//   // Validation
//   const validate = () => {
//     if (!loginForm.emailOrMobile.trim())
//       return "Email or mobile number is required";

//     // Email format check
//     const isEmail = /\S+@\S+\.\S+/.test(loginForm.emailOrMobile);

//     // Mobile format check
//     const isMobile = /^[0-9]{10}$/.test(loginForm.emailOrMobile);

//     if (!isEmail && !isMobile)
//       return "Enter valid email";

//     if (!loginForm.password.trim()) return "Password is required";

//     return null;
//   };

//   // Submit Login
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const err = validate();
//     if (err) {
//       toast.error(err);
//       return;
//     }

//     try {
//       setLoading(true);

//       let payload = {};

//       // Auto detect email/mobile
//       if (/\S+@\S+\.\S+/.test(loginForm.emailOrMobile)) {
//         payload.email = loginForm.emailOrMobile;
//       } else {
//         payload.email = loginForm.emailOrMobile; // backend only accepts email in your example
//       }

//       payload.password = loginForm.password;

//       const res = await axiosInstance.post("/auth/login", payload);
//       toast.success("Login Successful!");
//       localStorage.setItem("token", res.data?.data?.token);
//       localStorage.setItem("user", JSON.stringify(res.data.data));

//       if (res.data.success) {
//         setTimeout(() => {
//           window.location.reload();
//         }, 1000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-linear-to-br from-[#013b70] via-slate-900 to-black text-white bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat">

//       {/* Toast Container */}
//       <ToastContainer position="top-center" />

//       <div className="mx-auto flex min-h-screen flex-col md:flex-row bg-black/60">

//         {/* Left side */}
//         <section className="flex h-[50vh] w-full flex-col items-center justify-end pb-20 text-center md:h-screen md:w-1/2">
//           <h2 className="text-5xl md:text-6xl font-bold leading-none mb-3">
//             WELCOME
//           </h2>
//           <p className="text-xl md:text-2xl text-white/80">
//             Support that adapts to you.
//           </p>
//         </section>

//         {/* Right side */}
//         <section className="flex h-[50vh] w-full items-center justify-center px-4 md:h-screen md:w-1/2">
//           <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl">

//             <div className="mb-4 text-left">
//               <h2 className="text-2xl md:text-3xl font-bold">Sign In</h2>
//             </div>

//             <form className="space-y-4" onSubmit={handleSubmit}>

//               {/* Email or Phone */}
//               <div>
//                 <label className="mb-1 block text-sm font-semibold">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   name="emailOrMobile"
//                   value={loginForm.emailOrMobile}
//                   onChange={handleChange}
//                   placeholder="Enter your phone number"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                 />
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <label className="mb-1 block text-sm font-semibold">
//                   OTP
//                 </label>
//                 <input
//                   type="number"
//                   name="number"
//                   // value={loginForm.password}
//                   onChange={handleChange}
//                   placeholder="Enter OTP"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                 />

//                 {/* <button
//                   type="button"
//                   onClick={() => setShow(!show)}
//                   className="absolute right-3 top-10 -translate-y-1/2 text-white/70 hover:text-white"
//                 >
//                   {show ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
//                 </button> */}
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2 text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:opacity-50"
//               >
//                 {loading ? "Please wait..." : "Continue"}
//               </button>
//             </form>

//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import axiosInstance from "./axiosInstance";

// export default function LoginPage() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);

//   const [form, setForm] = useState({
//     mobile: "",
//     otp: "",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) router.push("/");
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // -------------------------------
//   // ✔ Step 1: Send OTP
//   // -------------------------------
//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     if (!/^[0-9]{10}$/.test(form.mobile)) {
//       toast.error("Enter valid 10-digit mobile number");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axiosInstance.post("/auth/send-otp", {
//         mobile: form.mobile,
//       });

//       if (res.data.success) {
//         toast.success("OTP sent successfully");
//         setOtpSent(true);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------
//   // ✔ Step 2: Verify OTP and Login
//   // -------------------------------
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     if (!form.otp.trim()) {
//       toast.error("OTP is required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axiosInstance.post("/auth/verify-otp", {
//         mobile: form.mobile,
//         otp: form.otp,
//       });

//       if (res.data.success) {
//         toast.success("Login Successful!");

//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         setTimeout(() => {
//           router.push("/");
//         }, 800);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-linear-to-br from-[#013b70] via-slate-900 to-black text-white bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat">

//       <ToastContainer position="top-center" />

//       <div className="mx-auto flex min-h-screen flex-col md:flex-row bg-black/60">

//         {/* Left */}
//         <section className="flex h-[50vh] w-full flex-col items-center justify-end pb-20 text-center md:h-screen md:w-1/2">
//           <h2 className="text-5xl md:text-6xl font-bold mb-3">
//             WELCOME
//           </h2>
//           <p className="text-xl md:text-2xl text-white/80">
//             Support that adapts to you.
//           </p>
//         </section>

//         {/* Right */}
//         <section className="flex h-[50vh] w-full items-center justify-center px-4 md:h-screen md:w-1/2">
//           <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl">

//             <div className="mb-4 text-left">
//               <h2 className="text-2xl md:text-3xl font-bold">
//                 Sign In
//               </h2>
//             </div>

//             {/* FORM */}
//             <form className="space-y-4">

//               {/* Mobile Input */}
//               <div>
//                 <label className="block text-sm font-semibold">Phone Number</label>
//                 <input
//                   type="text"
//                   name="mobile"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                   className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#fdc700]"
//                   disabled={otpSent}
//                 />
//               </div>

//               {/* OTP Input */}
//               {otpSent && (
//                 <div>
//                   <label className="block text-sm font-semibold">OTP</label>
//                   <input
//                     type="number"
//                     name="otp"
//                     value={form.otp}
//                     onChange={handleChange}
//                     placeholder="Enter OTP"
//                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#fdc700]"
//                   />
//                 </div>
//               )}

//               {/* Button */}
//               {!otpSent ? (
//                 <button
//                   onClick={handleSendOtp}
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-50"
//                 >
//                   {loading ? "Sending OTP..." : "Send OTP"}
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleVerifyOtp}
//                   disabled={loading}
//                   className="mt-2 w-full rounded-xl bg-green-600 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-50"
//                 >
//                   {loading ? "Verifying..." : "Verify & Login"}
//                 </button>
//               )}

//             </form>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axiosInstance from "./axiosInstance";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [form, setForm] = useState({
    mobile: "",
    otp: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.push("/");
  }, []);

  // Input Limitations
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✔ Mobile input — only digits & cannot start with 0-5
    if (name === "mobile") {
      if (!/^[0-9]*$/.test(value)) return; // only numbers
      if (value.length > 10) return;      // max 10 digits
      if (value.length === 1 && !/[6-9]/.test(value)) return; // cannot start 0–5
    }

    // ✔ OTP input — only digits allowed
    if (name === "otp") {
      if (!/^[0-9]*$/.test(value)) return;
      if (value.length > 6) return;
    }

    setForm({ ...form, [name]: value });
  };

  // -----------------------------------
  // ✔ Step 1: Send OTP
  // -----------------------------------
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/^[6-9][0-9]{9}$/.test(form.mobile)) {
      toast.error("Enter a valid 10-digit mobile number starting with 6-9");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/send-otp", {
        mobile: form.mobile,
      });

      if (res.data.success) {
        toast.success("OTP sent successfully");
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------
  // ✔ Step 2: Verify OTP & Login
  // -----------------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!form.otp.trim()) {
      toast.error("OTP is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/verify-otp", {
        mobile: form.mobile,
        otp: form.otp,
      });

      if (res.data.success) {
        toast.success("Login Successful!");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("reloadHome", "true");

        setTimeout(() => {
          router.push("/");
        }, 800);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#013b70] via-slate-900 to-black text-white bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat">

      <ToastContainer position="top-center" />

      <div className="mx-auto flex min-h-screen flex-col md:flex-row bg-black/60">

        {/* Left */}
        <section className="flex h-[50vh] w-full flex-col items-center justify-end pb-20 text-center md:h-screen md:w-1/2">
          <h2 className="text-5xl md:text-6xl font-bold mb-3">
            WELCOME
          </h2>
          <p className="text-xl md:text-2xl text-white/80">
            Support that adapts to you.
          </p>
        </section>

        {/* Right */}
        <section className="flex h-[50vh] w-full items-center justify-center px-4 md:h-screen md:w-1/2">
          <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl">

            <div className="mb-4 text-left">
              <h2 className="text-2xl md:text-3xl font-bold">
                Sign In
              </h2>
            </div>

            {/* FORM */}
            <form className="space-y-4">

              {/* Mobile Input */}
              <div>
                <label className="block text-sm font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#fdc700]"
                  disabled={otpSent}
                />
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div>
                  <label className="block text-sm font-semibold">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#fdc700]"
                  />
                </div>
              )}

              {/* Button */}
              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="mt-2 w-full rounded-xl bg-green-600 py-2 text-sm font-semibold hover:brightness-110 disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>
              )}

            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

