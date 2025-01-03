'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleSignUp } from "../../actions/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const username = formData.get('username')
        const email = formData.get('email')
        const password = formData.get('password')

        try {
            const result = await handleSignUp(username, email, password)

            if (result.error) {
                setError(result.error)
            } else {
                router.push('/signin') // Redirect to sign in page after successful signup
            }
        } catch (error) {
            console.error('Sign up error:', error)
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
                        <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
                        <CardDescription className="text-center">
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <motion.form
                            onSubmit={onSubmit}
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 text-sm text-red-600 bg-red-100 border border-red-600 rounded"
                                >
                                    {error}
                                </motion.div>
                            )}
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
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    type="email"
                                    autoCapitalize="none"
                                    autoCorrect="off"
                                    disabled={isLoading}
                                    required
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
                                    required
                                />
                            </div>
                            <Button
                                className="w-full"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </Button>
                        </motion.form>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking sign up, you agree to our{" "}
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

