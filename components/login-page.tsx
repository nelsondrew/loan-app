'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, HelpCircle, Headphones, Shield, QrCode } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'username'>('mobile')
  const [mobileNumber, setMobileNumber] = useState('')
  const [username, setUsername] = useState('')

  return (
    <div className="min-h-screen bg-[#80B7EE]/10 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <Image
          src="https://picsum.photos/seed/idfcfirst/150/50"
          alt="IDFC FIRST Bank Logo"
          width={150}
          height={50}
          className="h-12 w-auto"
        />
        <div className="flex gap-4">
          <button className="bg-[#194DBE] rounded-full p-3">
            <Headphones className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-12 pb-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <div className="relative w-32 h-32">
              <Image
                src="https://picsum.photos/seed/securelogin/128/128"
                alt="Security Icon"
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-center text-[#194DBE]">
            Let's get started
          </h1>

          <div className="space-y-4">
            {loginMethod === 'mobile' ? (
              <div className="relative">
                <Input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="pl-24 h-14 text-lg border-[#80B7EE] focus:border-[#194DBE]"
                  placeholder="Mobile number"
                  maxLength={10}
                />
                <button className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-600">
                  +91
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 text-lg pr-12 border-[#80B7EE] focus:border-[#194DBE]"
                  placeholder="Username"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <HelpCircle className="h-6 w-6 text-[#194DBE]" />
                </button>
              </div>
            )}

            <div className="relative">
              <Separator className="my-8" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#80B7EE]/10 px-4 text-gray-500">
                OR
              </span>
            </div>

            <button
              onClick={() => setLoginMethod(loginMethod === 'mobile' ? 'username' : 'mobile')}
              className="w-full h-14 text-lg border-2 border-[#80B7EE] rounded-md hover:border-[#194DBE] transition-colors"
            >
              {loginMethod === 'mobile' ? 'Username' : 'Mobile number'}
            </button>

            {loginMethod === 'username' && (
              <div className="flex justify-end">
                <Link href="#" className="text-[#194DBE] hover:underline">
                  Forgot Username?
                </Link>
              </div>
            )}

            <Button 
              className="w-full h-14 text-lg bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full"
            >
              Proceed to login
            </Button>
          </div>

          <div className="space-y-4 text-center">
            <p>
              <Link href="#" className="text-[#194DBE] hover:underline">
                New to net banking? Activate now
              </Link>
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 text-[#194DBE]">
              <Link href="#" className="hover:underline">Manage your credit card</Link>
              <span>|</span>
              <Link href="#" className="hover:underline">Block/Unblock Netbanking</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 text-[#194DBE]">
              <Link href="#" className="hover:underline">ATM/branch locator</Link>
              <span>|</span>
              <Link href="#" className="hover:underline">Secure Usage Guidelines</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <p>You are reminded to remain cautious when banking online...</p>
              <button className="text-[#80B7EE] hover:underline mt-1">
                read more
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://picsum.photos/seed/dicgc/60/60"
                alt="DICGC Logo"
                width={60}
                height={60}
                className="h-12 w-12"
              />
              <p className="text-sm">
                IDFC FIRST Bank is registered with DICGC (https://www.dicgc.org.in)
              </p>
            </div>
            <QrCode className="h-24 w-24" />
            <p className="w-full text-center">DICGC Website</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

