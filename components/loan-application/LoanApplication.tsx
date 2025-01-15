'use client'

import { useState, useCallback } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { OTPVerification } from '../OTPVerification'
import { VerifyDetails } from './VerifyDetails'
import { AdditionalDetails } from './AdditionalDetails'
import { WorkDetails } from './WorkDetails'
import { ProgressSteps } from './ProgressSteps'

export default function LoanApplication() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showOTP, setShowOTP] = useState(false)
  const [mobileNumber, setMobileNumber] = useState('')
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [showAadhaar, setShowAadhaar] = useState(false)
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false)
  const [showWorkDetails, setShowWorkDetails] = useState(false)
  const [additionalDetails, setAdditionalDetails] = useState({
    email: '',
    employmentType: 'salaried',
    salary: ''
  })

  const handleShowOTP = useCallback(() => {
    if (mobileNumber.length === 10 && !isPhoneVerified) {
      setShowOTP(true)
    }
  }, [mobileNumber, isPhoneVerified])

  const handleOTPVerify = (otp: string) => {
    console.log('OTP Verified:', otp)
    setShowOTP(false)
    setIsPhoneVerified(true)
  }

  const handleVerifyDetailsSubmit = () => {
    setShowAadhaar(true)
  }

  const handleAadhaarSubmit = () => {
    setShowAdditionalDetails(true)
    setStep(2)
  }

  const handleAdditionalDetailsSubmit = (details: typeof additionalDetails) => {
    setAdditionalDetails(details)
    setShowWorkDetails(true)
    setShowAdditionalDetails(false)
  }

  const handleWorkDetailsSubmit = (data: any) => {
    console.log('Final submission:', { ...additionalDetails, ...data })
    // Navigate to the Get Offer page
    router.push('/get-offer')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 flex items-center justify-between border-b">
        <Image
          src="https://picsum.photos/seed/firstmoney/120/40"
          alt="First Money Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
        <button 
          className="p-2"
          onClick={() => router.push('/login')}
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <ProgressSteps currentStep={showWorkDetails ? 2 : step} />

      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-[#194DBE]">
          {showWorkDetails 
            ? "Help us with your work details"
            : showAdditionalDetails 
              ? "Help us with some more details" 
              : "Let's Get Started"}
        </h1>
        
        {!showAdditionalDetails && !showWorkDetails && (
          <VerifyDetails
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            isPhoneVerified={isPhoneVerified}
            showAadhaar={showAadhaar}
            handleShowOTP={handleShowOTP}
            onSubmit={showAadhaar ? handleAadhaarSubmit : handleVerifyDetailsSubmit}
          />
        )}

        {showAdditionalDetails && (
          <AdditionalDetails 
            onSubmit={handleAdditionalDetailsSubmit}
            initialValues={additionalDetails}
          />
        )}

        {showWorkDetails && (
          <WorkDetails 
            onSubmit={handleWorkDetailsSubmit}
          />
        )}
      </div>

      <OTPVerification
        mobileNumber={mobileNumber}
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
      />
    </div>
  )
}

