'use client'
import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

interface AccouncNameProps {
 className?:string
  
}

export const AccouncName: FC<AccouncNameProps> = ({ className,  }) => {
    const { data: session } = useSession()
  return (
    <div className={cn('flex gap-2',className)}>
        <Image className='rounded-sm'  width={20} height={20} alt='avatar' src={session?.user?.image ?? '/default-avatar.png'}/> {session?.user?.name ?? 'Guest'}
    </div>
  )
}