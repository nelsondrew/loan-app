'use client'

import { useState, KeyboardEvent, useEffect } from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { CustomDatePicker } from '../CustomDatePicker'
import Link from 'next/link'

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const aadhaarRegex = /^\d{12}$/;

function isValidPAN(pan: string) {
  return panRegex.test(pan);
}

function maskPAN(pan: string) {
  return `XXXXXXXX${pan.slice(-2)}`;
}

interface VerifyDetailsProps {
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  isPhoneVerified: boolean;
  showAadhaar: boolean;
  handleShowOTP: () => void;
  onSubmit: () => void;
}

export function VerifyDetails({
  mobileNumber,
  setMobileNumber,
  isPhoneVerified,
  showAadhaar,
  handleShowOTP,
  onSubmit
}: VerifyDetailsProps) {
  const [panNumber, setPanNumber] = useState('')
  const [panName, setPanName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [agreed, setAgreed] = useState(false)
  const [isPanValid, setIsPanValid] = useState(false)
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [aadhaarError, setAadhaarError] = useState(false)

  useEffect(() => {
    setIsPanValid(isValidPAN(panNumber))
  }, [panNumber])

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleShowOTP()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (showAadhaar && !aadhaarRegex.test(aadhaarNumber)) {
      setAadhaarError(true)
      return
    }
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Enter Aadhaar linked mobile number
        </label>
        <div className="relative">
          <Input
            type="tel"
            value={mobileNumber}
            onChange={(e) => !isPhoneVerified && setMobileNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`pl-12 border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE] ${
              isPhoneVerified ? 'bg-gray-50 text-gray-500' : ''
            }`}
            maxLength={10}
            pattern="[0-9]{10}"
            disabled={isPhoneVerified}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            +91
          </span>
          {mobileNumber.length === 10 && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
          )}
        </div>
      </div>

      {isPhoneVerified && (
        <div className="space-y-2">
          <label className="text-sm text-gray-600">
            PAN Number
          </label>
          <div className="relative">
            <Input
              type="text"
              value={showAadhaar ? maskPAN(panNumber) : panNumber}
              onChange={(e) => !showAadhaar && setPanNumber(e.target.value.toUpperCase())}
              maxLength={10}
              className="uppercase border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
              disabled={showAadhaar}
            />
            {showAadhaar && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
            )}
          </div>
        </div>
      )}

      {isPanValid && (
        <>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">
              Name as per PAN Card
            </label>
            <div className="relative">
              <Input
                type="text"
                value={panName}
                onChange={(e) => !showAadhaar && setPanName(e.target.value.toUpperCase())}
                className="uppercase border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                disabled={showAadhaar}
              />
              {showAadhaar && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600">
              Date of Birth
            </label>
            <div className="relative">
              <CustomDatePicker
                value={dateOfBirth}
                onChange={(date) => !showAadhaar && setDateOfBirth(date)}
              />
              {showAadhaar && dateOfBirth && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
              )}
            </div>
          </div>

          {showAadhaar && (
            <div className="space-y-2">
              <label className="text-sm text-gray-600">
                Aadhaar Number (12-digits)
              </label>
              <Input
                type="text"
                value={aadhaarNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '')
                  setAadhaarNumber(value)
                  setAadhaarError(false)
                }}
                maxLength={12}
                className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                placeholder="Enter your Aadhaar number"
              />
              {aadhaarError && (
                <div className="flex items-center gap-2 text-red-500 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">Please enter your Aadhaar number</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="flex items-start space-x-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="border-[#80B7EE] data-[state=checked]:bg-[#194DBE] data-[state=checked]:border-[#194DBE]"
          />
          <label 
            htmlFor="terms" 
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Agree to{' '}
            <Link href="#" className="text-[#194DBE] underline">
              T&C
            </Link>
            {' '}and use of my KYC details from Cersai/UIDAI
          </label>
        </div>
      </div>

      {((panName && dateOfBirth && !showAadhaar) || showAadhaar) && (
        <Button 
          type="submit"
          className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full"
          disabled={!agreed}
        >
          {showAadhaar ? 'Submit' : 'Proceed'}
        </Button>
      )}
    </form>
  )
}

