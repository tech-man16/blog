import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Blogg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
