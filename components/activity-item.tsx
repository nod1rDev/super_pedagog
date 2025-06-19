import { formatDate } from "@/lib/utils";

export function ActivityItem({ date, ...props }: any) {
  return (
    <div>
      {/* ...other content... */}
      <time dateTime={date} className="text-xs text-muted-foreground">
        {formatDate(date)}
      </time>
    </div>
  );
}
