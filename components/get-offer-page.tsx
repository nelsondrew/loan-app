'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ProgressSteps } from './loan-application/ProgressSteps'
import { Sparkles, ChevronRight } from 'lucide-react'
import animationData from "../animations/confetti.json"
import dynamic from 'next/dynamic'

const LottiePlayer = dynamic(() => import('./offer-lottie-player'), { ssr: false });


export default function GetOfferPage({
  setOfferStage = () => {},
} : {
  setOfferStage: Dispatch<SetStateAction<number>>
}) {
  const router = useRouter()
  const [loanAmount] = useState(100000) // This could be fetched from an API or passed as a prop

  const [showConfetti, setShowConfetti] = useState(true);

  // Hide confetti animation after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="relative min-h-screen bg-white">
      {/* Confetti Lottie Animation */}
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <LottiePlayer animationData={animationData} fullScreen />
        </div>
      )}
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

      <div className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-3 bg-[#194DBE]/10 rounded-full">
            <Sparkles className="h-8 w-8 text-[#194DBE]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#194DBE]">
            Congratulations!
          </h1>
          <p className="text-lg text-gray-600">
            You are eligible for an Unsecured Personal Loan of
          </p>
          <div className="text-4xl font-bold text-[#194DBE]">
            ₹{loanAmount.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <h2 className="font-semibold text-gray-700">Next steps:</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Review your loan offer details</li>
            <li>Choose your preferred repayment term</li>
            <li>Complete the final verification process</li>
          </ul>
        </div>

        <Button
          onClick={() => setOfferStage(2)}
          className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full py-6 text-lg"
        >
          Get the money credited
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

