export type PhysicalProductTemplateFields = {
  fields: {
    id: string;
    label: string;
    type: string;
    value?: string;
    fields?: {
      id: string;
      label: string;
      type: string;
    }[];
    values?: {
      [key: string]: string;
    }[];
  }[];
};

export type PhysicalProductTemplateData = {
  metaTitle: string;
  tagline: string;
  headline: string;
  heroText: string;
  heroButtonText: string;
  heroImage: string;
  heroAlt: string;
  featuresSectionTitle: string;
  featuresSectionText: string;
  featureTitle1: string;
  featureDescription1: string;
  featureImgUrl1: string;
  featureTitle2: string;
  featureDescription2: string;
  featureImgUrl2: string;
  featureTitle3: string;
  featureDescription3: string;
  featureImgUrl3: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonText: string;
  price: string;
  ctaImage: string;
};

export interface Session {
  id: number;
  page: string;
  device: string;
  ip_address: string;
  time_spent: string | null;
  visit_time: string;
  country: string;
  http_referer: string;
  created_at: string;
  landing_page_id: number;
  user_id: string;
  end_time: string | null;
}
