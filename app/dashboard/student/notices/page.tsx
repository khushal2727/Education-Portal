"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow } from "date-fns"
import storageService from "@/lib/storage-service"
import type { User, Notice } from "@/lib/storage-service"

export default function StudentNoticesPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = storageService.getCurrentUser()
    if (!currentUser) {
      router.push("/auth/login")
      return
    }

    if (currentUser.role !== "student") {
      router.push("/dashboard/admin")
      return
    }

    setUser(currentUser)

    // Get all notices
    const allNotices = storageService.getAllNotices()
    // Sort by date (newest first)
    const sortedNotices = [...allNotices].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setNotices(sortedNotices)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">Loading notices...</div>
      </div>
    )
  }

  // Filter notices by category
  const importantNotices = notices.filter((notice) => notice.category === "Important")
  const generalNotices = notices.filter((notice) => notice.category === "General" || !notice.category)
  const eventNotices = notices.filter((notice) => notice.category === "Event")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notices & Announcements</h2>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notices</TabsTrigger>
          <TabsTrigger value="important">Important</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">No Notices</h3>
                  <p>There are no notices or announcements at this time.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="important" className="space-y-4">
          {importantNotices.length > 0 ? (
            <div className="space-y-4">
              {importantNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">No Important Notices</h3>
                  <p>There are no important notices or announcements at this time.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {eventNotices.length > 0 ? (
            <div className="space-y-4">
              {eventNotices.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-10">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">No Events</h3>
                  <p>There are no upcoming events at this time.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface NoticeCardProps {
  notice: Notice
}

function NoticeCard({ notice }: NoticeCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{notice.title}</CardTitle>
            <CardDescription>
              Posted {formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          {notice.category && (
            <Badge
              variant={
                notice.category === "Important" ? "destructive" : notice.category === "Event" ? "secondary" : "outline"
              }
            >
              {notice.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={expanded ? "" : "line-clamp-3"}>{notice.content}</div>

        {notice.content.length > 150 && (
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Show Less" : "Read More"}
          </Button>
        )}

        {notice.eventDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Event Date: {new Date(notice.eventDate).toLocaleDateString()}</span>
          </div>
        )}

        {notice.attachments && notice.attachments.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Attachments</h4>
              <div className="space-y-2">
                {notice.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
