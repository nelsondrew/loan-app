'use client'

import { useState, useEffect } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { CircularTimer } from './circular-timer'

interface OTPVerificationProps {
  contactInfo?: string
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
}

export function OTPVerification({ contactInfo, isOpen, onClose, onVerify }: OTPVerificationProps) {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setCanResend(true)
    }
    return () => clearInterval(timer)
  }, [countdown, canResend])

  const handleResend = () => {
    if (canResend) {
      setCountdown(30)
      setCanResend(false)
      // Add resend OTP logic here
    }
  }

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setOtp(value)
    setError(false)
    if (value.length === 6) {
      onVerify(value)
    }
  }

  const isEmail = contactInfo?.includes('@') ?? false
  const formattedContact = contactInfo
  ? isEmail
    ? contactInfo
    : `+91 ${contactInfo?.slice(0, 5)} ${contactInfo?.slice(5)}`
  : 'your contact'

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="p-0 rounded-t-xl">
        <div className="p-6 pb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Enter OTP</h2>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            OTP sent to {formattedContact} for verification
          </p>

          <div className="space-y-4">
            <Input
              type="tel"
              value={otp}
              onChange={handleOTPChange}
              maxLength={6}
              className="text-2xl tracking-[1em] font-mono h-12 text-center border-t-0 border-x-0 border-b-2 rounded-none focus:border-[#194DBE] transition-colors [&:not(:placeholder-shown)]:text-center"
              placeholder="______"
              style={{ caretColor: '#194DBE' }}
            />

            {error && (
              <div className="flex items-center gap-2 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">Please enter 6 digit OTP</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`text-sm ${
                  canResend
                    ? 'text-[#194DBE] hover:underline cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                Resend OTP
              </button>
              {!canResend && <CircularTimer duration={30} currentTime={countdown} />}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

