'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface AdditionalDetailsProps {
  onSubmit: (details: {
    email: string;
    employmentType: 'salaried' | 'self-employed';
    salary: string;
  }) => void;
  initialValues: {
    email: string;
    employmentType: 'salaried' | 'self-employed';
    salary: string;
  };
}

export function AdditionalDetails({ onSubmit, initialValues }: AdditionalDetailsProps) {
  const [email, setEmail] = useState(initialValues.email)
  const [emailError, setEmailError] = useState(false)
  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed'>(initialValues.employmentType)
  const [salary, setSalary] = useState(initialValues.salary)
  const [salaryError, setSalaryError] = useState(false)

  const formatSalary = (value: string) => {
    const number = value.replace(/[^0-9]/g, '')
    if (number === '') return ''
    return new Intl.NumberFormat('en-IN').format(parseInt(number))
  }

  const handleSubmit = (e: React.FormEvent) => {
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

    onSubmit({ email, employmentType, salary })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Button 
        type="submit"
        className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full"
      >
        Continue
      </Button>
    </form>
  )
}

