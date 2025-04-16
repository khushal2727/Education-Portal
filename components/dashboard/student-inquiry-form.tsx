"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import storageService from "@/lib/storage-service"

interface StudentInquiryFormProps {
  user: any
  onSubmitted: () => void
}

export function StudentInquiryForm({ user, onSubmitted }: StudentInquiryFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Save the inquiry to localStorage
      storageService.addInquiry({
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        date: new Date().toISOString(),
        status: "Pending",
      })

      // Show success message
      toast({
        title: "Inquiry Submitted",
        description: "Your inquiry has been submitted successfully.",
      })

      // Reset form
      setFormData((prev) => ({ ...prev, message: "" }))

      // Notify parent component
      onSubmitted()
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} disabled required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} disabled required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Type your question or inquiry here..."
          value={formData.message}
          onChange={handleChange}
          required
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  )
}
