/**
 * Centralized brand and site configuration.
 * Update these values to rebrand the entire site.
 */
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Harbor Rental Group",
  tagline: "Modern rental homes, professionally managed.",
  description:
    `Browse available rental listings and find your next home with ${process.env.NEXT_PUBLIC_COMPANY_NAME || "Harbor Rental Group"}. Professional property management with a modern touch.`,
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@harborrentalgroup.com",
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "(555) 234-5678",
    address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "123 Harbor Drive, Suite 200",
    city: process.env.NEXT_PUBLIC_COMPANY_CITY || "Coastal City",
    state: process.env.NEXT_PUBLIC_COMPANY_STATE || "CA",
    zip: process.env.NEXT_PUBLIC_COMPANY_ZIP || "90210",
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
  managerEmail:
    process.env.PROPERTY_MANAGER_EMAIL || "manager@harborrentalgroup.com",
} as const;
