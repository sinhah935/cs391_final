import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/Header";
import {Roboto_Mono} from "next/font/google";
import React from "react";

export const metadata: Metadata = {
    title: "CS391 Stock Portfolio",
    description: "Create a Stock Portfolio",
};

const robotoMono = Roboto_Mono({subsets: ["latin"]});

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="en">
        <body
            className={`${robotoMono.className} antialiased min-h-screen bg-gradient-to-b from-red-50 to-red-100`}
        >
        <Header/>
        {children}
        </body>
        </html>
    );
}