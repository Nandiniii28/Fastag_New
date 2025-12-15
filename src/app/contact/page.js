// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { MdClose, MdEmail } from "react-icons/md";
// import { VscWorkspaceTrusted } from "react-icons/vsc";
// import { FaLocationDot } from "react-icons/fa6";
// import { IoCall } from "react-icons/io5";

// // Thank You Modal Component
// const ThankYouModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
//       <div className="relative bg-[#eaedee] rounded-2xl max-w-md w-full p-8 animate-scaleIn">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//         >
//           <MdClose size={24} />
//         </button>

//         {/* Content */}
//         <div className="text-center">
//           <div className="bg-[#eaedee] rounded-full flex items-center justify-center mx-auto mb-6">
//             <img src="/Image/tq.gif" alt="Thank you animation" className="h-50" />
//           </div>

//           <h3 className="text-2xl font-bold text-gray-800 mb-2">
//             Message Sent Successfully!
//           </h3>
//           <p className="text-gray-600 mb-6 text-[15px] font-[400]">
//             Thank you for reaching out to us. Our team will get back to you within 24 hours.
//           </p>

//           <div className="bg-[#115D8E]/10 rounded-lg p-4 mb-6 flex items-start">
//             <VscWorkspaceTrusted className="text-[#115D8E] mt-0.5 mr-3 flex-shrink-0" />
//             <p className="text-[#2671a3] text-sm">
//               In the meantime, check out our services page to learn more about what we offer.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     message: "",
//     agreedToTerms: false,
//   });

//   const [errors, setErrors] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     message: "",
//     agreedToTerms: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showThankYouModal, setShowThankYouModal] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateName = (value) => {
//     if (!value) return "Please fill this field";
//     if (!/^[A-Za-z\s]+$/.test(value)) return "Only letters are allowed";
//     return "";
//   };

//   const validateMobile = (value) => {
//     if (!value) return "Please fill this field";
//     if (!/^\d+$/.test(value)) return "Only numbers are allowed";
//     if (value.length !== 10) return "Must be 10 digits";
//     if (!/^[6-9]/.test(value)) return "Mobile number must start with 7, 8, or 9";
//     return "";
//   };

//   const validate = (data) => {
//     const newErrors = {
//       fullName: validateName(data.fullName),
//       email: "",
//       mobile: validateMobile(data.mobile),
//       message: data.message ? "" : "Please fill this field",
//       agreedToTerms: data.agreedToTerms ? "" : "You must agree to the terms",
//     };

//     if (!data.email) newErrors.email = "Please fill this field";
//     else if (!/^\S+@\S+\.\S+$/.test(data.email))
//       newErrors.email = "Enter a valid email";

//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const newErrors = validate(formData);
//     setErrors(newErrors);

//     const hasErrors = Object.values(newErrors).some((v) => v !== "");
//     if (hasErrors) {
//       setIsSubmitting(false);
//       return;
//     }

//     // Simulate success without API
//     setTimeout(() => {
//       setShowThankYouModal(true);
//       setFormData({
//         fullName: "",
//         email: "",
//         mobile: "",
//         message: "",
//         agreedToTerms: false,
//       });
//       setIsSubmitting(false);
//     }, 500);
//   };

//   return (
//     <>
//       <ThankYouModal
//         isOpen={showThankYouModal}
//         onClose={() => setShowThankYouModal(false)}
//       />

//       <section className="px-4 sm:px-14 ">
//         <section className="py-12">
//           <div className="px-4 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 sm:px-6 lg:px-8 ">


//             {/* Contact Info */}
//             <div className="w-full lg:max-w-2xl text-gray-800 mt-7 lg:mt-0">
//               <h3 className="text-3xl md:text-4xl font-bold text-[#115D8E] mb-4 leading-tight">
//                 Start the conversation today
//               </h3>
//               <p className="text-gray-600 mb-5 text-lg md:text-xl leading-relaxed">
//                 We&apos;re just a message, call, or click away.
//               </p>

