"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import storageService from "@/lib/storage-service"
import { ActivityLogList } from "@/components/dashboard/activity-log-list"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [filteredLogs, setFilteredLogs] = useState<any[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Get all activity logs
    const allLogs = storageService.getAllActivityLogs()
    // Sort by timestamp (newest first)
    const sortedLogs = [...allLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    setLogs(sortedLogs)
    setFilteredLogs(sortedLogs)
  }, [])

  const handleFilterChange = (value: string) => {
    setFilterType(value)
    applyFilters(value, searchTerm)
  }

  const handleSearch = () => {
    applyFilters(filterType, searchTerm)
  }

  const applyFilters = (type: string, term: string) => {
    let filtered = [...logs]

    // Apply action type filter
    if (type !== "all") {
      filtered = filtered.filter((log) => log.action.toLowerCase().includes(type.toLowerCase()))
    }

    // Apply search term
    if (term.trim()) {
      filtered = filtered.filter(
        (log) =>
          log.username.toLowerCase().includes(term.toLowerCase()) ||
          log.action.toLowerCase().includes(term.toLowerCase()) ||
          (log.details && log.details.toLowerCase().includes(term.toLowerCase())),
      )
    }

    setFilteredLogs(filtered)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Activity Logs</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select defaultValue="all" onValueChange={handleFilterChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
            <SelectItem value="register">Register</SelectItem>
            <SelectItem value="course">Course Management</SelectItem>
            <SelectItem value="notice">Notice Management</SelectItem>
            <SelectItem value="inquiry">Inquiries</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Search by username or action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button variant="outline" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Track all user actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityLogList logs={filteredLogs} />
        </CardContent>
      </Card>
    </div>
  )
}
