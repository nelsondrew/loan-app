import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function setPhoneNumberCookie(phoneNumber: string) {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Set expiry to 1 year from now

  document.cookie = `phoneNumber=${encodeURIComponent(`+91${phoneNumber}`)}; path=/; expires=${expiryDate.toUTCString()}; secure; samesite=strict`;
}