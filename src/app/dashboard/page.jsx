import { Button } from '@/components/ui/button'

export default async function DashboardPage() {

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <form action={signOut}>
                        <Button variant="outline">Sign Out</Button>
                    </form>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Welcome, {user?.name}!</h2>
                    <p className="text-gray-600">This is a protected page that only authenticated users can access.</p>
                </div>
            </div>
        </div>
    )
}

