"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProfilePhotoUploaderProps {
  currentPhoto?: string
  onPhotoUpdate: (photoData: string) => void
}

export function ProfilePhotoUploader({ currentPhoto, onPhotoUpdate }: ProfilePhotoUploaderProps) {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 1MB",
        variant: "destructive",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        onPhotoUpdate(reader.result)
      }
      setIsUploading(false)
    }
    reader.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to read the image file",
        variant: "destructive",
      })
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    onPhotoUpdate("")
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar className="h-24 w-24">
        <AvatarImage src={currentPhoto || "/placeholder.svg?height=96&width=96"} alt="Profile" />
        <AvatarFallback className="text-2xl">{currentPhoto ? "" : "?"}</AvatarFallback>
      </Avatar>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" className="relative" disabled={isUploading}>
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <Camera className="h-4 w-4 mr-1" />
          {isUploading ? "Uploading..." : "Change"}
        </Button>
        {currentPhoto && (
          <Button type="button" variant="outline" size="sm" onClick={handleRemovePhoto} className="text-destructive">
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>
    </div>
  )
}
