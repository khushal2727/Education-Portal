"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { PreviousSchool } from "@/lib/storage-service"

interface PreviousSchoolListProps {
  schools: PreviousSchool[]
  readOnly?: boolean
}

export function PreviousSchoolList({ schools, readOnly = true }: PreviousSchoolListProps) {
  return (
    <div className="space-y-4">
      {schools.length > 0 ? (
        <div className="space-y-4">
          {schools.map((school) => (
            <Card key={school.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-1">
                  <h4 className="font-medium">{school.name}</h4>
                  <p className="text-sm text-muted-foreground">{school.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {school.yearStart} - {school.yearEnd || "Present"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-muted-foreground">No education history added yet.</div>
      )}
    </div>
  )
}
