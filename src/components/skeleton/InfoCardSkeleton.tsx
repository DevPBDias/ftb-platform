"use client";

import { motion } from "framer-motion";

export function InfoCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <motion.section
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200/50 flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden bg-gray-300 animate-pulse" />
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-200 w-24 h-6 animate-pulse" />
      </div>
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-200 w-20 h-6 animate-pulse" />
      </div>
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
          <div className="h-10 w-32 bg-gray-300 rounded-xl animate-pulse" />
          <div className="text-right space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