//               <div className="space-y-1">
//                 {/* Email */}
//                 <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
//                   <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
//                     <MdEmail size={23} color={"#115D8E"} />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Email</div>
//                     <div className="text-gray-600 text-base md:text-lg">email@company.com</div>
//                   </div>
//                 </div>

//                 {/* Call */}
//                 <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
//                   <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
//                     <IoCall size={23} color={"#115D8E"} />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Call us</div>
//                     <div className="text-gray-600 text-base md:text-lg">2545682559</div>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
//                   <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
//                     <FaLocationDot size={23} color={"#115D8E"} />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Visit us</div>
//                     <div className="text-gray-600 text-base md:text-lg leading-relaxed">
//                       Office No. 101/2, 'Vakratunda Corporate Park Premises Co-operative Society Limited, Off. Aarey Road, Goregaon (East), Mumbai - 400063
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative h-[40vh] w-full">
//                 <Image
//                   src="/user/contact.webp"
//                   alt="Contact"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//             {/* Form Card */}
//             <div className="w-full lg:max-w-2xl bg-white rounded-3xl  border border-[#ff6f00]/30 p-10 md:px-12 transform transition-all duration-500 hover:scale-[1.02] ">
//               <div className=" mb-6">
//                 <h2 className="text-3xl font-bold text-[#115D8E] mb-2">
//                   Contact Us
//                 </h2>
//                 <div className="w-16 h-1 bg-linear-to-r from-[#115D8E] to-[#ff6f00] rounded-full"></div>
//               </div>

//               <form className="space-y-2" onSubmit={handleSubmit} noValidate>
//                 {/* Full Name */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     placeholder="Enter your full name"
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                   />
//                   {errors.fullName && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.fullName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Business Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your business email"
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Mobile */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     placeholder="Enter your mobile number"
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     inputMode="numeric"
//                     maxLength={10}
//                   />
//                   {errors.mobile && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.mobile}
//                     </p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     placeholder="Tell us about your project or inquiry..."
//                     rows={4}
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.message}
//                     onChange={handleChange}
//                   />
//                   {errors.message && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Terms */}
//                 <div className="flex items-start gap-3 text-sm text-gray-600 p-4 bg-[#ff6f0050] rounded-xl">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     name="agreedToTerms"
//                     className="mt-1 accent-[#ff6f00] w-5 h-5 rounded focus:ring-2 focus:ring-[#ff6f00]/30"
//                     checked={formData.agreedToTerms}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="terms" className="cursor-pointer leading-relaxed">
//                     I agree to all{" "}
//                     <Link
//                       href="/termsofuse"
//                       className="text-[#115D8E] underline hover:text-[#ff6f00] transition-colors duration-200"
//                     >
//                       terms and conditions
//                     </Link>
//                     .
//                   </label>
//                 </div>
//                 {errors.agreedToTerms && (
//                   <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                     ⚠️ {errors.agreedToTerms}
//                   </p>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#115D8E] to-[#ff6f00] shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Submitting..." : "Send Message"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </section>
//       </section>

//     <div className="px-5">
//         <div className="my-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//         <div className="aspect-[16/9] relative h-[400px] w-full">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3561.264701407029!2d75.869785!3d26.799699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ3JzU4LjkiTiA3NcKwNTInMTEuMiJF!5e0!3m2!1sen!2sin!4v1724749044503!5m2!1sen!2sin"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Company Location"
//           ></iframe>
//         </div>
//       </div>
//       </div>


//       <style jsx>{`
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//         .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
//       `}</style>
//     </>
//   );
// }






// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { MdClose, MdEmail } from "react-icons/md";
// import { VscWorkspaceTrusted } from "react-icons/vsc";
// import { FaLocationDot } from "react-icons/fa6";
// import { IoCall } from "react-icons/io5";
// import axiosInstance from "../../../components/axiosInstance"; // Adjust path as needed

