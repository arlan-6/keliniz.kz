import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Dashboard } from '@/components/shared/Dashboard'

interface pageProps {
  className?: string
}

const Page: FC<pageProps> = ({ className }) => {
  return (
    <div className={cn('w-full', className)}>
      <Dashboard />
    </div>
  )
}

export default Page