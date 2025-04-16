"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface AdminInquiryListProps {
  inquiries: any[]
  onStatusChange: (inquiryId: string, status: "Pending" | "Resolved") => void
}

export function AdminInquiryList({ inquiries, onStatusChange }: AdminInquiryListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length > 0 ? (
            inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(inquiry.date), { addSuffix: true })}</TableCell>
                <TableCell>
                  <Badge variant={inquiry.status === "Pending" ? "outline" : "default"}>{inquiry.status}</Badge>
                </TableCell>
                <TableCell>
                  {inquiry.status === "Pending" ? (
                    <Button size="sm" onClick={() => onStatusChange(inquiry.id, "Resolved")}>
                      Mark as Resolved
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => onStatusChange(inquiry.id, "Pending")}>
                      Mark as Pending
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                No inquiries found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
