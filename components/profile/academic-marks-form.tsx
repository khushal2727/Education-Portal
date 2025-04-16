"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash, Plus } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import type { SemesterMarks, SubjectMark } from "@/lib/storage-service"

interface AcademicMarksFormProps {
  semesters: SemesterMarks[]
  onAddSemester: (semester: SemesterMarks) => void
  onUpdateSemester: (semester: SemesterMarks) => void
  onRemoveSemester: (id: string) => void
  readOnly?: boolean
}

export function AcademicMarksForm({
  semesters,
  onAddSemester,
  onUpdateSemester,
  onRemoveSemester,
  readOnly = false,
}: AcademicMarksFormProps) {
  const [newSemester, setNewSemester] = useState<Omit<SemesterMarks, "id" | "subjects">>({
    semester: "",
    year: "",
    gpa: "",
  })

  const [editingSemester, setEditingSemester] = useState<SemesterMarks | null>(null)
  const [newSubject, setNewSubject] = useState<Omit<SubjectMark, "id">>({
    name: "",
    grade: "",
    credits: 3,
  })
  const [showSubjectDialog, setShowSubjectDialog] = useState(false)

  const handleSemesterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSemester((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubjectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSubject((prev) => ({
      ...prev,
      [name]: name === "credits" ? Number(value) : value,
    }))
  }

  const handleAddSemester = () => {
    if (!newSemester.semester || !newSemester.year) {
      return
    }

    onAddSemester({
      id: Date.now().toString(),
      ...newSemester,
      subjects: [],
    })

    setNewSemester({
      semester: "",
      year: "",
      gpa: "",
    })
  }

  const handleAddSubject = () => {
    if (!editingSemester || !newSubject.name || !newSubject.grade) {
      return
    }

    const updatedSemester = {
      ...editingSemester,
      subjects: [
        ...editingSemester.subjects,
        {
          id: Date.now().toString(),
          ...newSubject,
        },
      ],
    }

    onUpdateSemester(updatedSemester)
    setEditingSemester(updatedSemester)
    setNewSubject({
      name: "",
      grade: "",
      credits: 3,
    })
    setShowSubjectDialog(false)
  }

  const handleRemoveSubject = (semesterId: string, subjectId: string) => {
    const semester = semesters.find((s) => s.id === semesterId)
    if (!semester) return

    const updatedSemester = {
      ...semester,
      subjects: semester.subjects.filter((s) => s.id !== subjectId),
    }

    onUpdateSemester(updatedSemester)
    if (editingSemester?.id === semesterId) {
      setEditingSemester(updatedSemester)
    }
  }

  return (
    <div className="space-y-6">
      {semesters.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {semesters.map((semester) => (
            <AccordionItem key={semester.id} value={semester.id} className="border rounded-lg">
              <div className="flex items-center justify-between px-4">
                <AccordionTrigger className="py-2">
                  <div className="flex flex-col items-start">
                    <div className="font-medium">
                      {semester.semester} {semester.year}
                    </div>
                    {semester.gpa && <div className="text-sm text-muted-foreground">GPA: {semester.gpa}</div>}
                  </div>
                </AccordionTrigger>
                {!readOnly && (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingSemester(semester)
                        setShowSubjectDialog(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add Subject</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveSemester(semester.id)
                      }}
                      className="text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                )}
              </div>
              <AccordionContent className="px-4 pb-4">
                {semester.subjects && semester.subjects.length > 0 ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-12 gap-2 font-medium text-sm text-muted-foreground">
                      <div className="col-span-6">Subject</div>
                      <div className="col-span-3">Grade</div>
                      <div className="col-span-2">Credits</div>
                      {!readOnly && <div className="col-span-1"></div>}
                    </div>
                    {semester.subjects.map((subject) => (
                      <div key={subject.id} className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">{subject.name}</div>
                        <div className="col-span-3">{subject.grade}</div>
                        <div className="col-span-2">{subject.credits}</div>
                        {!readOnly && (
                          <div className="col-span-1 flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveSubject(semester.id, subject.id)}
                              className="h-7 w-7 text-destructive"
                            >
                              <Trash className="h-3 w-3" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        )}
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

      {!readOnly && (
        <>
          <div className="space-y-4 border rounded-lg p-4">
            <h3 className="font-medium">Add Semester</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Input
                  id="semester"
                  name="semester"
                  value={newSemester.semester}
                  onChange={handleSemesterInputChange}
                  placeholder="e.g. Fall, Spring"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  value={newSemester.year}
                  onChange={handleSemesterInputChange}
                  placeholder="e.g. 2023"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  name="gpa"
                  value={newSemester.gpa}
                  onChange={handleSemesterInputChange}
                  placeholder="e.g. 3.8"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAddSemester}>Add Semester</Button>
            </div>
          </div>

          <Dialog open={showSubjectDialog} onOpenChange={setShowSubjectDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Subject</DialogTitle>
                <DialogDescription>
                  Add a new subject to {editingSemester?.semester} {editingSemester?.year}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject-name">Subject Name</Label>
                  <Input
                    id="subject-name"
                    name="name"
                    value={newSubject.name}
                    onChange={handleSubjectInputChange}
                    placeholder="e.g. Mathematics"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject-grade">Grade</Label>
                    <Input
                      id="subject-grade"
                      name="grade"
                      value={newSubject.grade}
                      onChange={handleSubjectInputChange}
                      placeholder="e.g. A, B+, C"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject-credits">Credits</Label>
                    <Input
                      id="subject-credits"
                      name="credits"
                      type="number"
                      min="1"
                      max="6"
                      value={newSubject.credits}
                      onChange={handleSubjectInputChange}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddSubject}>Add Subject</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
