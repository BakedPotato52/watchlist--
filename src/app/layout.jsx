import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import { getSession } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YouTube Clone',
  description: 'A simple YouTube clone built with Next.js',
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        <main className="container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
