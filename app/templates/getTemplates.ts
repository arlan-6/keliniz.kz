'use client';
import { Template, useTemplateStore } from "../store/store"


export const setToStore=(templates:Template[])=>{
    const addList = useTemplateStore((state) => state.addList);
    addList(templates)}