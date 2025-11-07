import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/context/Theme-Provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/QueryProviders";
import { rootMetadata } from "@/lib/metadata/rootMetadata";
import { StructuredDataScripts } from "@/lib/metadata/structuredData";
import { IRANYekanX, Peyda } from "@/lib/fonts";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const metadata: Metadata = rootMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir="rtl" suppressHydrationWarning>
      <head>
        <StructuredDataScripts />
      </head>
      <body className={`${IRANYekanX.variable} ${Peyda.variable} font-sans`}>
        <NextIntlClientProvider>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
