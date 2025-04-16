"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import storageService from "@/lib/storage-service"
import { AdminCourseList } from "@/components/dashboard/admin-course-list"
import { CourseForm } from "@/components/dashboard/course-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState<any>(null)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = () => {
    const allCourses = storageService.getAllCourses()
    setCourses(allCourses)
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      loadCourses()
      return
    }

    const allCourses = storageService.getAllCourses()
    const filteredCourses = allCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setCourses(filteredCourses)
  }

  const handleAddNew = () => {
    setEditingCourse(null)
    setShowForm(true)
  }

  const handleEdit = (course: any) => {
    setEditingCourse(course)
    setShowForm(true)
  }

  const handleFormSubmitted = () => {
    setShowForm(false)
    setEditingCourse(null)
    loadCourses()
  }

  const handleDelete = (courseId: string) => {
    storageService.deleteCourse(courseId)
    loadCourses()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Courses</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search courses..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button variant="outline" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCourse ? "Edit Course" : "Add New Course"}</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseForm
              course={editingCourse}
              onSubmitted={handleFormSubmitted}
              onCancel={() => {
                setShowForm(false)
                setEditingCourse(null)
              }}
            />
          </CardContent>
        </Card>
      )}

      <AdminCourseList courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
