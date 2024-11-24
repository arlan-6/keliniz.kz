'use client'
import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Contact, HomeIcon, LogIn, SwatchBook, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { NavProfile } from './NavProfile'
import { LanguageSelect } from './Language'
import { useSessionStore } from '@/app/store/store'

interface NavigationProps {
  className?: string
}

export const Navigation: FC<NavigationProps> = ({ className }) => {

  const isAuthenticated = false // Replace with your authentication logic
  const { data: session } = useSession()
  const setSesion = useSessionStore((state) => state.setSession);

  React.useEffect(() => {
    if (session?.user) {
      setSesion(session.expires, session.user);
    }
  }, [session, setSesion]);
  return (
    <div className='w-screen text-white'>
    <nav className="z-50 motion-preset-fade fixed top-3 left-1/2 transform -translate-x-1/2 w-5/6 rounded-sm bg-slate-900 bg-opacity-10 backdrop-blur-lg p-4 shadow-sm border border-white border-opacity-40">
      <ul className="flex justify-around items-center">
        <li className="flex gap-1 text-lg hover:motion-preset-seesaw  cursor-pointer  transition duration-300 ease-in-out">
          Logo <HomeIcon size={24} />
        </li>
        <li className="flex gap-1 text-lg hover:motion-preset-seesaw  cursor-pointer duration-300 ease-in-out">
        <Link className="flex gap-1" href="/">
          Home <HomeIcon size={24} />
        </Link>
        </li>
        <li className="text-lg hover:motion-preset-seesaw  cursor-pointer duration-300 ease-in-out">
        <Link className="flex gap-1" href="/templates">
              Teamplates <SwatchBook size={24} />
            </Link>
        </li>
        <li className="flex gap-1 text-lg hover:motion-preset-seesaw  cursor-pointer duration-300 ease-in-out">
          Contact <Contact size={24} />
        </li>
        <li className="flex gap-5 items-center text-lg   cursor-pointer duration-300 ease-in-out">
          {session ? (
            <span className=' hover:motion-preset-seesaw'>
              <NavProfile /></span>
          ) : (
            <Link className="flex gap-1" href="/auth">
              Login <LogIn size={24} />
            </Link>
          )} <span>    <LanguageSelect /></span> 

        </li>
        
      </ul>
    </nav>
    </div>

  )
}