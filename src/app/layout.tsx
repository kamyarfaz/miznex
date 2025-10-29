import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/Theme-Provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { rootMetadata } from "@/lib/metadata/rootMetadata";
import { StructuredDataScripts } from "@/lib/metadata/structuredData";
import { IRANYekanX, Peyda } from "@/lib/fonts";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <StructuredDataScripts />
      </head>
      <body className={`${IRANYekanX.variable} ${Peyda.variable} font-sans`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" richColors />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
