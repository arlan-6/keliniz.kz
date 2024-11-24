import React, { FC } from 'react'
import { cn } from '@/lib/utils'

interface notFoundProps {
 className?:string
  
}

const NotFound: FC<notFoundProps> = ({ className,  }) => {
  return (
    <div className={cn('',className)}>
     not-found
    </div>
  )
}
export default NotFound