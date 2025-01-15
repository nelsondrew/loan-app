"use client";

import { ChangeEvent } from "react";

interface CustomDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export function CustomDatePicker({ value, onChange }: CustomDatePickerProps) {
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value ? new Date(event.target.value) : undefined;
    onChange(selectedDate);
  };

  return (
    <div className="relative">
      <input
        type="date"
        className="w-full p-2 border rounded-md text-base outline-none focus:ring-2 focus:ring-blue-500"
        value={value ? value.toISOString().split("T")[0] : ""}
        onChange={handleDateChange}
      />
    </div>
  );
}
