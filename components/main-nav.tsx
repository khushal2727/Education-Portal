"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import storageService from "@/lib/storage-service"

export function MainNav() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const user = storageService.getCurrentUser()
    setUserRole(user?.role || null)
  }, [pathname])

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  // Add dashboard link if user is logged in
  if (userRole) {
    routes.push({
      href: userRole === "admin" ? "/dashboard/admin" : "/dashboard/student",
      label: "Dashboard",
      active: pathname.includes("/dashboard"),
    })
  }

  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">Education Portal</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              route.active ? "text-foreground" : "text-foreground/60",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
