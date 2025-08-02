import { cn } from "@/lib/utils"

interface TimelineContentCardProps {
  title: string
  location: string
  description: string
  className?: string
}

export function TimelineContentCard({ title, location, description, className }: TimelineContentCardProps) {
  return (
    <div className={cn("bg-card rounded-lg shadow-lg p-6 w-full max-w-xl", className)}>
      <h3 className="font-bold text-2xl mb-1">
        {title} <span className="text-muted-foreground text-lg font-normal">{location}</span>
      </h3>
      <p className="text-base leading-snug text-muted-foreground mt-4">
        {description}
      </p>
    </div>
  )
}
