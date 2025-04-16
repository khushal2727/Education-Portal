"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Trash } from "lucide-react"
import type { PreviousSchool } from "@/lib/storage-service"

interface PreviousSchoolFormProps {
  schools: PreviousSchool[]
  onAddSchool: (school: PreviousSchool) => void
  onRemoveSchool: (id: string) => void
  readOnly?: boolean
}

export function PreviousSchoolForm({
  schools,
  onAddSchool,
  onRemoveSchool,
  readOnly = false,
}: PreviousSchoolFormProps) {
  const [newSchool, setNewSchool] = useState({
    name: "",
    degree: "",
    yearStart: "",
    yearEnd: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewSchool((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSchool = () => {
    if (!newSchool.name || !newSchool.degree || !newSchool.yearStart) {
      return
    }

    onAddSchool({
      id: Date.now().toString(),
      ...newSchool,
    })

    setNewSchool({
      name: "",
      degree: "",
      yearStart: "",
      yearEnd: "",
    })
  }

  return (
    <div className="space-y-6">
      {schools.length > 0 ? (
        <div className="space-y-4">
          {schools.map((school) => (
            <Card key={school.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-medium">{school.name}</h4>
                    <p className="text-sm text-muted-foreground">{school.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {school.yearStart} - {school.yearEnd || "Present"}
                    </p>
                  </div>
                  {!readOnly && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveSchool(school.id)}
                      className="text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-muted-foreground">No education history added yet.</div>
      )}

      {!readOnly && (
        <div className="space-y-4 border rounded-lg p-4">
          <h3 className="font-medium">Add Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Institution Name</Label>
              <Input
                id="name"
                name="name"
                value={newSchool.name}
                onChange={handleInputChange}
                placeholder="School/College/University name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree/Certificate</Label>
              <Input
                id="degree"
                name="degree"
                value={newSchool.degree}
                onChange={handleInputChange}
                placeholder="e.g. High School, Bachelor's"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearStart">Start Year</Label>
              <Input
                id="yearStart"
                name="yearStart"
                value={newSchool.yearStart}
                onChange={handleInputChange}
                placeholder="e.g. 2018"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearEnd">End Year (or expected)</Label>
              <Input
                id="yearEnd"
                name="yearEnd"
                value={newSchool.yearEnd}
                onChange={handleInputChange}
                placeholder="e.g. 2022 or leave blank if current"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAddSchool}>Add Institution</Button>
          </div>
        </div>
      )}
    </div>
  )
}
