import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const students = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    course: "Computer Science",
    date: "2 days ago",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    course: "Business Administration",
    date: "3 days ago",
  },
  {
    name: "Michael Brown",
    email: "m.brown@example.com",
    course: "Graphic Design",
    date: "5 days ago",
  },
  {
    name: "Emily Davis",
    email: "emily.d@example.com",
    course: "Psychology",
    date: "1 week ago",
  },
  {
    name: "David Wilson",
    email: "d.wilson@example.com",
    course: "Engineering",
    date: "1 week ago",
  },
]

export function RecentStudents() {
  return (
    <div className="space-y-8">
      {students.map((student) => (
        <div key={student.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <div className="ml-auto text-sm text-right">
            <p className="font-medium">{student.course}</p>
            <p className="text-muted-foreground">{student.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
