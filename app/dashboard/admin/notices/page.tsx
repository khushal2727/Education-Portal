"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import storageService from "@/lib/storage-service"
import { AdminNoticeList } from "@/components/dashboard/admin-notice-list"
import { NoticeForm } from "@/components/dashboard/notice-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingNotice, setEditingNotice] = useState<any>(null)

  useEffect(() => {
    loadNotices()
  }, [])

  const loadNotices = () => {
    const allNotices = storageService.getAllNotices()
    // Sort by date (newest first)
    const sortedNotices = [...allNotices].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setNotices(sortedNotices)
  }

  const handleAddNew = () => {
    setEditingNotice(null)
    setShowForm(true)
  }

  const handleEdit = (notice: any) => {
    setEditingNotice(notice)
    setShowForm(true)
  }

  const handleFormSubmitted = () => {
    setShowForm(false)
    setEditingNotice(null)
    loadNotices()
  }

  const handleDelete = (noticeId: string) => {
    storageService.deleteNotice(noticeId)
    loadNotices()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Manage Notices</h2>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Notice
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingNotice ? "Edit Notice" : "Add New Notice"}</CardTitle>
          </CardHeader>
          <CardContent>
            <NoticeForm
              notice={editingNotice}
              onSubmitted={handleFormSubmitted}
              onCancel={() => {
                setShowForm(false)
                setEditingNotice(null)
              }}
            />
          </CardContent>
        </Card>
      )}

      <AdminNoticeList notices={notices} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
