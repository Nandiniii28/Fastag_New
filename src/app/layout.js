// import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { UserProvider } from "./user-profile/context";
import LayoutClient from "./LayoutClient";

export const metadata = {
  title: "FasTag",
  description: "FasTag"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/image/fastag-fav.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <LayoutClient>
            {children}
          </LayoutClient>

        </UserProvider>
      </body>
    </html>
  );
}
