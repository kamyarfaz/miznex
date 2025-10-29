import { ConfirmModal } from "@/components/shared/ConfirmModal";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Header";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden max-w-[1920px] mx-auto">
      <Toaster position="top-right" richColors />
      <Navbar />
      <ConfirmModal />
      {children}
      <Footer />
      {/* <FloatingContactButton /> */}
    </div>
  );
}
