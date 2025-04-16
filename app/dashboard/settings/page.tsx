"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PreviousSchoolForm } from "@/components/profile/previous-school-form"
import { AcademicMarksForm } from "@/components/profile/academic-marks-form"
import { ProfilePhotoUploader } from "@/components/profile/profile-photo-uploader"
import type { User, PreviousSchool, SemesterMarks } from "@/lib/storage-service"
import storageService from "@/lib/storage-service"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    contactNumber: "",
    address: "",
    rollNumber: "",
  })

  const [previousSchools, setPreviousSchools] = useState<PreviousSchool[]>([])
  const [academicMarks, setAcademicMarks] = useState<SemesterMarks[]>([])

  useEffect(() => {
    const currentUser = storageService.getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)
    setFormData({
      username: currentUser.username || "",
      email: currentUser.email || "",
      bio: currentUser.bio || "",
      contactNumber: currentUser.contactNumber || "",
      address: currentUser.address || "",
      rollNumber: currentUser.rollNumber || "",
    })
    setPreviousSchools(currentUser.previousSchools || [])
    setAcademicMarks(currentUser.academicMarks || [])
    setLoading(false)
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfilePhotoUpdate = (photoData: string) => {
    if (user) {
      const updatedUser = storageService.updateUserProfile(user.id, {
        profilePhoto: photoData,
      })
      if (updatedUser) {
        setUser(updatedUser)
        toast({
          title: "Profile photo updated",
          description: "Your profile photo has been updated successfully.",
        })
      }
    }
  }

  const handleSaveProfile = () => {
    if (!user) return

    setIsSubmitting(true)
    try {
      const updatedUser = storageService.updateUserProfile(user.id, {
        ...formData,
        previousSchools,
        academicMarks,
      })

      if (updatedUser) {
        setUser(updatedUser)
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccount = () => {
    if (!user) return

    try {
      const deleted = storageService.deleteUserAccount(user.id)
      if (deleted) {
        toast({
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
        })
        router.push("/")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete account",
        variant: "destructive",
      })
    }
  }

  const handleAddSchool = (school: PreviousSchool) => {
    setPreviousSchools((prev) => [...prev, school])
  }

  const handleRemoveSchool = (id: string) => {
    setPreviousSchools((prev) => prev.filter((school) => school.id !== id))
  }

  const handleAddSemester = (semester: SemesterMarks) => {
    setAcademicMarks((prev) => [...prev, semester])
  }

  const handleUpdateSemester = (updatedSemester: SemesterMarks) => {
    setAcademicMarks((prev) =>
      prev.map((semester) => (semester.id === updatedSemester.id ? updatedSemester : semester)),
    )
  }

  const handleRemoveSemester = (id: string) => {
    setAcademicMarks((prev) => prev.filter((semester) => semester.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">Loading settings...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
        <div className="flex gap-2">
          <Button onClick={handleSaveProfile} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="education">Education History</TabsTrigger>
          <TabsTrigger value="academic">Academic Records</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center space-y-3">
                  <h3 className="text-sm font-medium">Profile Photo</h3>
                  <ProfilePhotoUploader currentPhoto={user.profilePhoto} onPhotoUpdate={handleProfilePhotoUpdate} />
                </div>

                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" value={formData.username} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number / Registration ID</Label>
                      <Input
                        id="rollNumber"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Education History</CardTitle>
              <CardDescription>Add your previous educational background</CardDescription>
            </CardHeader>
            <CardContent>
              <PreviousSchoolForm
                schools={previousSchools}
                onAddSchool={handleAddSchool}
                onRemoveSchool={handleRemoveSchool}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Records</CardTitle>
              <CardDescription>Manage your semester-wise academic records</CardDescription>
            </CardHeader>
            <CardContent>
              <AcademicMarksForm
                semesters={academicMarks}
                onAddSemester={handleAddSemester}
                onUpdateSemester={handleUpdateSemester}
                onRemoveSemester={handleRemoveSemester}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