// // Thank You Modal Component
// const ThankYouModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
//       <div className="relative bg-[#eaedee] rounded-2xl max-w-md w-full p-8 animate-scaleIn">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//         >
//           <MdClose size={24} />
//         </button>

//         {/* Content */}
//         <div className="text-center">
//           {/* <div className="bg-[#eaedee] rounded-full flex items-center justify-center mx-auto mb-6">
//             <img src="/Image/tq.gif" alt="Thank you animation" className="h-50" />
//           </div> */}

//           <h3 className="text-2xl font-bold text-gray-800 mb-2">
//             Message Sent Successfully!
//           </h3>
//           <p className="text-gray-600 mb-6 text-[15px] font-[400]">
//             Thank you for reaching out to us. Our team will get back to you within 24 hours.
//           </p>

//           <div className="bg-[#115D8E]/10 rounded-lg p-4 mb-6 flex items-start">
//             <VscWorkspaceTrusted className="text-[#115D8E] mt-0.5 mr-3 flex-shrink-0" />
//             <p className="text-[#2671a3] text-sm">
//               In the meantime, check out our services page to learn more about what we offer.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     message: "",
//     agreedToTerms: false,
//   });

//   const [errors, setErrors] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     message: "",
//     agreedToTerms: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showThankYouModal, setShowThankYouModal] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     // Special handling for mobile input to prevent non-numeric characters
//     if (name === "mobile") {
//       // Allow only numbers and limit to 10 digits
//       const numericValue = value.replace(/\D/g, '').slice(0, 10);
//       setFormData((prev) => ({
//         ...prev,
//         [name]: numericValue,
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }

//     // Clear error for this field when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }

//     // Clear API error when user makes any change
//     if (apiError) {
//       setApiError("");
//     }
//   };

//   const validateName = (value) => {
//     if (!value.trim()) return "Please fill this field";
//     if (!/^[A-Za-z\s]+$/.test(value)) return "Only letters and spaces are allowed";
//     if (value.trim().length < 2) return "Name must be at least 2 characters";
//     return "";
//   };

//   const validateEmail = (value) => {
//     if (!value.trim()) return "Please fill this field";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(value)) return "Please enter a valid email address";
//     return "";
//   };

//   const validateMobile = (value) => {
//     if (!value.trim()) return "Please fill this field";
//     if (!/^\d+$/.test(value)) return "Only numbers are allowed";
//     if (value.length !== 10) return "Mobile number must be 10 digits";
//     if (!/^[6-9]/.test(value)) return "Mobile number must start with 6, 7, 8, or 9";
//     return "";
//   };

//   const validateMessage = (value) => {
//     if (!value.trim()) return "Please fill this field";
//     if (value.trim().length < 10) return "Message must be at least 10 characters";
//     return "";
//   };

//   const validate = (data) => {
//     const newErrors = {
//       fullName: validateName(data.fullName),
//       email: validateEmail(data.email),
//       mobile: validateMobile(data.mobile),
//       message: validateMessage(data.message),
//       agreedToTerms: data.agreedToTerms ? "" : "You must agree to the terms",
//     };

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setApiError("");

//     // Validate all fields
//     const newErrors = validate(formData);
//     setErrors(newErrors);

//     // Check if there are any errors
//     const hasErrors = Object.values(newErrors).some((v) => v !== "");
//     if (hasErrors) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Make API call
//       const response = await axiosInstance.post("/contact/create", {
//         fullName: formData.fullName.trim(),
//         email: formData.email.trim(),
//         mobile: formData.mobile.trim(),
//         message: formData.message.trim(),
//       });

//       if (response.data.success) {
//         // Show success modal
//         setShowThankYouModal(true);

//         // Reset form
//         setFormData({
//           fullName: "",
//           email: "",
//           mobile: "",
//           message: "",
//           agreedToTerms: false,
//         });
//       } else {
//         throw new Error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);

//       // Handle specific error cases
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         const status = error.response.status;

