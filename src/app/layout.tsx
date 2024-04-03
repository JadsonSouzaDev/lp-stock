import type { Metadata } from "next";
import { Ubuntu as FontSans } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Livraria Paraíba - Seu Mundo de Leitura",
  description: "Livros, e-books, eletrônicos, games e muito mais!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Suspense
          fallback={<div>Carregando essa bixiga da febe do rato...</div>}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
