import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Copy } from "lucide-react"
 
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
 
interface InviteShareModalProps {
 className?:string
  inviteId:string
}

export const InviteShareModal: FC<InviteShareModalProps> = ({ className, inviteId }) => {
    const { data, pending, error, publishInvite } = usePublishInvite();


// publishInvite(inviteId);
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button onClick={()=>publishInvite(inviteId)} variant="outline">Share</Button>
    </DialogTrigger>
    {pending && <PublishPending />}
    {error && <PublishError />}
    {data && <PublishSucsess data={data}/>}
  </Dialog>
  )
}
const PublishSucsess = (data:any) => {
    console.log(data);
    
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy size={16}/>
        </Button>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

const PublishError = () => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Error</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            defaultValue="https://ui.shadcn.com/docs/installation"
            readOnly
          />
        </div>
        <Button type="submit" size="sm" className="px-3">
          <span className="sr-only">Copy</span>
          <Copy size={16}/>
        </Button>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
const PublishPending = () => {
    return (
        <DialogContent className="sm:max-w-md">
        <DialogHeader>
            <DialogTitle>Pending</DialogTitle>
            <DialogDescription>
            Anyone who has this link will be able to view this.
            </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
                Link
            </Label>
            <Input
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
            />
            </div>
            <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Copy size={16}/>
            </Button>
        </div>
        <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
            <Button type="button" variant="secondary">
                Close
            </Button>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
    )
    }