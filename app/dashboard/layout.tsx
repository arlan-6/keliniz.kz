import { Navigation } from '@/components/shared/Navigation';
import { ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  
    return (
      <div>
        <Navigation/>
        <main className='pt-20'>{children}</main>
        <div className="absolute top-8 left-3"><Link href={'/'} className='flex items-center'><ArrowLeft/> Home</Link></div>
      </div>
    );
  
};

export default AuthLayout;
