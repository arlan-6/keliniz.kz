import { Navigation } from '@/components/shared/Navigation';
import { TemplateModal } from '@/components/shared/TemplateModal';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  
    return (
      <div>
        <Navigation />
        <main>{children}</main>
        <TemplateModal />
      </div>
    );
  
};

export default Layout;
