import './globals.css';
import { Raleway } from 'next/font/google';

import ToasterProvider from './providers/ToasterProvider';
import Navbar from './components/navbar';
import RegisterModal from './components/modals/registerModal';
import LoginModal from './components/modals/loginModal';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'AIRBNB',
  description: 'Airbnb clone',
};

const font = Raleway({
  subsets: ['latin'],
  weight: '400',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
