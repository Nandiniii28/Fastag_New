"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// Swapped to Ionicon style for a sleeker look
import { IoWalletOutline, IoMenu, IoClose, IoChevronDown } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { useUser } from "@/app/user-profile/context";
import axiosInstance from "../axiosInstance";

export default function Header() {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [email, setemail] = useState("");
  const [userid, setuserid] = useState("");
  const [walletBalance, setwalletBalance] = useState(0);

  const pathname = usePathname();

  // Unified fetch and setup
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (user) {
      setemail(user.email || "");
      setuserid(user._id || user.id || "");
      // Use toLocaleString for clean, currency-formatted balance display
      setwalletBalance(user?.wallet?.balance || 0);
    }
  }, [user]);

  const handleAddFunds = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) < 100) {
      Swal.fire({
        icon: "warning",
        title: "Minimum Amount ₹100",
        text: "Please enter an amount of ₹100 or more.",
      });
      return;
    }

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to continue.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        email: email,
        amount: Number(amount),
        userId: userid
      };

      const res = await axiosInstance.post("/topup/wallet", payload);
      const { data } = res;

      if (!data.success) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: data.message || "Unable to start payment process.",
        });
        return;
      }

      Swal.fire({
        icon: "info",
        title: "Redirecting...",
        text: "Please wait, redirecting to payment gateway.",
        timer: 2000,
        showConfirmButton: false,
      });

      if (data?.ress?.data?.redirectURL) {
        window.location.href = data?.ress?.data?.redirectURL;
      }

      setShowAddFunds(false);
      setAmount("");

    } catch (err) {
      console.error("Topup Error:", err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Unable to process payment right now.",
      });

    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'FASTag', href: '/fastag' },
    { name: 'E-Challan', href: '/echallan' },
  ];

  // Professional color palette: Primary Blue, Accent Gold, Clean Text
  const primaryColor = 'text-blue-800';
  const accentColor = 'text-yellow-500';

  const activeLinkClass = `font-semibold ${primaryColor}`;
  const baseLinkClass = "text-gray-700 hover:text-blue-800 transition-colors font-medium text-base";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md"
      >
        <div className="container mx-auto px-6 lg:px-12 py-2 flex md:block justify-between">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={"/fastpaysave.png"}
                alt="fastpaysave"
                width={140}
                height={30}
                className="w-28 h-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${baseLinkClass} ${pathname === link.href ? activeLinkClass : ''}`}
                >
                  {link.name}
                </Link>
              ))}

              {token &&
                <Link
                  href="/user-profile"
                  className={`${baseLinkClass} ${pathname.startsWith('/user-profile') ? activeLinkClass : ''}`}
                >
                  Profile
                </Link>
              }

              {!token && (
                <div className="space-x-4 ml-4 flex items-center">
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-full text-blue-800 border border-blue-100 hover:bg-blue-50 transition-all font-semibold text-sm"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>


          </div>
          {/* Wallet + Mobile button */}

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden  absolute right-4 top-24 w-[90%] mt-4 bg-white border border-gray-200 rounded-xl p-4 shadow-md">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-gray-800 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 ${pathname === link.href ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {token &&
                  <Link
                    href="/user-profile"
                    className={`text-gray-800 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 ${pathname.startsWith('/user-profile') ? 'bg-blue-50 text-blue-700 font-semibold' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                }

                {!token && (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-800 font-medium py-2 px-3 rounded-lg hover:bg-blue-50"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </Link>
                    {/* <Link
                      href="/register"
                      className="text-gray-800 font-medium py-2 px-3 rounded-lg hover:bg-blue-50"
                      onClick={() => setOpen(false)}
                    >
                      Register
                    </Link> */}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-[74px] sm:h-[76px]" />

      {showAddFunds && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-2xl p-8 relative">
            <button
              onClick={() => setShowAddFunds(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              Top Up Wallet
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Securely add funds for instant toll and e-Challan payments.
            </p>

            <form
              className="space-y-6"
              onSubmit={handleAddFunds}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg">₹</span>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (!/^\d*$/.test(val)) return;
                      if (val.length > 6) return;
                      setAmount(val);
                    }}
                    placeholder="Minimum ₹100"
                    className="w-full rounded-2xl bg-gray-50 border border-gray-200 pl-12 pr-4 py-3 text-lg font-semibold text-blue-800 placeholder:text-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-200 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Payment Method
                </label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full rounded-2xl bg-white border border-gray-200 px-4 py-3 text-base text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <option value="upi" className="bg-white">
                    UPI (Google Pay, PhonePe, etc.)
                  </option>
                  <option value="card" className="bg-white">
                    Debit / Credit Card
                  </option>
                  <option value="netbanking" className="bg-white">
                    Net Banking
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading || !amount || Number(amount) < 100}
                className="w-full mt-4 rounded-full bg-blue-700 text-white text-lg font-semibold py-3 shadow-lg hover:bg-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {
                  loading ? "Initiating Payment..." :
                    `Proceed to Pay ₹${amount || '0'}`
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
