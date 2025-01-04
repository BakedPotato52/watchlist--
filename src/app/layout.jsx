import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import { AuthProviders } from './context/authProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'YouTube Clone',
  description: 'A simple YouTube clone built with Next.js',
};

export default async function RootLayout({ children }) {

  return (
    <AuthProviders>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="max-w-100 mx-auto dark:text-white">
            {children}
          </main>
        </body>
      </html>
    </AuthProviders>

  );
}
