import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import AuthButton from '@/components/shared/AuthButton'
import Link from 'next/link'

interface pageProps {
 className?:string
  
}

const Page: FC<pageProps> = ({ className,  }) => {
  return (
    <div className={cn('w-full h-screen flex justify-center items-center',className)}>
        <main className='bg-slate-300 p-10 rounded-md flex justify-center items-center flex-col'>
            <AuthButton />
            <br />
            <Link href='/'>Back</Link>
        </main>
    </div>
  )
}
export default Page