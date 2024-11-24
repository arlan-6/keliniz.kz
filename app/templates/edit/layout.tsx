import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  
    return (
      <div>
        <main>{children}</main>
      </div>
    );
  
};

export default Layout;
