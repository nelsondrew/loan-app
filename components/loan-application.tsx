'use client'

import { useState, KeyboardEvent, useEffect, useCallback } from 'react'
import { X, Check, AlertCircle, Upload, RefreshCw, Trash2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EmailOTPVerification } from './email-otp-verification'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { panDetailsApi, sendOtp, verifyOtp } from "@/api"
import AadharMobileInput from './loan-application-components/aadhar-mobile'
import PanDetailsInput from './loan-application-components/pan-details'
import { ApplicantDetails } from '@/types'

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const aadhaarRegex = /^\d{12}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPAN(pan: string) {
  return panRegex.test(pan);
}

type EmploymentType = 'salaried' | 'self-employed';
type PropertyStatus = 'rented' | 'owned' | 'parents';
type FileUpload = {
  file: File;
  uploaded: boolean;
  fileName: string;
};

export default function LoanApplication() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [mobileNumber, setMobileNumber] = useState('')
  const [panNumber, setPanNumber] = useState('')
  const [panName, setPanName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [agreed, setAgreed] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isPanValid, setIsPanValid] = useState(false)
  const [showAadhaar, setShowAadhaar] = useState(false)
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [aadhaarError, setAadhaarError] = useState(false)
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [employmentType, setEmploymentType] = useState<EmploymentType>('salaried')
  const [salary, setSalary] = useState('')
  const [salaryError, setSalaryError] = useState(false)
  const [showWorkDetails, setShowWorkDetails] = useState(false)
  const [workEmail, setWorkEmail] = useState('')
  const [workEmailError, setWorkEmailError] = useState(false)
  const [isWorkEmailVerified, setIsWorkEmailVerified] = useState(false)
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

  const steps = ['Verify Details', 'Get Offer', 'Get Money']

  useEffect(() => {
    setIsPanValid(isValidPAN(panNumber))
  }, [panNumber])

  const handleProceed = async (e: React.FormEvent) => {
    // pan details handler , call stage 1 api 
    e.preventDefault()
    if (isPhoneVerified && isPanValid && panName && dateOfBirth && agreed) {
      const result = await panDetailsApi({
        panName,
        panNumber,
        dateOfBirth,
        phoneNumber: mobileNumber
      });
      console.log(result);
      setShowAadhaar(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aadhaarRegex.test(aadhaarNumber)) {
      setAadhaarError(true)
      return
    }
    setAadhaarError(false)
    setShowAdditionalDetails(true)
  }

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false

    if (!emailRegex.test(email)) {
      setEmailError(true)
      hasError = true
    }

    if (!salary || isNaN(Number(salary)) || Number(salary) <= 0) {
      setSalaryError(true)
      hasError = true
    }

    if (hasError) return

    console.log({
      mobileNumber,
      panNumber,
      panName,
      dateOfBirth,
      aadhaarNumber,
      email,
      employmentType,
      salary,
      agreed
    })
    // Handle final submission
  }

  const handleOTPVerify = async (otp: string) => {
    const result = await verifyOtp(mobileNumber, otp);
    console.log(result);
    console.log('OTP Verified:', otp)
    setShowOTP(false)
    if (showWorkDetails) {
      setIsWorkEmailVerified(true)
    } else {
      setIsPhoneVerified(true)
    }
  }

  const formatSalary = (value: string) => {
    const number = value.replace(/[^0-9]/g, '')
    if (number === '') return ''
    return new Intl.NumberFormat('en-IN').format(parseInt(number))
  }

  const handleWorkDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false

    if (!isWorkEmailVerified) {
      setWorkEmailError(true)
      hasError = true
    }

    if (!emailRegex.test(workEmail)) {
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

    console.log({
      workEmail,
      officeAddress,
      salarySlips,
      personalAddress,
      currentCity,
      currentLoans,
      propertyStatus
    })
    router.push('/get-offer')
    // Handle final submission
  }

  const handleFileUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newSalarySlips = [...salarySlips]
      newSalarySlips[index] = { file, uploaded: true, fileName: file.name }
      setSalarySlips(newSalarySlips)
    }
  }

  const handleReupload = (index: number) => () => {
    // const fileInput = document.getElementById(`salary-slip-${index}`) as HTMLInputElement
    // if (fileInput) {
    //   fileInput.click()
    // }
  }

  const handleDelete = (index: number) => (e) => {
    const newSalarySlips = [...salarySlips]
    newSalarySlips[index] = null
    setSalarySlips(newSalarySlips)
    e.stopPropagation();
  }

  const handleAdditionalDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let hasError = false

    if (!emailRegex.test(email)) {
      setEmailError(true)
      hasError = true
    }

    if (!salary || isNaN(Number(salary.replace(/[^0-9]/g, ''))) || Number(salary.replace(/[^0-9]/g, '')) <= 0) {
      setSalaryError(true)
      hasError = true
    }

    if (hasError) return
    setShowAdditionalDetails(false);
    setShowWorkDetails(true)
  }

  const simulateStage = ({
    stage = 0,
    applicantDetails,
  }: {
    stage : number;
    applicantDetails : ApplicantDetails
  }) => {
    // if the stage value is 1
    // then we have the pan details and we should go to stage 1
    if(stage === 1) {
      setIsPhoneVerified(true);
      setIsPanValid(true);
      setPanName(applicantDetails.panName);
      // @ts-ignore
      setDateOfBirth(new Date(applicantDetails.dob));
      setShowAadhaar(true);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 flex items-center justify-between border-b">

        <Image
          src="/aasra_vikas_small.png"
          alt="Aasra Vikas Logo"
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

      <div className="flex justify-between px-4 py-3 bg-[#80B7EE]/10">
        {steps.map((stepName, index) => (
          <div
            key={stepName}
            className={`flex flex-col items-center flex-1 ${index === 0 ? '' : 'border-l border-[#80B7EE]/20'
              }`}
          >
            <span className={`text-sm ${index + 1 === step ? 'text-[#194DBE] font-medium' : 'text-gray-400'
              }`}>
              {stepName}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={
          showWorkDetails
            ? handleWorkDetailsSubmit
            : showAdditionalDetails
              ? handleAdditionalDetailsSubmit
              : showAadhaar
                ? handleSubmit
                : handleProceed
        }
        className="p-6 space-y-6"
      >
        <h1 className="text-2xl font-semibold text-[#194DBE]">
          {showWorkDetails
            ? "Help us with your work details"
            : showAdditionalDetails
              ? "Help us with some more details"
              : "Let's Get Started"}
        </h1>

        <div className="space-y-4">
          {!showAdditionalDetails && !showWorkDetails ? (
            <>
              <AadharMobileInput
                isPhoneVerified={isPhoneVerified}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                showOTP={showOTP}
                setShowOTP={setShowOTP}
                showWorkDetails={showWorkDetails}
                handleOTPVerify={handleOTPVerify}
                setIsPhoneVerified={setIsPhoneVerified}
                simulateStage={simulateStage}
              />
              <PanDetailsInput
                showAadhaar={showAadhaar}
                panNumber={panNumber}
                setPanNumber={setPanNumber}
                isPhoneVerified={isPhoneVerified}
                isPanValid={isPanValid}
                panName={panName}
                setPanName={setPanName}
                dateOfBirth={dateOfBirth}
                aadhaarNumber={aadhaarNumber}
                aadhaarError={aadhaarError}
                setAadhaarNumber={setAadhaarNumber}
                setAadhaarError={setAadhaarError}
                setDateOfBirth={setDateOfBirth}
              />
            </>
          ) : (
            <>
              {showAdditionalDetails && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Personal email ID
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailError(false)
                      }}
                      className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                      placeholder="Enter your email address"
                    />
                    {emailError && (
                      <div className="flex items-center gap-2 text-red-500 mt-1">
                        <AlertCircle className="h-4 w-4" />
                        <p className="text-sm">Please enter a valid email address</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Employment Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={employmentType === 'salaried' ? 'default' : 'outline'}
                        onClick={() => setEmploymentType('salaried')}
                        className={employmentType === 'salaried' ? 'bg-[#194DBE]' : 'border-[#80B7EE]'}
                      >
                        Salaried
                      </Button>
                      <Button
                        type="button"
                        variant={employmentType === 'self-employed' ? 'default' : 'outline'}
                        onClick={() => setEmploymentType('self-employed')}
                        className={employmentType === 'self-employed' ? 'bg-[#194DBE]' : 'border-[#80B7EE]'}
                      >
                        Self-employed
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Net monthly in-hand salary
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <Input
                        type="text"
                        value={salary}
                        onChange={(e) => {
                          setSalary(formatSalary(e.target.value))
                          setSalaryError(false)
                        }}
                        className="pl-8 border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                        placeholder="Enter your monthly salary"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Do not include incentives, bonuses or any one-time payments.
                    </p>
                    {salaryError && (
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <p className="text-sm">Please enter a valid salary amount</p>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 space-y-2">
                    <h3 className="font-medium">For a quick loan application process, keep these documents handy:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      <li>PAN Card</li>
                      <li>Aadhaar Card</li>
                      <li>Last 3 month's bank statements of salary account or net banking credentials</li>
                    </ul>
                  </div>
                </>
              )}

              {showWorkDetails && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Work email address
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={workEmail}
                        onChange={(e) => {
                          setWorkEmail(e.target.value)
                          setWorkEmailError(false)
                        }}
                        onBlur={() => {
                          if (emailRegex.test(workEmail) && !isWorkEmailVerified) {
                            setShowOTP(true)
                          }
                        }}
                        className={`border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE] ${isWorkEmailVerified ? 'bg-gray-50 text-gray-500' : ''
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
                          className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${salarySlips[index]?.uploaded
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
                                  onClick={e => {
                                    e.preventDefault();
                                    handleDelete(index)(e)
                                    e.stopPropagation();
                                  }}
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
                </>
              )}
            </>
          )}

          {!showWorkDetails && !showAdditionalDetails && (
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
          )}

          {((panName && dateOfBirth && !showAadhaar) || showAadhaar || showAdditionalDetails || showWorkDetails) && (
            <Button
              type="submit"
              className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full"
              disabled={!showWorkDetails && !showAdditionalDetails && !agreed}
            >
              {showWorkDetails
                ? 'Submit'
                : showAdditionalDetails
                  ? 'Continue'
                  : showAadhaar
                    ? 'Submit'
                    : 'Proceed'}
            </Button>
          )}
        </div>
      </form>

      <EmailOTPVerification
        email={workEmail}
        isOpen={showOTP && showWorkDetails}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
      />
    </div>
  )
}

