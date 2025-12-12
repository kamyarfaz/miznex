import { QueryProvider } from "@/components/providers/QueryProviders";
import { Toaster } from "@/components/ui/sonner";
import { countryLocaleDirection } from "@/i18n/localeMap";
import { routing } from "@/i18n/routing";
import { IRANYekanX, Peyda, Poppins } from "@/lib/fonts";
import { rootMetadata } from "@/lib/metadata/rootMetadata";
import { StructuredDataScripts } from "@/lib/metadata/structuredData";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";

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

  const countryEntry = Object.values(countryLocaleDirection).find(
    (item) => item.locale === locale
  );

  const dir = countryEntry?.dir || "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <StructuredDataScripts />
      </head>
      <body className={`${IRANYekanX.variable} ${Peyda.variable} ${dir === "ltr" ? Poppins.variable : ""} font-sans`}>
        <NextIntlClientProvider>
          <QueryProvider>
            {/* <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            > */}
              <Toaster position="top-right" />
              {children}
            {/* </ThemeProvider> */}
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
