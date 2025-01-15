"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface IosDatePickerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selected: Date
  onSelect: (date: Date) => void
}

export function IosDatePicker({
  open,
  onOpenChange,
  selected,
  onSelect,
}: IosDatePickerProps) {
  const [internalDate, setInternalDate] = React.useState(selected)
  const [monthScrollTop, setMonthScrollTop] = React.useState(0)
  const [dayScrollTop, setDayScrollTop] = React.useState(0)
  const [yearScrollTop, setYearScrollTop] = React.useState(0)

  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1)
      return format(date, "MMMM")
    })
  }, [])

  const days = React.useMemo(() => {
    return Array.from({ length: 31 }, (_, i) => i + 1)
  }, [])

  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from(
      { length: currentYear - 1950 + 1 },
      (_, i) => currentYear - (currentYear - 1950) + i
    )
  }, [])

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement>,
    setter: (value: number) => void
  ) => {
    const { scrollTop } = e.currentTarget
    const snap = Math.round(scrollTop / 40) * 40
    setter(snap)
    e.currentTarget.scrollTop = snap
  }

  const handleConfirm = () => {
    const month = Math.round(monthScrollTop / 40)
    const day = Math.round(dayScrollTop / 40)
    const yearIndex = Math.round(yearScrollTop / 40)
    const year = years[yearIndex]

    const newDate = new Date(year, month, days[day])

    // Validate the date is within range
    const minDate = new Date(1950, 0, 1)
    const maxDate = new Date()

    if (newDate < minDate) {
      newDate.setFullYear(1950)
      newDate.setMonth(0)
      newDate.setDate(1)
    } else if (newDate > maxDate) {
      newDate.setFullYear(maxDate.getFullYear())
      newDate.setMonth(maxDate.getMonth())
      newDate.setDate(maxDate.getDate())
    }

    onSelect(newDate)
    onOpenChange(false)
  }

  React.useEffect(() => {
    if (open) {
      const month = selected.getMonth()
      const day = selected.getDate() - 1
      const yearIndex = years.findIndex((y) => y === selected.getFullYear())

      setMonthScrollTop(month * 40)
      setDayScrollTop(day * 40)
      setYearScrollTop(yearIndex * 40)
    }
  }, [open, selected, years])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="p-0 border-t bg-white"
      >
        <div className="flex flex-col">
          <div className="relative h-[200px] bg-zinc-100/90 backdrop-blur-xl">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-[40px] w-full border-y border-zinc-300/50" />
            </div>
            <div className="flex h-full">
              <div
                className="flex-1 overflow-y-auto scrollbar-none"
                onScroll={(e) => handleScroll(e, setMonthScrollTop)}
              >
                <div className="h-[80px]" />
                {months.map((month) => (
                  <div
                    key={month}
                    className="h-[40px] flex items-center justify-center text-[20px]"
                  >
                    {month}
                  </div>
                ))}
                <div className="h-[80px]" />
              </div>
              <div
                className="flex-1 overflow-y-auto scrollbar-none"
                onScroll={(e) => handleScroll(e, setDayScrollTop)}
              >
                <div className="h-[80px]" />
                {days.map((day) => (
                  <div
                    key={day}
                    className="h-[40px] flex items-center justify-center text-[20px]"
                  >
                    {day}
                  </div>
                ))}
                <div className="h-[80px]" />
              </div>
              <div
                className="flex-1 overflow-y-auto scrollbar-none"
                onScroll={(e) => handleScroll(e, setYearScrollTop)}
              >
                <div className="h-[80px]" />
                {years.map((year) => (
                  <div
                    key={year}
                    className="h-[40px] flex items-center justify-center text-[20px]"
                  >
                    {year}
                  </div>
                ))}
                <div className="h-[80px]" />
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <Button
              onClick={handleConfirm}
              variant="ghost"
              className="text-blue-500 hover:text-blue-600"
            >
              OK
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="text-blue-500 hover:text-blue-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

