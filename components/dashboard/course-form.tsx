"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import storageService from "@/lib/storage-service"

interface CourseFormProps {
  course?: any
  onSubmitted: () => void
  onCancel: () => void
}

export function CourseForm({ course, onSubmitted, onCancel }: CourseFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: course?.title || "",
    description: course?.description || "",
    instructor: course?.instructor || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (course) {
        // Update existing course
        storageService.updateCourse(course.id, formData)
        toast({
          title: "Course Updated",
          description: "The course has been updated successfully.",
        })
      } else {
        // Add new course
        storageService.addCourse(formData)
        toast({
          title: "Course Added",
          description: "The new course has been added successfully.",
        })
      }

      onSubmitted()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was an error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Course Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instructor">Instructor</Label>
        <Input id="instructor" name="instructor" value={formData.instructor} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="min-h-[120px]"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : course ? "Update Course" : "Add Course"}
        </Button>
      </div>
    </form>
  )
}
