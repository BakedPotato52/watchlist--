'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"

export default function SignIn() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'

    // Ensure the callback URL is safe and not causing loops
    const safeCallbackUrl = callbackUrl.startsWith('/auth/signin') ? '/' : callbackUrl

    return (
        <div className="container flex items-center justify-center min-h-screen py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Choose your sign in method</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        className="w-full"
                        onClick={() => signIn('github', { callbackUrl: safeCallbackUrl })}
                    >
                        Continue with GitHub
                    </Button>
                    <Button
                        className="w-full"
                        onClick={() => signIn('credentials', { callbackUrl: safeCallbackUrl })}
                    >
                        Continue with Credentials
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

