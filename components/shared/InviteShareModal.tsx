'use client'
import React, { FC, useEffect, useState } from 'react'
import { Copy, Share } from "lucide-react"
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePublishInvite } from '@/lib/publishInvite'
import Link from 'next/link';

interface InviteShareModalProps {
  className?: string
  inviteId: string
}

export const InviteShareModal: FC<InviteShareModalProps> = ({ className, inviteId }) => {
  const { data, pending, error, publishInvite } = usePublishInvite();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [link, setLink] = useState('');
  const [dialogStatus, setDialogStatus] = useState<'confirm' | 'pending' | 'error' | 'success'>('confirm');

  const handleShareClick = () => {
    setDialogStatus('confirm');
    setIsDialogOpen(true);
  };

  useEffect(() => {
    if (pending) {
      setDialogStatus('pending');
    }
  }, [pending]);

  useEffect(() => {
    if (error) {
      
      setDialogStatus('error');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      
      setLink(`${process.env.NEXT_PUBLIC_CLIENT_URL}/invite/${data.id}`);
      setDialogStatus('success');
    }
  }, [data]);

  const handleConfirmShare = () => {
    publishInvite(inviteId);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleShareClick} className="flex gap-1">
          Share <Share size={16} />
        </Button>
      </DialogTrigger>

      {dialogStatus === 'confirm' && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              You can only share this invite once. Are you sure you want to proceed?
              Dont forget to save your changes before sharing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirmShare}>Share</Button>
          </DialogFooter>
        </DialogContent>
      )}

      {dialogStatus !== 'confirm' && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogStatus === 'pending' && 'Pending'}
              {dialogStatus === 'error' && 'Error'}
              {dialogStatus === 'success' && 'Share link'}
            </DialogTitle>
            <DialogDescription>
              
              {dialogStatus === 'pending' && 'Publishing invite, please wait...'}
                {dialogStatus === 'error' && (
                <div>
                  This invite has already been shared.<br />
                  You can only share it once.<br />
                  Shared invites cannot be edited.<br />
                  <Link href="/dashboard" passHref className='underline'>
                   
                  <strong>Visit your profile to find the shared invite link.</strong></Link>
                </div>
                )}
              {dialogStatus === 'success' && 'Anyone who has this link will be able to view this.'}
              
            </DialogDescription>
          </DialogHeader>
          {dialogStatus === 'success' && (
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">Link</Label>
                <Input id="link" defaultValue={link} readOnly />
              </div>
              <Button type="button" size="sm" className="px-3" onClick={() => navigator.clipboard.writeText(link)}>
                <span className="sr-only">Copy</span>
                <Copy size={16} />
              </Button>
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}