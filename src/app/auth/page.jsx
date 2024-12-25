'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Shield, Github, ComputerIcon as Microsoft } from 'lucide-react'

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-6 bg-white">
                <CardHeader className="space-y-4">
                    <div className="flex justify-center">
                        <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="h-4 w-3/4 mx-auto bg-gray-200 rounded" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                        >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                        >
                            <img src="/google.svg" alt="Google" className="h-5 w-5 mr-2" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signIn("github", { callbackUrl: "/" })}
                        >
                            <Github className="h-5 w-5 mr-2" />
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
                        >
                            <Microsoft className="h-5 w-5 mr-2" />
                            Microsoft
                        </Button>
                    </div>

                    <div className="text-center text-sm">
                        <button
                            type="button"
                            className="text-blue-600 hover:underline"
                            onClick={() => setIsSignUp(!isSignUp)}
                        >
                            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
