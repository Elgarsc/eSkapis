import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "eSkapis",
  description: "An app for managing your wardrobe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignInUrl="/" afterSignUpUrl="/"> 
     
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navigation/>
              {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
