interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = ['Verify Details', 'Get Offer', 'Get Money']

  return (
    <div className="flex justify-between px-4 py-3 bg-[#80B7EE]/10">
      {steps.map((stepName, index) => (
        <div 
          key={stepName}
          className={`flex flex-col items-center flex-1 ${
            index === 0 ? '' : 'border-l border-[#80B7EE]/20'
          }`}
        >
          <span className={`text-sm ${
            index + 1 === currentStep ? 'text-[#194DBE] font-medium' : 'text-gray-400'
          }`}>
            {stepName}
          </span>
        </div>
      ))}
    </div>
  )
}

