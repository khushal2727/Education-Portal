"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, User } from "lucide-react"
import storageService from "@/lib/storage-service"
import type { User as UserType, EnrolledCourse } from "@/lib/storage-service"

export default function StudentCoursesPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = storageService.getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }

    if (currentUser.role !== "student") {
      router.push("/dashboard/admin")
      return
    }

    setUser(currentUser)

    // Get enrolled courses for the current user
    const userCourses = storageService.getEnrolledCoursesForUser(currentUser.id)
    setCourses(userCourses)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Courses</h2>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="all">All Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {courses.filter((course) => course.status === "In Progress").length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses
                .filter((course) => course.status === "In Progress")
                .map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">No Current Courses</h3>
                  <p>You are not enrolled in any courses for the current semester.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {courses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
                  <p>You are not enrolled in any courses yet.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface CourseCardProps {
  course: EnrolledCourse
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{course.credits} Credits</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {course.semester} {course.year}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{course.status}</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <Badge
            variant={
              course.status === "Completed" ? "default" : course.status === "In Progress" ? "secondary" : "outline"
            }
          >
            {course.status}
          </Badge>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
