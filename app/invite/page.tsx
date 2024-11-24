import React, { FC } from 'react'
import { cn } from '@/lib/utils'

interface pageProps {
 className?:string
  
}

const Page: FC<pageProps> = ({ className,  }) => {
  

  return (
    <div className={cn('w-full h-screen flex justify-center items-center',className)}>
        invite page
    </div>
  )
}
export default Page