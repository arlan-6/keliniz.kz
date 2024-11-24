import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Toaster } from "@/components/ui/sonner"
interface SaveYourInviteAlertProps {
 className?:string
  
}

export const SaveYourInviteAlert: FC<SaveYourInviteAlertProps> = ({ className,  }) => {
  return (
    <div className={cn('',className)}>
     SaveYourInviteAlert
    </div>
  )
}