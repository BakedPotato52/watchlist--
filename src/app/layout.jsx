import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import AuthProviders from './context/authProvider';
import { getServerSession } from 'next-auth';
import options from '../app/api/auth/[...nextauth]/auth';
import SessionProvider from './context/sessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YouTube Clone',
  description: 'A simple YouTube clone built with Next.js',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(options);

  return (

    <AuthProviders>
      <SessionProvider session={session}>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            <main className="max-w-100 mx-auto dark:text-white">
              {children}
            </main>
          </body>
        </html>
      </SessionProvider>
    </AuthProviders>

  );
}
