import React, { Dispatch, SetStateAction } from "react";
import { Check } from 'lucide-react'
import { Input } from "@/components/ui/input"


function maskPAN(pan: string) {
    return `XXXXXXXX${pan.slice(-2)}`;
}

type PanMobileInputProps = {
    showAadhaar: boolean;
    panNumber: string;
    setPanNumber: Dispatch<SetStateAction<string>>;

}

const PanMobileInput = ({
    showAadhaar = false,
    panNumber = '',
    setPanNumber = () => { },
}: PanMobileInputProps) => {


    return (
        <div className="space-y-2">
            <label className="text-sm text-gray-600">
                PAN Number
            </label>
            <div className="relative">
                <Input
                    type="text"
                    value={showAadhaar ? maskPAN(panNumber) : panNumber}
                    onChange={(e) => !showAadhaar && setPanNumber(e.target.value.toUpperCase())}
                    maxLength={10}
                    className="uppercase border-[#80B7EE] focus:ring-[#194DBE] focus:border-[#194DBE]"
                    disabled={showAadhaar}
                />
                {showAadhaar && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-[#194DBE] h-5 w-5" />
                )}
            </div>
        </div>
    )
}

export default PanMobileInput;