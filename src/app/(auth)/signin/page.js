'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { providerMap } from "@/app/api/auth/[...nextauth]/providers"
import { handleSignIn } from "../../actions/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Github } from 'lucide-react'

export default function SignInPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const onSubmit = async (e, providerId) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(e.currentTarget)
            let result

            if (providerId === "credentials") {
                result = await handleSignIn(providerId, {
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            } else {
                result = await handleSignIn(providerId)
            }

            if (result?.error) {
                setError(result.error)
            } else {
                router.push('/') // Redirect to home page or dashboard
            }
        } catch (error) {
            console.error('Sign in error:', error)
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                    <CardDescription className="text-center">
                        Choose your preferred sign in method
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-600 rounded">
                            {error}
                        </div>
                    )}
                    {Object.values(providerMap).map((provider) => (
                        <form key={provider.id} onSubmit={(e) => onSubmit(e, provider.id)}>
                            {provider.id === "credentials" ? (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            name="username"
                                            placeholder="Enter your username"
                                            type="text"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </>
                            ) : null}
                            <Button
                                className="w-full mt-4"
                                type="submit"
                                disabled={isLoading}
                            >
                                {provider.id === "github" && <Github className="w-4 h-4 mr-2" />}
                                Sign in with {provider.name}
                            </Button>
                        </form>
                    ))}
                </CardContent>
                <CardFooter>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <a
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

