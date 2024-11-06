'use client'
import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import { MainPropertiesType, useBloksList } from '@/app/store/store'

interface textTProps {
 className?:string
  data:MainPropertiesType
}

export const TextT: FC<textTProps> = ({ className,data}) => {
  
  const setActive = useBloksList(state=>state.setActive)
    const props = data.props
    const style = props.map((o)=>{
        if(o.type === "object"){
            var st = o.values.map((v)=>{
                return ` ${v[2]}-[${v[1]}${o.unit || ""}]`
            })
        return st.join(" ")
        }
    }).join(" ")
  return (
    <div onClick={()=>{setActive(data.elementId)}} className={cn('absolute '+style,className)}>
     {data.value}
     {style}
    </div>
  )
}