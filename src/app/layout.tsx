import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/app-context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "VieCareer - AI-Powered Mock Interview Platform",
  description:
    "Prepare for your dream job with AI-powered mock interviews, real-time feedback, and personalized analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
