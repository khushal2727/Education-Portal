import { Button } from "@/components/ui/button"
import { Bell, BookOpen, Calendar, MessageSquare } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New Course Available",
    message: "A new course 'Advanced Machine Learning' is now available for enrollment.",
    date: "2 hours ago",
    icon: BookOpen,
    read: false,
  },
  {
    id: 2,
    title: "Assignment Due",
    message: "Your 'Web Development' assignment is due in 2 days.",
    date: "1 day ago",
    icon: Calendar,
    read: false,
  },
  {
    id: 3,
    title: "Message from Instructor",
    message: "Dr. Alan Turing has sent you a message regarding your project.",
    date: "2 days ago",
    icon: MessageSquare,
    read: true,
  },
  {
    id: 4,
    title: "Course Update",
    message: "The 'Data Structures' course has been updated with new materials.",
    date: "3 days ago",
    icon: BookOpen,
    read: true,
  },
  {
    id: 5,
    title: "Upcoming Webinar",
    message: "Don't miss the upcoming webinar on 'Career Opportunities in Tech'.",
    date: "5 days ago",
    icon: Bell,
    read: true,
  },
]

export function Notifications({ expanded = false }: { expanded?: boolean }) {
  const displayNotifications = expanded ? notifications : notifications.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayNotifications.map((notification) => (
        <div key={notification.id} className={`border rounded-lg p-4 ${notification.read ? "" : "bg-muted/50"}`}>
          <div className="flex gap-3">
            <div className="mt-0.5">
              <notification.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{notification.date}</p>
            </div>
          </div>
        </div>
      ))}
      {!expanded && notifications.length > 3 && (
        <Button variant="ghost" className="w-full" asChild>
          <a href="/dashboard/student/notifications">View All Notifications</a>
        </Button>
      )}
    </div>
  )
}
