import Script from "next/script";
import MailSVG from "@/assets/svg/MailSVG";
import PhoneSVG from "@/assets/svg/PhoneSVG";
import Resources from "../../main/Footer/Resources";
import QuickLinks from "../../main/Footer/QuickLinks";
import ContactInfo from "../../main/Footer/ContactInfo";
import FooterBottom from "../../main/Footer/FooterBottom";
import { footerStructuredData } from "@/lib/metadata/footer";
import Description from "@/components/main/Footer/Description";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");

  const footerData = {
    quickLinks: [
      { href: "/", text: t("aboutUs") },
      { href: "/", text: t("howItWorks") },
      { href: "/", text: t("features") },
      { href: "/", text: t("portfolio") },
    ],

    resources: [
      { text: t("blog") },
      { text: t("support") },
      { text: t("documentation") },
      { text: t("frequentlyAskedQuestions") },
    ],

    contactInfo: [
      { icon: <PhoneSVG />, text: t("phone") },
      { icon: <MailSVG />, text: "info@miznex.com" },
    ],
  };

  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden border-t border-bo-primary"
    >
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(footerStructuredData),
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 pt-12 pb-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 max-lg:gap-6 pb-3 items-start">
          <QuickLinks quickLinks={footerData?.quickLinks} />
          <Resources resources={footerData?.resources} />
          <ContactInfo contactInfo={footerData?.contactInfo} />
          <Description />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
