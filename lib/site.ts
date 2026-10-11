// Facts about the company and the site that metadata, structured data and
// the sitemap share. The live site answers on the www host.
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wavemetrik.com",
  name: "Wavemetrik",
  legalName: "Wavemetrik Technologies Pvt. Ltd.",
  tagline: "Precision at every frequency.",
  description:
    "Wavemetrik builds Wi-Fi test and measurement systems: real-radio Wi-Fi 7 client emulators, interference generators and shielded RF test environments.",
  email: "sales@wavemetrik.com",
  supportEmail: "support@wavemetrik.com",
  phone: "+917899669501",
  address: {
    street: "Northstar, Galleria Ambedkar Colony, Yelahanka",
    city: "Bangalore",
    region: "Karnataka",
    postalCode: "560064",
    country: "IN",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, SITE.url).toString();
