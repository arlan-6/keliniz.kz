'use client';
import React, { FC, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useGetPublishedInvite } from '@/lib/getPublishedInvite';
import Head from 'next/head';

interface PageProps {
  className?: string;
}

const Page: FC<PageProps> = ({ className }) => {
  const params = useParams();
  const inviteId = params.invite; 

  const { data, pending, error } = useGetPublishedInvite(inviteId as string);

    // Use useEffect to set the document title to inviteName
    useEffect(() => {
      if (data?.inviteName) {
        document.title = data.inviteName;
      }
    }, [data?.inviteName]);

  if (pending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No invite found.</div>;
  interface InviteDetails {
    name1: string;
    name2: string;
    date: string;
    time: string;
    location: {
      lat: number;
      lng: number;
    };
  }
  interface TemplateProps {
    className?: string;
    inviteDetails: InviteDetails;
    inviteId?: string;
    }
  // Dynamically import the template component based on the templateId
  const Template = dynamic<TemplateProps>(() => import(`@/components/template/${data.templateId}`), {
    loading: () => <div>Loading template...</div>,
    ssr: false,
  });
  
  return (
    <div className="">      
    <div className={cn('w-full ', className)}>
      <Template inviteDetails= {data.inviteDetails}/>
    </div>
    </div>
  );
};

export default Page;