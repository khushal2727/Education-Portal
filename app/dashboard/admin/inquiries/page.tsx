"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import storageService from "@/lib/storage-service"
import { AdminInquiryList } from "@/components/dashboard/admin-inquiry-list"

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])

  useEffect(() => {
    loadInquiries()
  }, [])

  const loadInquiries = () => {
    const allInquiries = storageService.getAllInquiries()
    // Sort by date (newest first)
    const sortedInquiries = [...allInquiries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setInquiries(sortedInquiries)
  }

  const handleStatusChange = (inquiryId: string, status: "Pending" | "Resolved") => {
    storageService.updateInquiryStatus(inquiryId, status)
    loadInquiries()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Inquiries</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Inquiries</CardTitle>
          <CardDescription>View and manage student inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminInquiryList inquiries={inquiries} onStatusChange={handleStatusChange} />
        </CardContent>
      </Card>
    </div>
  )
}
