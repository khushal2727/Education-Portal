"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import storageService from "@/lib/storage-service"

interface NoticeFormProps {
  notice?: any
  onSubmitted: () => void
  onCancel: () => void
}

export function NoticeForm({ notice, onSubmitted, onCancel }: NoticeFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: notice?.title || "",
    content: notice?.content || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (notice) {
        // Update existing notice
        storageService.updateNotice(notice.id, formData)
        toast({
          title: "Notice Updated",
          description: "The notice has been updated successfully.",
        })
      } else {
        // Add new notice
        storageService.addNotice(formData)
        toast({
          title: "Notice Added",
          description: "The new notice has been added successfully.",
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
        <Label htmlFor="title">Notice Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="min-h-[200px]"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : notice ? "Update Notice" : "Add Notice"}
        </Button>
      </div>
    </form>
  )
}
