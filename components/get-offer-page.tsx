'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ProgressSteps } from './loan-application/ProgressSteps'
import { Sparkles, ChevronRight, Loader2 } from 'lucide-react'
import cookie from 'cookie'
import { db } from "../firebase/index"
import { collection, getDocs, query, where } from 'firebase/firestore'

function cookieParse(cookieString) {
  const cookies = {};
  const cookieArray = cookieString.split(';');

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key && value) {
      cookies[key.trim()] = decodeURIComponent(value.trim());
    }
  });

  return cookies;
}


export default function GetOfferPage() {
  const router = useRouter()
  const [loanAmount] = useState(100000) // This could be fetched from an API or passed as a prop
  const [isLoading, setIsLoading] = useState(true) // Initially loading
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Get phoneNumber from cookies
        const cookies = cookieParse(document.cookie);
        const phoneNumber = cookies.phoneNumber || '';
    
        if (!phoneNumber) {
          router.push('/'); // Redirect if no phoneNumber found
          return;
        }
    
        // Fetch user from the 'user-ids' collection by phoneNumber
        const userRef = collection(db, 'user-ids');
        const q = query(userRef, where('phoneNumber', '==', `${phoneNumber}`));
        const userSnapshot = await getDocs(q);
    
        if (userSnapshot.empty) {
          router.push('/'); // Redirect if user is not found
          return;
        }
    
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
    
        // Check if the user has stage 4
        if (userData.stage === 4) {
          setHasAccess(true); // User has access to this page
        } else {
          router.push('/'); // Redirect if stage is not 4
        }
      } catch (err) {
        console.error('Error checking user:', err);
        router.push('/'); // Redirect on error
      } finally {
        setIsLoading(false); // Stop loader after the check is done
      }
    };

    checkUserStatus()
  }, [router]) // Run the check when the component mounts

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If the user has access, render the main content
  if (hasAccess) {
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
            onClick={() => router.push('/loan-details')}
            className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full py-6 text-lg"
          >
            View Loan Details
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    )
  }

  // If the user doesn't have access, show a blank page or redirect
  return null
}
