import { formatDistanceToNow } from "date-fns"

interface NoticeListProps {
  notices: any[]
}

export function NoticeList({ notices }: NoticeListProps) {
  return (
    <div className="space-y-4">
      {notices.length > 0 ? (
        notices.map((notice) => (
          <div key={notice.id} className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{notice.title}</h3>
            <p className="text-sm mb-2">{notice.content}</p>
            <div className="text-xs text-muted-foreground">
              Posted {formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-4">No notices available</div>
      )}
    </div>
  )
}
