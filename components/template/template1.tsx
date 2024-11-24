import React, { FC } from 'react'
import { cn } from '@/lib/utils'

interface template1Props {
 className?:string
 status:'edit'|'view'
  data?:{name1:string,
  name2:string,
  date:string,
  address:string,
  }
}

export const Template: FC<template1Props> = ({ className, status ,data}) => {
  return (
    <div className={cn('',className)}>
     Template {status}
     <br />
     
      {data?.name1}
      <br />
      {data?.name2}
      <br />
      {data?.date}
      <br />
      {data?.address}
      
    </div>
  )
}