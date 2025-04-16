"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import storageService from "@/lib/storage-service"
import { StudentCourseList } from "@/components/dashboard/student-course-list"
import { NoticeList } from "@/components/dashboard/notice-list"

export default function StudentDashboardPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [notices, setNotices] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Get current user
    const user = storageService.getCurrentUser()
    setCurrentUser(user)

    // Get all courses
    const allCourses = storageService.getAllCourses()
    setCourses(allCourses)

    // Get all notices
    const allNotices = storageService.getAllNotices()
    // Sort by date (newest first)
    const sortedNotices = [...allNotices].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setNotices(sortedNotices)

    // Get all inquiries for the current user
    if (user) {
      const allInquiries = storageService.getAllInquiries()
      // Filter inquiries by user email (if available)
      const userInquiries = allInquiries.filter((inquiry) => inquiry.email === user.email)
      setInquiries(userInquiries)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="notices">Notices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">Courses you can access</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{notices.length}</div>
                <p className="text-xs text-muted-foreground">Important announcements</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inquiries.length}</div>
                <p className="text-xs text-muted-foreground">Questions you've submitted</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
                <CardDescription>Courses available to you</CardDescription>
              </CardHeader>
              <CardContent>
                <StudentCourseList courses={courses.slice(0, 3)} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Latest Notices</CardTitle>
                <CardDescription>Recent announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <NoticeList notices={notices.slice(0, 3)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Courses</CardTitle>
              <CardDescription>Browse all available courses</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentCourseList courses={courses} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notices</CardTitle>
              <CardDescription>View all announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <NoticeList notices={notices} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
