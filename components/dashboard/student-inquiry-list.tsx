import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface StudentInquiryListProps {
  inquiries: any[]
}

export function StudentInquiryList({ inquiries }: StudentInquiryListProps) {
  return (
    <div className="space-y-4">
      {inquiries.length > 0 ? (
        inquiries.map((inquiry) => (
          <div key={inquiry.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{inquiry.name}</h3>
              <Badge variant={inquiry.status === "Pending" ? "outline" : "default"}>{inquiry.status}</Badge>
            </div>
            <p className="text-sm mb-2">{inquiry.message}</p>
            <div className="text-xs text-muted-foreground">
              Submitted {formatDistanceToNow(new Date(inquiry.date), { addSuffix: true })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-4">No inquiries submitted</div>
      )}
    </div>
  )
}
