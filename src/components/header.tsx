import Link from "next/link"
import { FolderIcon as Hanger } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Hanger className="h-8 w-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">eSkapis</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-indigo-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
            </li>
            <li>
              <Link href="/outfits" className="text-gray-600 hover:text-indigo-600">
                Outfits
              </Link>
            </li>
            <li>
              <Link href="/account" className="text-gray-600 hover:text-indigo-600">
                Account
              </Link>
            </li>
            import  ThemeToggle  from "@/components/theme-toggle";
          </ul>
        </nav>
      </div>
    </header>
  )
}
