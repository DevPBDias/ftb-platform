"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { TimelineContentCard } from "./timeline-content-card"
import { TimelineMediaCard } from "./timeline-media-card"

interface TimelineEventData {
  monthYear: string
  title: string
  location: string
  description: string
  imageSrc: string
  imageAlt: string
}

interface AnimatedTimelineItemProps {
  event: TimelineEventData
  index: number
}

export function AnimatedTimelineItem({ event, index }: AnimatedTimelineItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 }) // Anima quando 50% do elemento está visível

  const isLeft = index % 2 === 0

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("relative flex items-center w-full mb-12 mt-12 lg:mt-36", isLeft ? "md:justify-start" : "md:justify-end")}
    >
      <div className="flex flex-col items-start w-full md:hidden relative z-10">
        <div className="absolute left-6 top-0 w-6 h-6 rounded-full bg-gradient-to-br from-timeline-line-start to-timeline-line-end flex items-center justify-center -translate-x-1/2">
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
        <div className="ml-12 flex flex-col items-start w-[calc(100%-3rem)]">
          <TimelineMediaCard
            monthYear={event.monthYear}
            imageSrc={event.imageSrc}
            imageAlt={event.imageAlt}
            className="mb-4"
          />
          <TimelineContentCard
            title={event.title}
            location={event.location}
            description={event.description}
            className=""
          />
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] w-full items-center">
        {isLeft ? (
          <>
            <div className="col-start-1 col-end-2 flex justify-end pr-12">
              <TimelineMediaCard monthYear={event.monthYear} imageSrc={event.imageSrc} imageAlt={event.imageAlt} />
            </div>
            <div className="col-start-2 col-end-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-timeline-line-start to-timeline-line-end shadow-xl flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <div className="col-start-3 col-end-4 flex justify-start pl-12">
              <TimelineContentCard title={event.title} location={event.location} description={event.description} />
            </div>
          </>
        ) : (
          <>
            <div className="col-start-1 col-end-2 flex justify-end pr-12">
              <TimelineContentCard title={event.title} location={event.location} description={event.description} />
            </div>
            <div className="col-start-2 col-end-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-timeline-line-start to-timeline-line-end shadow-xl flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <div className="col-start-3 col-end-4 flex justify-start pl-12">
              <TimelineMediaCard monthYear={event.monthYear} imageSrc={event.imageSrc} imageAlt={event.imageAlt} />
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
