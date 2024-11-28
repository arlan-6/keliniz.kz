import React, { FC } from 'react'
import { cn } from '@/lib/utils'

interface UserEditedTemplateCardProps {
 className?:string
 template:any
}

export const UserEditedTemplateCard: FC<UserEditedTemplateCardProps> = ({ className, template }) => {
  return (
    <div className={cn('p-3',className)}>
        {/* <h1>{template.templateId}</h1>
        <h1>{template.inviteId}</h1> */}
        <h1 className='font-bold text-lg'>{template.inviteName}</h1>
    </div>
  )
}