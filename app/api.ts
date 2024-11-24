'use client'
import useSWR from 'swr';
import { Template } from './store/store';

const fetcher = (url:string) => fetch(url).then((res) => res.json());

export function useLikedTemplates() {
    // @typescript-eslint/no-explicit-any
    const { data, error, mutate }:{data:Template[],error:any,mutate:any} = useSWR(process.env.NEXT_PUBLIC_SERVER_URL+`/templates`, fetcher);
    console.log(data);
    
    return {
        templates: data,
        isLoading: !error && !data,
        isError: error,
        mutate,  // Expose mutate to manually update the cache
    };
}
