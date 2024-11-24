import React, { FC } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
 className?:string
  children:React.ReactNode
}

export const Modal: FC<ModalProps> = ({ className, children }) => {
  return (
    <div className={cn('',className)}>
     {children}
    </div>
  )
}