//         if (status === 400) {
//           // Validation errors from server
//           const serverErrors = error.response.data?.errors;
//           if (serverErrors) {
//             const updatedErrors = { ...errors };
//             Object.keys(serverErrors).forEach((key) => {
//               if (updatedErrors.hasOwnProperty(key)) {
//                 updatedErrors[key] = serverErrors[key];
//               }
//             });
//             setErrors(updatedErrors);
//           } else {
//             setApiError(error.response.data?.message || "Please check your input and try again.");
//           }
//         } else if (status === 409) {
//           setApiError("This email or mobile number is already registered.");
//         } else if (status === 500) {
//           setApiError("Server error. Please try again later.");
//         } else {
//           setApiError("An error occurred. Please try again.");
//         }
//       } else if (error.request) {
//         // The request was made but no response was received
//         setApiError("Network error. Please check your connection and try again.");
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setApiError("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <ThankYouModal
//         isOpen={showThankYouModal}
//         onClose={() => setShowThankYouModal(false)}
//       />

//       <section className="px-4 sm:px-14 ">
//         <section className="py-12">
//           <div className="px-4 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 sm:px-6 lg:px-8 ">


//             {/* Contact Info */}
//             <div className="w-full lg:max-w-2xl text-gray-800 mt-7 lg:mt-0">
//               <h3 className="text-3xl md:text-4xl font-bold text-[#115D8E] mb-4 leading-tight">
//                 Start the conversation today
//               </h3>
//               <p className="text-gray-600 mb-5 text-lg md:text-xl leading-relaxed">
//                 We&apos;re just a message, call, or click away.
//               </p>

//               <div className="space-y-1">
//                 {/* Email */}
//                 <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
//                   <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
//                     <MdEmail size={23} color={"#115D8E"} />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Email</div>
//                     <div className="text-gray-600 text-base md:text-lg">email@company.com</div>
//                   </div>
//                 </div>

//                 {/* Call */}
//                 <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
//                   <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
//                     <IoCall size={23} color={"#115D8E"} />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Call us</div>
//                     <div className="text-gray-600 text-base md:text-lg">2545682559</div>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
//                   <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
//                     <FaLocationDot size={23} color={"#115D8E"} />
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Visit us</div>
//                     <div className="text-gray-600 text-base md:text-lg leading-relaxed">
//                       Office No. 101/2, 'Vakratunda Corporate Park Premises Co-operative Society Limited, Off. Aarey Road, Goregaon (East), Mumbai - 400063
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="relative h-[40vh] w-full">
//                 <Image
//                   src="/user/contact.webp"
//                   alt="Contact"
//                   fill
//                   className="object-contain"
//                 />
//               </div>
//             </div>
//             {/* Form Card */}
//             <div className="w-full lg:max-w-2xl bg-white rounded-3xl  border border-[#ff6f00]/30 p-10 md:px-12 transform transition-all duration-500 hover:scale-[1.02] ">
//               <div className=" mb-6">
//                 <h2 className="text-3xl font-bold text-[#115D8E] mb-2">
//                   Contact Us
//                 </h2>
//                 <div className="w-16 h-1 bg-linear-to-r from-[#115D8E] to-[#ff6f00] rounded-full"></div>
//               </div>

//               {/* API Error Message */}
//               {apiError && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
//                   <p className="text-red-600 text-sm flex items-center gap-2">
//                     <span className="font-semibold">Error:</span> {apiError}
//                   </p>
//                 </div>
//               )}

//               <form className="space-y-2" onSubmit={handleSubmit} noValidate>
//                 {/* Full Name */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     name="fullName"
//                     placeholder="Enter your full name"
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     disabled={isSubmitting}
//                   />
//                   {errors.fullName && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.fullName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Business Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your business email"
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.email}
//                     onChange={handleChange}
//                     disabled={isSubmitting}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 {/* Mobile */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Mobile Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     placeholder="Enter your mobile number"
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     inputMode="numeric"
//                     maxLength={10}
//                     pattern="[0-9]*"
//                     disabled={isSubmitting}
//                   />
//                   {errors.mobile && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.mobile}
//                     </p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div className="space-y-1">
//                   <label className="block text-sm font-semibold text-[#115D8E] mb-2">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     placeholder="Tell us about your project or inquiry..."
//                     rows={4}
//                     className="w-full border-2 border-[#115D8E]/50 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[#115D8E] focus:ring-2 focus:ring-[#115D8E]/20 transition-all duration-300 shadow-sm hover:shadow-md"
//                     value={formData.message}
//                     onChange={handleChange}
//                     disabled={isSubmitting}
//                   />
//                   {errors.message && (
//                     <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                       ⚠️ {errors.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Terms */}
//                 <div className="flex items-start gap-3 text-sm text-gray-600 p-4 bg-[#ff6f0050] rounded-xl">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     name="agreedToTerms"
//                     className="mt-1 accent-[#ff6f00] w-5 h-5 rounded focus:ring-2 focus:ring-[#ff6f00]/30"
//                     checked={formData.agreedToTerms}
//                     onChange={handleChange}
//                     disabled={isSubmitting}
//                   />
//                   <label htmlFor="terms" className="cursor-pointer leading-relaxed">
//                     I agree to all{" "}
//                     <Link
//                       href="/termsofuse"
//                       className="text-[#115D8E] underline hover:text-[#ff6f00] transition-colors duration-200"
//                     >
//                       terms and conditions
//                     </Link>
//                     .
//                   </label>
//                 </div>
//                 {errors.agreedToTerms && (
//                   <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
//                     ⚠️ {errors.agreedToTerms}
//                   </p>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#115D8E] to-[#ff6f00] shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center gap-2">
//                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </section>
//       </section>

