'use client'

interface CircularTimerProps {
  duration: number
  currentTime: number
}

export function CircularTimer({ duration, currentTime }: CircularTimerProps) {
  const radius = 8
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = ((duration - currentTime) / duration) * circumference

  return (
    <div className="flex items-center gap-2">
      <svg width="20" height="20" className="rotate-[-90deg]">
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-gray-500 transition-[stroke-dashoffset] duration-1000"
        />
      </svg>
      <span className="text-sm text-gray-500">
        {currentTime} Sec
      </span>
    </div>
  )
}

