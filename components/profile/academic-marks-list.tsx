"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { SemesterMarks } from "@/lib/storage-service"

interface AcademicMarksListProps {
  semesters: SemesterMarks[]
  readOnly?: boolean
}

export function AcademicMarksList({ semesters, readOnly = true }: AcademicMarksListProps) {
  return (
    <div className="space-y-4">
      {semesters.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {semesters.map((semester) => (
            <AccordionItem key={semester.id} value={semester.id} className="border rounded-lg">
              <AccordionTrigger className="px-4 py-2">
                <div className="flex flex-col items-start">
                  <div className="font-medium">
                    {semester.semester} {semester.year}
                  </div>
                  {semester.gpa && <div className="text-sm text-muted-foreground">GPA: {semester.gpa}</div>}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {semester.subjects && semester.subjects.length > 0 ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 font-medium text-sm text-muted-foreground">
                      <div className="col-span-7">Subject</div>
                      <div className="col-span-3">Grade</div>
                      <div className="col-span-2">Credits</div>
                    </div>
                    {semester.subjects.map((subject) => (
                      <div key={subject.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-7">{subject.name}</div>
                        <div className="col-span-3">{subject.grade}</div>
                        <div className="col-span-2">{subject.credits}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No subjects added yet.</div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-4 text-muted-foreground">No academic records added yet.</div>
      )}
    </div>
  )
}
