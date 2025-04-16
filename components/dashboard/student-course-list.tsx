import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"

interface StudentCourseListProps {
  courses: any[]
}

export function StudentCourseList({ courses }: StudentCourseListProps) {
  return (
    <div className="space-y-4">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
            <p className="text-sm mb-2">{course.description}</p>
            <div className="text-xs text-muted-foreground">
              Added {formatDistanceToNow(new Date(course.createdAt), { addSuffix: true })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-4">No courses available</div>
      )}
    </div>
  )
}
