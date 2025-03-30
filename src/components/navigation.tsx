//components/navigation.tsx
"use client"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { FolderIcon as Hanger, LogIn } from "lucide-react"
import { SignInButton, SignOutButton, SignedIn, SignedOut} from "@clerk/nextjs"
import { ThemeProvider } from "./theme-provider";

export function Navigation() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <header className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold ">eSkapis</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <ThemeToggle />
            <SignedIn>
              <li>
                <Link href="/home" className=" hover:text-indigo-600">
                  Home
                </Link>
              </li>
            </SignedIn>
            
            <SignedOut>
              <li>
                <LogIn/>
              </li>
            </SignedOut>

            <SignedIn>
              <li>
                <Link href="/outfits" className=" hover:text-indigo-600">
                  Outfits
                </Link>
              </li>
            </SignedIn>
            
            <SignedOut>
              <div className=" hover:text-indigo-600">
                <SignInButton/>
              </div>
            </SignedOut>

            <SignedIn>
              <div className=" hover:text-indigo-600">
                <SignOutButton/>
              </div>
            </SignedIn>
          </ul>
        </nav>
      </div>
    </header>
    </ThemeProvider>
  )
}
