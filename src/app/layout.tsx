import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

import { LFallback, LSession } from "@/components/lp";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <LSession>
          <Suspense fallback={<LFallback />}>
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
        </LSession>
      </body>
    </html>
  );
}
