"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { useEffect, useState } from "react"
import storageService from "@/lib/storage-service"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check authentication status on client side
    const user = storageService.getCurrentUser()
    setIsAuthenticated(!!user)
    setCurrentUser(user)
  }, [pathname])

  const handleLogout = () => {
    storageService.logout()
    setIsAuthenticated(false)
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex h-16 items-center">
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          {isAuthenticated ? (
            <UserNav user={currentUser} onLogout={handleLogout} />
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
