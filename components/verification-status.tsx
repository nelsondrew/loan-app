'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardCheck, Clock, CheckCircle } from 'lucide-react'
import Image from "next/image"
import { ProgressSteps } from "./loan-application/ProgressSteps"

export default function VerificationStatus() {
  return (
    <div className="min-h-screen">
       <div className="p-4 flex items-center justify-between border-b">
             <Image
               src="/aasra_vikas_small.png"
               alt="Aasra Vikas Logo"
               width={120}
               height={40}
               className="h-10 w-auto"
             />
           </div>
     
           <ProgressSteps currentStep={2} />

      <Card className="max-w-md mx-auto border-0 shadow-none">
        <CardContent className="pt-6 px-4 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#194DBE]/10 rounded-full flex items-center justify-center">
              <ClipboardCheck className="w-10 h-10 text-[#194DBE]" />
            </div>
          </div>

          <h1 className="text-[28px] font-bold text-[#194DBE] mb-4">
            Documents Under Verification
          </h1>
          
          <p className="text-gray-600 text-[17px] mb-8">
            We've received your documents and they are currently under review. This process typically takes 2-3 business days.
          </p>

          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-[#194DBE] mr-2" />
              <h2 className="text-[20px] font-semibold text-gray-700 text-left">
                Estimated Timeline:
              </h2>
            </div>
            <p className="text-gray-600 text-left mb-4">
              Your documents will be verified within 2-3 business days. We'll notify you as soon as the verification is complete.
            </p>
            <div className="flex items-center text-[#194DBE]">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Payment Received: ₹99</span>
            </div>
          </div>

          <Button className="w-full text-[17px] py-6 bg-[#194DBE] hover:bg-[#194DBE]/90" size="lg">
            Check Status
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

