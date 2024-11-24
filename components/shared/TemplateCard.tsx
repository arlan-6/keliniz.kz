import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { Template } from '@/app/store/store'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { Heart } from 'lucide-react'




interface TemplateCardProps {
 className?:string
  template:Template
  onOpen:()=>void
  isLiked:boolean
}

export const TemplateCard: FC<TemplateCardProps> = ({ className, template , onOpen,isLiked}) => {
    const {name, description, tags,imageUrl,} = template
    const clickHandler = () => { 
        onOpen()
    }
  return (
    <div onClick={clickHandler} className={cn('max-w-60 shadow-lg p-5 rounded-md hover:shadow-2xl transition-shadow',className)}>
        <Image src={imageUrl} width={300} height={300} alt="template"/>
     <h1 className='text-lg'>{name}</h1>
        <p className='truncate text-sm text-gray-700'>{description}</p>
        <div className='flex gap-2 cursor-default flex-wrap'>
            {tags.map((tag) => (
                // <span className=' bg-slate-500 text-white p-1 px-2 rounded-sm' key={tag}>{tag}</span>
                <Badge key={tag} variant='default' className='mt-2 bg-[#2596be]'>{tag}</Badge>
            ))}
            {isLiked && <Badge variant='default' className='mt-2 bg-[#ff2752]'><Heart size={12} className='mr-1'/> Liked</Badge>}
        </div>
        
    </div>
  )
}