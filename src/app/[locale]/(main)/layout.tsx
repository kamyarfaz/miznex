import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Header";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function MainLayout({
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
    <div className="overflow-hidden max-w-[1920px] mx-auto">
      <NextIntlClientProvider>
        <Toaster position="top-right" richColors />
        {/* <Navbar /> */}
        {children}
        <Footer />
        {/* <FloatingContactButton /> */}
      </NextIntlClientProvider>
    </div>
  );
}
