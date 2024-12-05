import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="absolute top-4 left-4 z-50 text-white text-xl ">
        <Link href='/' className='flex group items-center'>
          <ArrowLeft className='transform transition-transform duration-300 group-hover:-translate-x-2 ' />
          <span className='ml-2 duration-300 group-hover:opacity-100 hover:underline transition-all group-hover:text-gray-200'>Back</span>
        </Link>
      </div>
      <main>{children}</main>
      
    </div>
  );
};

export default AuthLayout;
