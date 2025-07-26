import { Card, CardContent } from "@/components/ui/card";

export function GameCardSkeleton() {
  return (
    <Card className="w-full max-w-[240px] mx-auto flex flex-col justify-between h-full animate-pulse bg-blue-800 border-blue-700">
      <CardContent className="p-4 flex flex-col gap-4">
        {/* Team 1 Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-700" />
            <div className="h-4 w-20 bg-blue-700 rounded" />
          </div>
          <div className="h-10 w-12 bg-blue-700 rounded" />
        </div>

        {/* Separator Skeleton */}
        <div className="h-px bg-blue-700 w-full" />

        {/* Team 2 Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-700" />
            <div className="h-4 w-20 bg-blue-700 rounded" />
          </div>
          <div className="h-10 w-12 bg-blue-700 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
