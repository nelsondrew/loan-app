import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { AlertCircle, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { OTPVerification } from "../otp-verification";
import { sendOtp, verifyOtp } from "@/api";

type AadharMobileInputProps = {
  mobileNumber: string;
  isPhoneVerified: boolean;
  setMobileNumber: Dispatch<SetStateAction<string>>;
  handleKeyPress: Function;
  showOTP: boolean;
  showWorkDetails: boolean;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  setIsPhoneVerified: Dispatch<SetStateAction<boolean>>;
}

const AadharMobileInput = ({
  mobileNumber = '',
  isPhoneVerified = false,
  setMobileNumber = () => { },
  setShowOTP = () => { },
  showOTP = false,
  showWorkDetails = false,
  setIsPhoneVerified = () => { },
}: AadharMobileInputProps) => {
  const [mobileError, setMobileError] = useState(null);
  const [otpError, setOtpError] = useState(null);

  const handleAadharMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPhoneVerified) {
      setMobileNumber(e.target.value)
    }
  }

  const handleShowOTP = useCallback(async () => {
    if (mobileNumber.length === 10 && !isPhoneVerified) {
      const result = await sendOtp(`+91${mobileNumber}`);
      if (result?.error) {
        setMobileError(result?.error);
        return;
      }

      if (result?.mobileNumberVerified) {
        setShowOTP(false);
        setMobileError(null);
        setOtpError(null);
        setIsPhoneVerified(true);
        return;
      }

      setMobileError(null);
      setShowOTP(true)
    }
  }, [mobileNumber, isPhoneVerified])


  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleShowOTP()
    }
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      await handleShowOTP()
    }, 300)

    return () => clearTimeout(timer)
  }, [mobileNumber, handleShowOTP]);


  const handleOTPVerify = async (otp: string) => {
    const result = await verifyOtp(mobileNumber, otp);
    if (result?.error) {
      setOtpError(result?.error);
      return;
    }
    setOtpError(null);
    setShowOTP(false)
    setIsPhoneVerified(true)
  }

  const handleOtpClose = () => setShowOTP(false);
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          Enter Aadhaar linked mobile number
        </label>
        <div className="relative">
          <Input
            type="tel"
            value={mobileNumber}
            onChange={handleAadharMobileChange}
            onKeyPress={handleKeyPress}
            className={`pl-12 border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE] ${isPhoneVerified ? 'bg-gray-50 text-gray-500' : ''
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
        {mobileError && (
          <div className="flex items-center text-red-500 text-sm mt-1">
            <AlertCircle className="h-4 w-4 mr-1" />
            {mobileError}
          </div>
        )}
      </div>
      <OTPVerification
        mobileNumber={mobileNumber}
        isOpen={showOTP && !showWorkDetails}
        onClose={handleOtpClose}
        onVerify={handleOTPVerify}
        error={otpError}
        setError={setOtpError}
      />
    </>

  )
}

export default AadharMobileInput;