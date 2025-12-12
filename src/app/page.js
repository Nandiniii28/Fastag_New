"use client";
import HomePage from "../../components/Homepage";
import ServicesSection from "../../components/ServicesSection";
import Whyus from "../../components/HowitsWork";
import SupportedBanksSlider from "../../components/SupportedBanksSlider";
import TestimonialSlider from "../../components/Testimonials";
import CTASectionCombined from "../../components/about/cta";
import BlogsSection from "../../components/BlogSection";
import { useEffect } from "react";


export default function Home() {

   useEffect(() => {
    if (localStorage.getItem("reloadHome") === "true") {
      localStorage.removeItem("reloadHome"); // flag remove karo
      window.location.reload(); // aur reload karo
    }
  }, []);
  return (
      <>
         <HomePage />
         <ServicesSection />
         <Whyus />
         <BlogsSection />
         <SupportedBanksSlider />
         <TestimonialSlider />
         <CTASectionCombined />
      </>
  );
}
