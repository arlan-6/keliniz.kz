import { cn } from '@/lib/utils'
import React, { FC } from 'react'

interface TittleProps {
 className?:string,
  text:string
}

export const Tittle: FC<TittleProps> = ({ className, text }) => {
  return (
    <div className={cn('text-3xl m-5',className)}>
        {text}
    </div>
  )
}