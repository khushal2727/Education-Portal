import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    progress: 75,
    status: "In Progress",
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    instructor: "Prof. Tim Berners-Lee",
    progress: 45,
    status: "In Progress",
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    instructor: "Dr. Ada Lovelace",
    progress: 90,
    status: "Almost Complete",
  },
  {
    id: 4,
    title: "Mobile App Development",
    instructor: "Prof. Steve Jobs",
    progress: 20,
    status: "Just Started",
  },
  {
    id: 5,
    title: "Artificial Intelligence Basics",
    instructor: "Dr. Geoffrey Hinton",
    progress: 60,
    status: "In Progress",
  },
]

export function StudentCourses({ expanded = false }: { expanded?: boolean }) {
  const displayCourses = expanded ? courses : courses.slice(0, 3)

  return (
    <div className="space-y-4">
      {displayCourses.map((course) => (
        <div key={course.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-muted-foreground">{course.instructor}</p>
            </div>
            <Button variant="outline" size="sm">
              Continue
            </Button>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{course.status}</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </div>
      ))}
      {!expanded && courses.length > 3 && (
        <Button variant="ghost" className="w-full" asChild>
          <a href="/dashboard/student/courses">View All Courses</a>
        </Button>
      )}
    </div>
  )
}
