import './globals.css';
import { Raleway } from 'next/font/google';

import Navbar from './components/navbar';
import RegisterModal from './components/modals/registerModal';
import ToasterProvider from './providers/ToasterProvider';

export const metadata = {
  title: 'AIRBNB',
  description: 'Airbnb clone',
};

const font = Raleway({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal isOpen actionLabel='Submit' title='Login Modal' />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
