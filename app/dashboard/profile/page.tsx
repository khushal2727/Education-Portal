"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { PreviousSchoolList } from "@/components/profile/previous-school-list"
import { AcademicMarksList } from "@/components/profile/academic-marks-list"
import { ProfileBarcodeCard } from "@/components/profile/profile-barcode-card"
import { ProfilePhotoUploader } from "@/components/profile/profile-photo-uploader"
import type { User } from "@/lib/storage-service"
import storageService from "@/lib/storage-service"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = storageService.getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(currentUser)
    setLoading(false)
  }, [router])

  const handleProfilePhotoUpdate = (photoData: string) => {
    if (user) {
      const updatedUser = storageService.updateUserProfile(user.id, {
        profilePhoto: photoData,
      })
      if (updatedUser) {
        setUser(updatedUser)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">Loading profile...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <Button onClick={() => router.push("/dashboard/settings")}>Edit Profile</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academic">Academic History</TabsTrigger>
          <TabsTrigger value="details">Personal Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <ProfilePhotoUploader currentPhoto={user.profilePhoto} onPhotoUpdate={handleProfilePhotoUpdate} />
                    <div className="text-center">
                      <h3 className="text-xl font-semibold">{user.username}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                      {user.rollNumber && (
                        <Badge variant="outline" className="mt-2">
                          Roll No: {user.rollNumber}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Bio</h4>
                      <p>{user.bio || "No bio provided yet."}</p>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Contact Number</h4>
                        <p>{user.contactNumber || "Not provided"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Address</h4>
                        <p>{user.address || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ProfileBarcodeCard rollNumber={user.rollNumber || user.id} />
          </div>

          {user.previousSchools && user.previousSchools.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Education History</CardTitle>
                <CardDescription>Your previous educational background</CardDescription>
              </CardHeader>
              <CardContent>
                <PreviousSchoolList schools={user.previousSchools} readOnly />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
              <CardDescription>Your semester-wise academic marks</CardDescription>
            </CardHeader>
            <CardContent>
              {user.academicMarks && user.academicMarks.length > 0 ? (
                <AcademicMarksList semesters={user.academicMarks} readOnly />
              ) : (
                <div className="text-center py-6 text-muted-foreground">No academic records available yet.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Your detailed personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Email Address</h4>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Contact Number</h4>
                      <p>{user.contactNumber || "Not provided"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Full Address</h4>
                      <p>{user.address || "Not provided"}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Username</h4>
                      <p>{user.username}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Role</h4>
                      <p className="capitalize">{user.role}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Account Created</h4>
                      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
