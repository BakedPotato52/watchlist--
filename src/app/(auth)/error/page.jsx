'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthError() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    return (
        <div className="container flex items-center justify-center min-h-screen py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Authentication Error</CardTitle>
                    <CardDescription>There was a problem signing you in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Error: {error || 'An unknown error occurred'}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

