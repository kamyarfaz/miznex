export interface Resource {
  text: string;
}

export interface QuickLink {
  href: string;
  text: string;
}

export interface ContactInfo {
  icon: any;
  text: string;
}

export interface FooterData {
  resources: Resource[];
  quickLinks: QuickLink[];
  contactInfo: ContactInfo[];
}

export interface FooterMetadata {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    locale: string;
  };
}

export interface FooterProps {
  data?: FooterData;
  metadata?: FooterMetadata;
}

// Props

export interface ResourcesProps {
  resources: Resource[];
}

export interface QuickLinksProps {
  quickLinks: QuickLink[];
}

export interface ContactInfoProps {
  contactInfo: ContactInfo[];
}
