
"use client"
import { signIn } from "next-auth/react"
 
export default function AuthButton() {
  return <button onClick={() => signIn("google",{ callbackUrl: '/' })}>google</button>
}
