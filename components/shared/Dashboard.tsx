'use client'
import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface DashboardProps {
  className?: string
}

export const Dashboard: FC<DashboardProps> = ({ className }) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    console.log('no session')
    redirect('/auth')
  }

  return (
    <div className={cn('', className)}>
      {session.user.name}
      <br />
      {session.user.email}
      <br />
      {session.user.role}
      <br />
      <br />
      <Link href={'/'}>Home</Link>
    </div>
  )
}