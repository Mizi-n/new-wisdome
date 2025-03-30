"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Check if user is on auth pages
  const isAuthPage = pathname.startsWith("/auth")

  // Use a state variable to track login status (in a real app, this would use a proper auth system)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Add useEffect to check localStorage for login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("wisdomeeLoggedIn")
    if (loggedInStatus === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  // Check if user is admin
  const isAdmin = pathname.includes("/admin")

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Wisdomee
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname === "/" ? "text-blue-600" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/communities"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname === "/communities" ? "text-blue-600" : ""}`}
            >
              Communities
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/notes"
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/dashboard/notes") ? "text-blue-600" : ""}`}
                >
                  My Notes
                </Link>
                <Link
                  href="/dashboard/ask-mr-wisdomee"
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/dashboard/ask-mr-wisdomee") ? "text-blue-600" : ""}`}
                >
                  Ask Mr. Wisdomee
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/dashboard/settings") ? "text-blue-600" : ""}`}
                >
                  Settings
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/admin") ? "text-blue-600" : ""}`}
                  >
                    Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem("wisdomeeLoggedIn")
                    setIsLoggedIn(false)
                    window.location.href = "/"
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname === "/" ? "text-blue-600" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/communities"
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname === "/communities" ? "text-blue-600" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Communities
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/notes"
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/dashboard/notes") ? "text-blue-600" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Notes
                </Link>
                <Link
                  href="/dashboard/ask-mr-wisdomee"
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/dashboard/ask-mr-wisdomee") ? "text-blue-600" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ask Mr. Wisdomee
                </Link>
                <Link
                  href="/dashboard/settings"
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/dashboard/settings") ? "text-blue-600" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md ${pathname.includes("/admin") ? "text-blue-600" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsMenuOpen(false)
                    localStorage.removeItem("wisdomeeLoggedIn")
                    setIsLoggedIn(false)
                    window.location.href = "/"
                  }}
                  className="mt-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              !isAuthPage && (
                <div className="flex flex-col space-y-2 mt-2">
                  <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/auth/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild onClick={() => setIsMenuOpen(false)}>
                    <Link href="/auth/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

