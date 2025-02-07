"use client"
import GetOfferPage from '@/components/get-offer-page'
import ProcessingFee from '@/components/processing-fee'
import VerificationStatus from '@/components/verification-status'
import { useState } from 'react'

export default function GetOffer({
  searchParams
}) {
  const { phoneNumber = '', email = '', customerId = '', amount = '', stage = 0 } = searchParams.data ? JSON.parse(decodeURIComponent(searchParams.data)) : null
  const [offerStage, setOfferStage] = useState(1);


  if (offerStage === 3 || stage === 5) {
    return <VerificationStatus />
  }

  if (offerStage === 1) {
    return <GetOfferPage setOfferStage={setOfferStage} />
  }

  if (offerStage === 2) {
    return (
      <ProcessingFee paymentData={{
        phoneNumber,
        email : email || "test@test.com",
        customerId,
        amount: 99
      }}
        setOfferStage={setOfferStage}
      />)
  }



}

