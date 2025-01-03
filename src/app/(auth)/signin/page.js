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
import Link from 'next/link'
import { motion } from 'framer-motion'

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-md overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500"
                    />
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                        <CardDescription className="text-center">
                            Sign in to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 text-sm text-red-600 bg-red-100 border border-red-600 rounded"
                            >
                                {error}
                            </motion.div>
                        )}
                        {Object.values(providerMap).map((provider) => (
                            <motion.form
                                key={provider.id}
                                onSubmit={(e) => onSubmit(e, provider.id)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
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
                            </motion.form>
                        ))}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/signup">Create an account</Link>
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}


