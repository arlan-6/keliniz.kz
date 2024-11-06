import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Badge } from '../ui/badge'
import { Info } from 'lucide-react'

interface infoBageProps {
 className?:string,
  text?:string
}

export const InfoBage: FC<infoBageProps> = ({ className, text }) => {
  return (
    <HoverCard >
        <HoverCardTrigger asChild>
            {/* <Badge className='m-1 px-[1.75px] '> */}
                <Info size={15} className='px-[0.75px]'/>
            {/* </Badge> */}
        </HoverCardTrigger>
        <HoverCardContent className='text-sm max-w-40'>
            {text}
        </HoverCardContent>
    </HoverCard>
  )
}