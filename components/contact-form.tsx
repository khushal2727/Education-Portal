"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import storageService from "@/lib/storage-service"

export function ContactForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })

    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  )
}