//     <div className="px-5">
//         <div className="my-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//         <div className="aspect-[16/9] relative h-[400px] w-full">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3561.264701407029!2d75.869785!3d26.799699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ3JzU4LjkiTiA3NcKwNTInMTEuMiJF!5e0!3m2!1sen!2sin!4v1724749044503!5m2!1sen!2sin"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Company Location"
//           ></iframe>
//         </div>
//       </div>
//       </div>


//       <style jsx>{`
//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
//         .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
//         .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
//       `}</style>
//     </>
//   );
// }





"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdClose, MdEmail } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import axiosInstance from "../../../components/axiosInstance"; // Adjust path as needed

// Thank You Modal Component
const ThankYouModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#eaedee] rounded-2xl max-w-md w-full p-8 animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <MdClose size={24} />
        </button>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-6 text-[15px] font-[400]">
            Thank you for reaching out to us. Our team will get back to you within 24 hours.
          </p>

          <div className="bg-[#115D8E]/10 rounded-lg p-4 mb-6 flex items-start">
            <VscWorkspaceTrusted className="text-[#115D8E] mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-[#2671a3] text-sm">
              In the meantime, check out our services page to learn more about what we offer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    message: "",
    agreedToTerms: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    mobile: false,
    message: false,
    agreedToTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [apiError, setApiError] = useState("");

  // Handle input changes with proper validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let processedValue = value;

    // Special handling for name field - allow only letters and spaces
    if (name === "fullName") {
      // Remove any numbers or special characters (keep only letters and spaces)
      processedValue = value.replace(/[^a-zA-Z\s]/g, '');
      // Remove multiple consecutive spaces
      processedValue = processedValue.replace(/\s+/g, ' ');
    }

    // Special handling for mobile field - allow only numbers 6-9
    if (name === "mobile") {
      // Remove any non-digit characters
      processedValue = value.replace(/\D/g, '');

      // If first character is 0-5, remove it
      if (processedValue.length > 0) {
        const firstChar = processedValue.charAt(0);
        if (firstChar >= '0' && firstChar <= '5') {
          processedValue = processedValue.substring(1);
        }
      }

      // Limit to 10 digits
      processedValue = processedValue.slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear API error when user makes any change
    if (apiError) {
      setApiError("");
    }
  };

  // Handle onBlur to show validation errors when user leaves the field
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate the field
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "fullName":
        if (!value.trim()) {
          error = "Please fill this field";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = "Only letters and spaces are allowed";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (value.trim().length > 50) {
          error = "Name must be less than 50 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Please fill this field";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "mobile":
        if (!value.trim()) {
          error = "Please fill this field";
        } else if (!/^\d+$/.test(value)) {
          error = "Only numbers are allowed";
        } else if (value.length !== 10) {
          error = "Mobile number must be 10 digits";
        } else if (!/^[6-9]/.test(value)) {
          error = "Mobile number must start with 6, 7, 8, or 9";
        }
        break;

      case "message":
        if (!value.trim()) {
          error = "Please fill this field";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        } else if (value.trim().length > 500) {
          error = "Message must be less than 500 characters";
        }
        break;

      case "agreedToTerms":
        if (!value) {
          error = "You must agree to the terms";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const validateAll = () => {
    const newErrors = {
      fullName: "",
      email: "",
      mobile: "",
      message: "",
      agreedToTerms: "",
    };

    let isValid = true;

    // Validate each field
    Object.keys(newErrors).forEach((field) => {
      const fieldError = validateField(field, formData[field]);
      if (!fieldError) {
        isValid = false;
      }
    });

    // Mark all fields as touched
    const allTouched = Object.keys(touched).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError("");

    // Validate all fields
    const isValid = validateAll();
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Make API call
      const response = await axiosInstance.post("/contact/create", {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        message: formData.message.trim(),
      });

      if (response.data.success) {
        // Show success modal
        setShowThankYouModal(true);

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          message: "",
          agreedToTerms: false,
        });

        // Reset touched state
        setTouched({
          fullName: false,
          email: false,
          mobile: false,
          message: false,
          agreedToTerms: false,
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle specific error cases
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          const serverErrors = error.response.data?.errors;
          if (serverErrors) {
            const updatedErrors = { ...errors };
            Object.keys(serverErrors).forEach((key) => {
              if (updatedErrors.hasOwnProperty(key)) {
                updatedErrors[key] = serverErrors[key];
              }
            });
            setErrors(updatedErrors);
          } else {
            setApiError(error.response.data?.message || "Please check your input and try again.");
          }
        } else if (status === 409) {
          setApiError("This email or mobile number is already registered.");
        } else if (status === 500) {
          setApiError("Server error. Please try again later.");
        } else {
          setApiError("An error occurred. Please try again.");
        }
      } else if (error.request) {
        setApiError("Network error. Please check your connection and try again.");
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
      />

      <section className="px-4 sm:px-14 ">
        <section className="py-12">
          <div className="px-4 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16 sm:px-6 lg:px-8 ">

            {/* Contact Info */}
            <div className="w-full lg:max-w-2xl text-gray-800 mt-7 lg:mt-0">
              <h3 className="text-3xl md:text-4xl font-bold text-[#115D8E] mb-4 leading-tight">
                Start the conversation today
              </h3>
              <p className="text-gray-600 mb-5 text-lg md:text-xl leading-relaxed">
                We&apos;re just a message, call, or click away.
              </p>

              <div className="space-y-1">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
                    <MdEmail size={23} color={"#115D8E"} />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Email</div>
                    <div className="text-gray-600 text-base md:text-lg">support@7unique.in</div>
                  </div>
                </div>

                {/* Call */}
                <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
                    <IoCall size={23} color={"#115D8E"} />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Call us</div>
                    <div className="text-gray-600 text-base md:text-lg">0141-4511098</div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl  transition-colors duration-300 group">
                  <div className="flex-shrink-0 w-10 h-10  rounded-xl flex items-center justify-center group-hover:bg-[#115D8E]/20 transition-colors duration-300">
                    <FaLocationDot size={23} color={"#115D8E"} />
                  </div>
                  <div>
                    <div className="font-bold text-lg md:text-xl text-[#115D8E] mb-1">Visit us</div>
                    <div className="text-gray-600 text-base md:text-lg leading-relaxed">
                      Plot No 97, Dakshinpuri - I, Shrikishan, Sanganer, Jagatpura, Jaipur, Rajasthan 302017, India
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[40vh] w-full">
                <Image
                  src="/user/contact.webp"
                  alt="Contact"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Form Card */}
            <div className="w-full lg:max-w-2xl bg-white rounded-3xl  border border-[#ff6f00]/30 p-10 md:px-12 transform transition-all duration-500 hover:scale-[1.02] ">
              <div className=" mb-6">
                <h2 className="text-3xl font-bold text-[#115D8E] mb-2">
                  Contact Us
                </h2>
                <div className="w-16 h-1 bg-linear-to-r from-[#115D8E] to-[#ff6f00] rounded-full"></div>
              </div>

              {/* API Error Message */}
              {apiError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <span className="font-semibold">Error:</span> {apiError}
                  </p>
                </div>
              )}

              <form className="space-y-2" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#115D8E] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm hover:shadow-md ${errors.fullName && touched.fullName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-[#115D8E]/50 focus:border-[#115D8E] focus:ring-[#115D8E]/20"
                      }`}
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    maxLength={50}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      ⚠️ {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#115D8E] mb-2">
                    Business Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your business email"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm hover:shadow-md ${errors.email && touched.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-[#115D8E]/50 focus:border-[#115D8E] focus:ring-[#115D8E]/20"
                      }`}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      ⚠️ {errors.email}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#115D8E] mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter 10-digit mobile number"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm hover:shadow-md ${errors.mobile && touched.mobile
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-[#115D8E]/50 focus:border-[#115D8E] focus:ring-[#115D8E]/20"
                      }`}
                    value={formData.mobile}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputMode="numeric"
                    maxLength={10}
                    pattern="[6-9][0-9]{9}"
                    disabled={isSubmitting}
                  />
                  {errors.mobile && touched.mobile && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      ⚠️ {errors.mobile}
                    </p>
                  )}
                  <p className="text-gray-500 text-xs mt-1">
                    Must be 10 digits, starting with 6, 7, 8, or 9
                  </p>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-[#115D8E] mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project or inquiry..."
                    rows={4}
                    className={`w-full border-2 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm hover:shadow-md ${errors.message && touched.message
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-[#115D8E]/50 focus:border-[#115D8E] focus:ring-[#115D8E]/20"
                      }`}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    maxLength={500}
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      ⚠️ {errors.message}
                    </p>
                  )}
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Minimum 10 characters</span>
                    <span>{formData.message.length}/500</span>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 text-sm text-gray-600 p-4 bg-[#ff6f0050] rounded-xl">
                  <input
                    type="checkbox"
                    id="terms"
                    name="agreedToTerms"
                    className={`mt-1 w-5 h-5 rounded focus:ring-2 ${errors.agreedToTerms && touched.agreedToTerms
                        ? "accent-red-500 focus:ring-red-500/30"
                        : "accent-[#ff6f00] focus:ring-[#ff6f00]/30"
                      }`}
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  <label htmlFor="terms" className="cursor-pointer leading-relaxed">
                    I agree to all{" "}
                    <Link
                      href="/termsofuse"
                      className="text-[#115D8E] underline hover:text-[#ff6f00] transition-colors duration-200"
                      target="_blank"
                    >
                      terms and conditions
                    </Link>
                    .
                  </label>
                </div>
                {errors.agreedToTerms && touched.agreedToTerms && (
                  <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                    ⚠️ {errors.agreedToTerms}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#115D8E] to-[#ff6f00] shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>

      <div className="px-5">
        <div className="my-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-[16/9] relative h-[400px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3561.264701407029!2d75.869785!3d26.799699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ3JzU4LjkiTiA3NcKwNTInMTEuMiJF!5e0!3m2!1sen!2sin!4v1724749044503!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Company Location"
            ></iframe>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </>
  );
}