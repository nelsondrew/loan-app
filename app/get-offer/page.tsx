"use client"
import GetOfferPage from '@/components/get-offer-page'
import ProcessingFee from '@/components/processing-fee'
import { useState } from 'react'

export default function GetOffer() {
 const [offerStage, setOfferStage] = useState(1);

 if(offerStage === 1) {
   return <GetOfferPage setOfferStage={setOfferStage}/>
 }

 if(offerStage === 2) {
  return <ProcessingFee/>
 }

}

