'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Info, Sparkles, CheckCircle, CreditCard } from 'lucide-react'
import { ProgressSteps } from './loan-application/ProgressSteps'
import Image from 'next/image'

export default function ProcessingFee({ paymentData }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false); // New state to track payment success

    // Send message to parent to initiate payment
    const handlePayment = () => {
        setLoading(true);
        console.log("window top message sent");
        window.top.postMessage(
            { event: 'start-payment', data: paymentData },
            "*"
        );
    };

    // Listen for the result from the parent
    useEffect(() => {
        const handleMessageFromParent = (event) => {
            const result = event.data;

            if (result.event === 'payment-completed') {
                switch (result.status) {
                    case 'success':
                        console.log('Payment successful!');
                        setError(null); // Clear any previous errors
                        setLoading(false);
                        setPaymentSuccess(true); // Set payment success
                        // You can implement any other success logic here (e.g., redirect, show success modal)
                        break;
                    case 'failed':
                        console.log('Payment failed:', result.errorMessage);
                        setError('Payment failed. Please try again.');
                        setLoading(false);
                        setPaymentSuccess(false); // Reset payment success if failed
                        // Handle the failure (e.g., retry logic, display failure message)
                        break;
                    case 'redirect':
                        console.log('Payment redirected.');
                        setError(null);
                        setLoading(false);
                        setPaymentSuccess(false); // Reset if redirected
                        // Handle redirection (e.g., notify user that payment is being processed)
                        break;
                }
            }
        };

        window.addEventListener('message', handleMessageFromParent);
        return () => {
            window.removeEventListener('message', handleMessageFromParent);
        };
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
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
                    <div className="flex justify-center items-center mb-6">
                        <Sparkles className="w-8 h-8 text-[#194DBE] mr-2" />
                        <h1 className="text-[28px] font-bold text-[#194DBE]">
                            You're One Step Away!
                        </h1>
                    </div>

                    <p className="text-gray-600 text-[17px] mb-8">
                        Complete the verification process to get your loan of ₹1,00,000 sanctioned.
                    </p>

                    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="w-6 h-6 text-[#194DBE] mr-2" />
                            <h2 className="text-[20px] font-semibold text-gray-700 text-left">
                                Payment Details:
                            </h2>
                        </div>
                        <div className="space-y-4 mb-6 text-left">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Loan Amount</span>
                                <span className="font-semibold">₹1,00,000</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Processing Fee</span>
                                <span className="font-semibold">₹99</span>
                            </div>
                            <div className="border-t pt-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total Payable Now</span>
                                    <span className="font-semibold text-[#194DBE]">₹99</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-8">
                        <div className="flex items-start">
                            <Info className="h-5 w-5 text-[#194DBE] mt-0.5 mr-2 flex-shrink-0" />
                            <p className="text-sm text-gray-600 text-left">
                                The processing fee of ₹99 is required for the verification of documents and is an important part of the loan sanctioning process.
                            </p>
                        </div>
                    </div>

                    <Button
                        className="w-full text-[17px] py-6 bg-[#194DBE] hover:bg-[#194DBE]/90"
                        size="lg"
                        onClick={handlePayment}
                        disabled={loading || paymentSuccess} // Disable if payment is successful
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <span className="loader mr-2" /> Processing...
                            </span>
                        ) : paymentSuccess ? (
                            <span className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Payment Successful
                            </span>
                        ) : (
                            <>
                                <CreditCard className="w-5 h-5 mr-2" />
                                Pay ₹99 & Continue
                            </>
                        )}
                    </Button>

                    {error && (
                        <p className="mt-4 text-red-600 text-sm">
                            {error}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
