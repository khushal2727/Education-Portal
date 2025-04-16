"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import storageService from "@/lib/storage-service"
import { StudentInquiryList } from "@/components/dashboard/student-inquiry-list"
import { StudentInquiryForm } from "@/components/dashboard/student-inquiry-form"

export default function StudentInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Get current user
    const user = storageService.getCurrentUser()
    setCurrentUser(user)

    // Get all inquiries for the current user
    if (user) {
      const allInquiries = storageService.getAllInquiries()
      // Filter inquiries by user email (if available)
      const userInquiries = allInquiries.filter((inquiry) => inquiry.email === user.email)
      // Sort by date (newest first)
      const sortedInquiries = [...userInquiries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setInquiries(sortedInquiries)
    }
  }, [showForm])

  const handleInquirySubmitted = () => {
    setShowForm(false)
    // Refresh inquiries
    if (currentUser) {
      const allInquiries = storageService.getAllInquiries()
      const userInquiries = allInquiries.filter((inquiry) => inquiry.email === currentUser.email)
      const sortedInquiries = [...userInquiries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setInquiries(sortedInquiries)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Inquiries</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Submit New Inquiry"}</Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Submit a New Inquiry</CardTitle>
            <CardDescription>Ask a question or request information</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentInquiryForm user={currentUser} onSubmitted={handleInquirySubmitted} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Inquiries</CardTitle>
          <CardDescription>Questions you've submitted</CardDescription>
        </CardHeader>
        <CardContent>
          <StudentInquiryList inquiries={inquiries} />
        </CardContent>
      </Card>
    </div>
  )
}
