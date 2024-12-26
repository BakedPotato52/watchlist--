import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import { UserProvider } from './context/userContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'YouTube Clone',
  description: 'A simple YouTube clone built with Next.js',
}

export default function RootLayout({
  children
}) {
  return (
    (<html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Header />
          <main className="container mx-auto ">
            {children}
          </main>
        </UserProvider>

      </body>
    </html>)
  );
}

