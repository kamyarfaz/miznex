import { Metadata } from "next";
import { generatePageMetadata } from "./rootMetadata";
import { useTranslations } from "next-intl";

export const aboutUsMetadata = async (): Promise<Metadata> => {
  const t = useTranslations("navbar");
  return generatePageMetadata({
    title: t("miznex"),
    description:
      "میزنکس",
    path: "/about-us",
    images: [
      {
        url: "./../../assets/Gallery/Gallery1.avif",
        width: 1200,
        height: 630,
        alt: "درباره میزنکس",
      },
    ],
  });
};
