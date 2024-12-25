import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
                <p className="mb-4">This is the home page.</p>
                <Link href="/auth" className="text-blue-500 hover:underline">
                    Go to Auth Page
                </Link>
            </div>
        </div>
    )
}

