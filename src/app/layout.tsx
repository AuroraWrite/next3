import type { Metadata } from 'next'
import Header from '../components/header/page'
import Footer from '../components/footer/page'
import './globals.css'

export const metadata: Metadata = {
  title: 'Store',
  description: '商城',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
