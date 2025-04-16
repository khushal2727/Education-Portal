"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface AdminNoticeListProps {
  notices: any[]
  onEdit: (notice: any) => void
  onDelete: (noticeId: string) => void
}

export function AdminNoticeList({ notices, onEdit, onDelete }: AdminNoticeListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.length > 0 ? (
            notices.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell className="font-medium">{notice.title}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}</TableCell>
                <TableCell>{formatDistanceToNow(new Date(notice.updatedAt), { addSuffix: true })}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(notice)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(notice.id)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No notices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
