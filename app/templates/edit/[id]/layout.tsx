'use client'
import { useInviteEditStore, useSessionStore } from '@/app/store/store';
import { AppSidebar } from '@/components/shared/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { useBeforeunload } from 'react-beforeunload';
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    const session = useSessionStore((s)=>s.user);
    const isChanged = useInviteEditStore((s)=>s.isChanged);
    
    useBeforeunload((e)=>{
      console.log(isChanged);
      
      if(isChanged){
        e.preventDefault();
        return "You have unsaved changes. Are you sure you want to leave?";
    }});

    if (session) {



      return (
        <SidebarProvider 
        style={{
          // @ts-ignore
          "--sidebar-width": "24rem",
          "--sidebar-width-mobile": "20rem",
        }}>
        <AppSidebar />
        <main className='pt-24'>
          <SidebarTrigger className='fixed z-50' />
          {children}
        </main>
        {/* <Toaster /> */}
      </SidebarProvider>
      );
    }
    return(
      <div>
        
        <main className='pt-24'>You are not loged in</main>
        <Link href="/auth">Login</Link>
      </div>
    );
  
};

export default Layout;
