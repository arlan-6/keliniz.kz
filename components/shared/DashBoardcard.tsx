import React, { FC } from 'react'
import { cn } from '@/lib/utils'

interface DashBoardcardProps {
 className?:string
  children?: React.ReactNode
}

export const DashBoardcard: FC<DashBoardcardProps> = ({ className, children }) => {
  return (
    <div className={cn('p-3 border-1 shadow-lg rounded-lg hover:shadow-2xl transition-all ',className)}>
     {children}
    </div>
  )
}