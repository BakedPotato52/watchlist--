"use client"
import { signUp } from "next-auth/react"

export function SignUp() {
    return <button onClick={() => signUp()}>Sign Out</button>
}