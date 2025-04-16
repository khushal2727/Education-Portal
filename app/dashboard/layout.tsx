"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Home, BookOpen, Users, Settings, Bell, User, LogOut, FileText, Activity } from "lucide-react"
import storageService from "@/lib/storage-service"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  // Check if user is authenticated and has the correct role
  useEffect(() => {
    const user = storageService.getCurrentUser()

    if (!user) {
      router.push("/auth/login")
      return
    }

    // Redirect if user tries to access wrong dashboard
    if (pathname.includes("/dashboard/admin") && user.role !== "admin") {
      router.push("/dashboard/student")
    } else if (pathname.includes("/dashboard/student") && user.role !== "student") {
      router.push("/dashboard/admin")
    }
  }, [pathname, router])

  const isAdmin = pathname.includes("/admin")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background dark:bg-gray-950">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="font-semibold">{isAdmin ? "Admin Portal" : "Student Portal"}</div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            {isAdmin ? (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin"}>
                          <a href="/dashboard/admin">
                            <Home className="h-4 w-4" />
                            <span>Overview</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin/courses"}>
                          <a href="/dashboard/admin/courses">
                            <BookOpen className="h-4 w-4" />
                            <span>Courses</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin/notices"}>
                          <a href="/dashboard/admin/notices">
                            <Bell className="h-4 w-4" />
                            <span>Notices</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin/inquiries"}>
                          <a href="/dashboard/admin/inquiries">
                            <FileText className="h-4 w-4" />
                            <span>Inquiries</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin/activity"}>
                          <a href="/dashboard/admin/activity">
                            <Activity className="h-4 w-4" />
                            <span>Activity Logs</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/admin/students"}>
                          <a href="/dashboard/admin/students">
                            <Users className="h-4 w-4" />
                            <span>Students</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            ) : (
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/student"}>
                          <a href="/dashboard/student">
                            <Home className="h-4 w-4" />
                            <span>Overview</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/student/courses"}>
                          <a href="/dashboard/student/courses">
                            <BookOpen className="h-4 w-4" />
                            <span>My Courses</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/student/notices"}>
                          <a href="/dashboard/student/notices">
                            <Bell className="h-4 w-4" />
                            <span>Notices</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === "/dashboard/student/inquiries"}>
                          <a href="/dashboard/student/inquiries">
                            <FileText className="h-4 w-4" />
                            <span>My Inquiries</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/profile"}>
                      <a href="/dashboard/profile">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                      <a href="/dashboard/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild onClick={() => storageService.logout()}>
                      <a href="/auth/login">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="dark:bg-gray-900">
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
