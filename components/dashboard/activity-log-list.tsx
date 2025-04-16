import { formatDistanceToNow } from "date-fns"
import { Activity } from "lucide-react"

interface ActivityLogListProps {
  logs: any[]
  limit?: number
}

export function ActivityLogList({ logs, limit }: ActivityLogListProps) {
  const displayLogs = limit ? logs.slice(0, limit) : logs

  return (
    <div className="space-y-4">
      {displayLogs.length > 0 ? (
        displayLogs.map((log) => (
          <div key={log.id} className="flex items-start gap-3 rounded-lg border p-3">
            <Activity className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{log.username}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm">{log.action}</p>
              {log.details && <p className="text-xs text-muted-foreground">{log.details}</p>}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-4">No activity logs found</div>
      )}
    </div>
  )
}
