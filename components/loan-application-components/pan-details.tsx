import React, { Dispatch, SetStateAction } from "react";
import { AlertCircle, Check } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { CustomDatePicker } from "../custom-date-picker";
import PanMobileInput from "./pan-mobile";

type PanMobileDetailsProps = {
    showAadhaar: boolean;
    panNumber: string;
    setPanNumber: Dispatch<SetStateAction<string>>;
    isPhoneVerified: boolean;
    isPanValid: boolean;
    panName: string;
    setPanName: Dispatch<SetStateAction<string>>;
    dateOfBirth?: Date;
    aadhaarNumber: string;
    aadhaarError: boolean,
    setAadhaarNumber: Dispatch<SetStateAction<string>>;
    setAadhaarError: Dispatch<SetStateAction<boolean>>;
    setDateOfBirth: Dispatch<SetStateAction<Date | undefined>>;

}

const PanDetailsInput = ({
    showAadhaar = false,
    panNumber = '',
    setPanNumber = () => { },
    isPhoneVerified = false,
    isPanValid = false,
    panName = '',
    setPanName = () => { },
    dateOfBirth,
    aadhaarNumber = '',
    aadhaarError = false,
    setAadhaarNumber,
    setAadhaarError,
    setDateOfBirth,
}: PanMobileDetailsProps) => {


    return (
        <>
            {isPhoneVerified && (
                <PanMobileInput
                    showAadhaar={showAadhaar}
                    panNumber={panNumber}
                    setPanNumber={setPanNumber}
                />
            )}

            {isPanValid && (
                <>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                            Name as per PAN Card
                        </label>
                        <div className="relative">
                            <Input
                                type="text"
                                value={panName}
                                onChange={(e) => !showAadhaar && setPanName(e.target.value.toUpperCase())}
                                className="uppercase border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                                disabled={showAadhaar}
                            />
                            {showAadhaar && (
                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-gray-600">
                            Date of Birth
                        </label>
                        <div className="relative">
                            <CustomDatePicker
                                value={dateOfBirth}
                                onChange={(date) => !showAadhaar && setDateOfBirth(date)}
                            />
                            {showAadhaar && dateOfBirth && (
                                <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
                            )}
                        </div>
                    </div>

                    {showAadhaar && (
                        <div className="space-y-2">
                            <label className="text-sm text-gray-600">
                                Aadhaar Number (12-digits)
                            </label>
                            <Input
                                type="text"
                                value={aadhaarNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '')
                                    setAadhaarNumber(value)
                                    setAadhaarError(false)
                                }}
                                maxLength={12}
                                className="border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                                placeholder="Enter your Aadhaar number"
                            />
                            {aadhaarError && (
                                <div className="flex items-center gap-2 text-red-500 mt-1">
                                    <AlertCircle className="h-4 w-4" />
                                    <p className="text-sm">Please enter your Aadhaar number</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default PanDetailsInput;