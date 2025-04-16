"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import storageService from "@/lib/storage-service"
import { ActivityLogList } from "@/components/dashboard/activity-log-list"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalNotices: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
  })

  const [recentLogs, setRecentLogs] = useState<any[]>([])

  useEffect(() => {
    // Get all users with role student
    const users = storageService.getAllUsers()
    const students = users.filter((user) => user.role === "student")

    // Get all courses
    const courses = storageService.getAllCourses()

    // Get all notices
    const notices = storageService.getAllNotices()

    // Get all inquiries
    const inquiries = storageService.getAllInquiries()
    const pendingInquiries = inquiries.filter((inquiry) => inquiry.status === "Pending")

    // Get recent activity logs
    const logs = storageService.getAllActivityLogs()
    const sortedLogs = [...logs]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

    setStats({
      totalStudents: students.length,
      totalCourses: courses.length,
      totalNotices: notices.length,
      totalInquiries: inquiries.length,
      pendingInquiries: pendingInquiries.length,
    })

    setRecentLogs(sortedLogs)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Registered student accounts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">Courses available to students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalNotices}</div>
                <p className="text-xs text-muted-foreground">Published announcements</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
                <p className="text-xs text-muted-foreground">Out of {stats.totalInquiries} total inquiries</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>System Overview</CardTitle>
                <CardDescription>All data is stored in your browser's localStorage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">User Authentication</div>
                      <div className="text-xs text-muted-foreground">
                        Login credentials and session data stored locally
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Role-Based Access</div>
                      <div className="text-xs text-muted-foreground">Admin and Student permissions managed locally</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Data Persistence</div>
                      <div className="text-xs text-muted-foreground">All changes persist between browser sessions</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium">Activity Tracking</div>
                      <div className="text-xs text-muted-foreground">User actions logged with timestamps</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityLogList logs={recentLogs} limit={5} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>All user actions tracked in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityLogList logs={recentLogs} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
