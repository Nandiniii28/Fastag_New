// "use client";
// import { useState } from "react";
// import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// export default function LoginPage() {
//      const [show, setShow] = useState(false);
//     return (
//         <main className="min-h-screen bg-linear-to-br from-[#013b70] via-slate-900 to-black text-white bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat" >
//             <div className="container mx-auto flex min-h-screen flex-col md:flex-row bg-black/60">
//                 {/* Left side */}
//                 <section className="flex h-[50vh] w-full flex-col items-center justify-end pb-20 text-center md:h-screen md:w-1/2">
//                     <h2 className="text-5xl md:text-6xl font-bold leading-none mb-3">
//                         WELCOME
//                     </h2>
//                     <p className="text-xl md:text-2xl text-white/80">
//                         Support that adapts to you.
//                     </p>
//                 </section>

//                 {/* Right side */}
//                 <section className="flex h-[50vh] w-full items-center justify-center px-4 md:h-screen md:w-1/2">
//                     <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl">
//                         <div className="mb-4 text-left">
//                             <h2 className="text-2xl md:text-3xl font-bold">Sign In</h2>
//                         </div>

//                         <form className="space-y-4">
//                             {/* Phone / Email */}
//                             <div>
//                                 <label className="mb-1 block text-sm font-semibold">
//                                     Your Phone no. / Email
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter your email or phone number"
//                                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                                 />
//                             </div>

//                             {/* Password */}
//                             <div className="relative">
//                                 <label className="mb-1 block text-sm font-semibold">Password</label>
//                                 <input
//                                     type={show ? "text" : "password"}
//                                     id="password"
//                                     placeholder="Enter your password"
//                                     className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 pr-10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShow((prev) => !prev)}
//                                     className="absolute right-3 top-10 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
//                                 >
//                                     {show ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
//                                 </button>
//                             </div>

//                             {/* Submit */}
//                             <button
//                                 type="submit"
//                                 className="mt-2 w-full rounded-xl bg-[#ff6f00] cursor-pointer py-2 text-sm font-semibold text-white hover:brightness-110 transition-colors"
//                             >
//                                 Continue
//                             </button>
//                         </form>

//                         {/* Terms */}
//                         <p className="mt-4 text-center text-xs text-white/70">
//                             By continuing you agree to our{" "}
//                             <a href="#" className="underline underline-offset-2">
//                                 privacy policy
//                             </a>{" "}
//                             and{" "}
//                             <a href="#" className="underline underline-offset-2">
//                                 terms of use
//                             </a>
//                         </p>

//                         {/* Register link */}
//                         <div className="mt-3 text-right text-sm">
//                             <a href="/register" className="text-[#1a73e8] hover:underline">
//                                 Register
//                             </a>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         </main>
//     );
// }




"use client";

import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axiosInstance from "./axiosInstance";

export default function LoginPage() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    emailOrMobile: "",
    password: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/")
    }
  },[])

  // Handle input
  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    if (!loginForm.emailOrMobile.trim())
      return "Email or mobile number is required";

    // Email format check
    const isEmail = /\S+@\S+\.\S+/.test(loginForm.emailOrMobile);

    // Mobile format check
    const isMobile = /^[0-9]{10}$/.test(loginForm.emailOrMobile);

    if (!isEmail && !isMobile)
      return "Enter valid email";

    if (!loginForm.password.trim()) return "Password is required";

    return null;
  };

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }

    try {
      setLoading(true);

      let payload = {};

      // Auto detect email/mobile
      if (/\S+@\S+\.\S+/.test(loginForm.emailOrMobile)) {
        payload.email = loginForm.emailOrMobile;
      } else {
        payload.email = loginForm.emailOrMobile; // backend only accepts email in your example
      }

      payload.password = loginForm.password;

      const res = await axiosInstance.post("/auth/login", payload);
      toast.success("Login Successful!");
      localStorage.setItem("token", res.data?.data?.token);
      localStorage.setItem("user", JSON.stringify(res.data.data));

      if (res.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#013b70] via-slate-900 to-black text-white bg-[url('/Home/login.jpg')] bg-cover bg-center bg-no-repeat">

      {/* Toast Container */}
      <ToastContainer position="top-center" />

      <div className="mx-auto flex min-h-screen flex-col md:flex-row bg-black/60">

        {/* Left side */}
        <section className="flex h-[50vh] w-full flex-col items-center justify-end pb-20 text-center md:h-screen md:w-1/2">
          <h2 className="text-5xl md:text-6xl font-bold leading-none mb-3">
            WELCOME
          </h2>
          <p className="text-xl md:text-2xl text-white/80">
            Support that adapts to you.
          </p>
        </section>

        {/* Right side */}
        <section className="flex h-[50vh] w-full items-center justify-center px-4 md:h-screen md:w-1/2">
          <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl">

            <div className="mb-4 text-left">
              <h2 className="text-2xl md:text-3xl font-bold">Sign In</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* Email or Phone */}
              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="emailOrMobile"
                  value={loginForm.emailOrMobile}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="mb-1 block text-sm font-semibold">
                  OTP
                </label>
                <input
                  type="number"
                  name="number"
                  // value={loginForm.password}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#fdc700]"
                />

                {/* <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-10 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {show ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                </button> */}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-[#ff6f00] py-2 text-sm font-semibold text-white transition-colors hover:brightness-110 disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </form>

          </div>
        </section>
      </div>
    </main>
  );
}
