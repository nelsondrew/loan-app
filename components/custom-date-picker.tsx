"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { IosDatePicker } from "./ios-date-picker"
import { cn } from "@/lib/utils"

interface CustomDatePickerProps {
  value?: Date
  onChange: (date: Date | undefined) => void
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-start text-left font-normal",
          !value && "text-muted-foreground"
        )}
        onClick={() => setOpen(true)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, "PPP") : <span>Pick a date</span>}
      </Button>

      <IosDatePicker
        open={open}
        onOpenChange={setOpen}
        selected={value || new Date()}
        onSelect={onChange}
      />
    </div>
  )
}

