'use client'

import { useState } from 'react'
import { AlertCircle, Upload, Check, RefreshCw, Trash2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OTPVerification } from '../OTPVerification'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PropertyStatus = 'rented' | 'owned' | 'parents';
type FileUpload = {
  file: File;
  uploaded: boolean;
  fileName: string;
};

interface WorkDetailsProps {
  onSubmit: (data: any) => void;
}

export function WorkDetails({ onSubmit }: WorkDetailsProps) {
  const [workEmail, setWorkEmail] = useState('')
  const [workEmailError, setWorkEmailError] = useState(false)
  const [isWorkEmailVerified, setIsWorkEmailVerified] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [officeAddress, setOfficeAddress] = useState('')
  const [officeAddressError, setOfficeAddressError] = useState(false)
  const [salarySlips, setSalarySlips] = useState<(FileUpload | null)[]>([null, null, null])
  const [personalAddress, setPersonalAddress] = useState('')
  const [personalAddressError, setPersonalAddressError] = useState(false)
  const [currentCity, setCurrentCity] = useState('')
  const [currentCityError, setCurrentCityError] = useState(false)
  const [currentLoans, setCurrentLoans] = useState('')
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus | ''>('')
  const [propertyStatusError, setPropertyStatusError] = useState(false)

  const handleFileUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newSalarySlips = [...salarySlips]
      newSalarySlips[index] = { file, uploaded: true, fileName: file.name }
      setSalarySlips(newSalarySlips)
    }
  }

  const handleWorkEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkEmail(e.target.value)
    console.log("yoooo")
    setWorkEmailError(false)
  }

  const handleWorkEmailBlur = () => {
    console.log("triggered blur")
    if (emailRegex.test(workEmail) && !isWorkEmailVerified) {
      setShowOTP(true)
    }
  }

  const handleOTPVerify = (otp: string) => {
    console.log('Work Email OTP Verified:', otp)
    setShowOTP(false)
    setIsWorkEmailVerified(true)
  }

  const handleReupload = (index: number) => () => {
    // const fileInput = document.getElementById(`salary-slip-${index}`) as HTMLInputElement
    // if (fileInput) {
    //   fileInput.click()
    // }
  }

  const handleDelete = (index: number) => () => {
    const newSalarySlips = [...salarySlips]
    newSalarySlips[index] = null
    setSalarySlips(newSalarySlips)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false

    if (!isWorkEmailVerified) {
      setWorkEmailError(true)
      hasError = true
    }

    if (!officeAddress.trim()) {
      setOfficeAddressError(true)
      hasError = true
    }

    if (!personalAddress.trim()) {
      setPersonalAddressError(true)
      hasError = true
    }

    if (!currentCity.trim()) {
      setCurrentCityError(true)
      hasError = true
    }

    if (!propertyStatus) {
      setPropertyStatusError(true)
      hasError = true
    }

    if (salarySlips.some(slip => !slip?.uploaded)) {
      hasError = true
    }

    if (hasError) return

    onSubmit({
      workEmail,
      officeAddress,
      salarySlips,
      personalAddress,
      currentCity,
      currentLoans,
      propertyStatus
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Work email address
        </label>
        <div className="relative">
          <Input
            type="email"
            value={workEmail}
            onChange={handleWorkEmailChange}
            onBlur={handleWorkEmailBlur}
            className={`border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE] ${
              isWorkEmailVerified ? 'bg-gray-50 text-gray-500' : ''
            }`}
            placeholder="Enter your work email"
            disabled={isWorkEmailVerified}
          />
          {isWorkEmailVerified && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
          )}
        </div>
        {workEmailError && (
          <div className="flex items-center gap-2 text-red-500 mt-1">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">Please verify your work email address</p>
          </div>
        )}
        {isWorkEmailVerified && (
          <p className="text-sm text-green-600">Work email verified successfully</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Office address
        </label>
        <Input
          type="text"
          value={officeAddress}
          onChange={(e) => {
            setOfficeAddress(e.target.value)
            setOfficeAddressError(false)
          }}
          className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
          placeholder="Enter your office address"
        />
        {officeAddressError && (
          <div className="flex items-center gap-2 text-red-500 mt-1">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">Please enter your office address</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="text-sm text-gray-600">
          3 months salary slip
        </label>
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative">
            <label 
              htmlFor={`salary-slip-${index}`}
              className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                salarySlips[index]?.uploaded
                  ? 'border-[#194DBE] bg-[#194DBE]/5'
                  : 'border-[#80B7EE] hover:border-[#194DBE]'
              }`}
            >
              {salarySlips[index]?.uploaded ? (
                <>
                  <span className="text-sm truncate mr-2">
                    {salarySlips[index]?.fileName}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleReupload(index)}
                      className="text-[#194DBE] hover:text-[#194DBE]/80"
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-sm">
                    Month {index + 1} salary slip
                  </span>
                  <Upload className="h-5 w-5 text-[#194DBE]" />
                </>
              )}
            </label>
            <input
              type="file"
              id={`salary-slip-${index}`}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload(index)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Personal address
        </label>
        <Input
          type="text"
          value={personalAddress}
          onChange={(e) => {
            setPersonalAddress(e.target.value)
            setPersonalAddressError(false)
          }}
          className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
          placeholder="Enter your personal address"
        />
        {personalAddressError && (
          <div className="flex items-center gap-2 text-red-500 mt-1">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">Please enter your personal address</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Current city
        </label>
        <Input
          type="text"
          value={currentCity}
          onChange={(e) => {
            setCurrentCity(e.target.value)
            setCurrentCityError(false)
          }}
          className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
          placeholder="Enter your current city"
        />
        {currentCityError && (
          <div className="flex items-center gap-2 text-red-500 mt-1">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">Please enter your current city</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Current ongoing loans
        </label>
        <Input
          type="text"
          value={currentLoans}
          onChange={(e) => setCurrentLoans(e.target.value)}
          className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
          placeholder="Enter your current loans (if any)"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Staying in
        </label>
        <Select
          value={propertyStatus}
          onValueChange={(value: PropertyStatus) => {
            setPropertyStatus(value)
            setPropertyStatusError(false)
          }}
        >
          <SelectTrigger className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]">
            <SelectValue placeholder="Select your staying status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rented">Rented property</SelectItem>
            <SelectItem value="owned">Own property</SelectItem>
            <SelectItem value="parents">With parents</SelectItem>
          </SelectContent>
        </Select>
        {propertyStatusError && (
          <div className="flex items-center gap-2 text-red-500 mt-1">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">Please select your staying status</p>
          </div>
        )}
      </div>

      <Button 
        type="submit"
        className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full"
      >
        Submit
      </Button>

      <OTPVerification
        mobileNumber={workEmail}
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
      />
    </form>
  )
}

