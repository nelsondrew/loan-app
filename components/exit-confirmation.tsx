'use client'

import { Info } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

interface ExitConfirmationProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExitConfirmation({ open, onOpenChange }: ExitConfirmationProps) {
  const router = useRouter()

  const handleExit = () => {
    router.push('/')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="rounded-full bg-[#194DBE]/10 p-3">
            <Info className="h-6 w-6 text-[#194DBE]" />
          </div>
          
          <h2 className="text-xl font-semibold text-center">
            Are you sure you want to exit from this screen?
          </h2>
          
          <div className="flex flex-col w-full gap-3 pt-4">
            <Button
              onClick={handleExit}
              className="w-full bg-[#194DBE] hover:bg-[#194DBE]/90 text-white rounded-full py-6"
            >
              Yes
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              className="text-[#194DBE] hover:text-[#194DBE]/90 hover:bg-[#80B7EE]/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

