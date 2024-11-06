import React, { FC } from 'react'
import { cn } from '@/lib/utils'
import Highlight from './highlight'
import { TextT } from '../template/textT'
import { TextTemplate } from '@/app/store/template'
import { MainPropertiesType } from '@/app/store/store'

interface SideBlockProps {
 className?:string
  height?:number
  width?:number
  list:MainPropertiesType[]
  active:number
}

export const SideBlock: FC<SideBlockProps> = ({ className, height=800 ,width=300,list,active}) => {

    const props = TextTemplate.props
    const style = props.map((o)=>{
        if(o.type === "object"){
            var st = o.values.map((v)=>{
                return ` ${v[2]}-[${v[1]}${o.unit || ""}]`
            })
        return st.join(" ")
        }
    }).join(" ")

  return (
    <div className={cn(`h-[800px] w-[300px] bg-slate-200 absolute`,className)}>
        {list.map(e=>{
const props = e.props
const style = props.map((o)=>{
    if(o.type === "object"){
        var st = o.values.map((v)=>{
            return ` ${v[2]}-[${v[1]}${o.unit || ""}]`
        })
    return st.join(" ")
    }
}).join(" ")
            return e.elementId===active?<Highlight posMain={e.props[0]} sizeMain={e.props[2]} enableResize={"Enable"} bounds='parent'><TextT key={e.elementId} className={style+'absolute'} data={e}/></Highlight>
                    :<TextT key={e.elementId} className={style+'absolute'} data={e}/>
        })}
     {/* <TextT className={style+'absolute'} data={TextTemplate}/> */}
     
     
     
     {/* <Highlight enableResize={"Enable"} bounds='parent'><p>asdasd</p></Highlight> */}
    </div>
  )
}