import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rongwei",
  description: "Dev For Fun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            {children}
          </main>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-5K7T3SZ06Z" />
      </body>
    </html>
  );
}
