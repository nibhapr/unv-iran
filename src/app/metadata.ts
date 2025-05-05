const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://unv-iran.com';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Uniview Security Solutions | یونی‌ویو سیستم‌های امنیتی",
    template: "%s | یونی‌ویو سیستم‌های امنیتی"
  },
  description: {
    default: "Advanced security solutions and surveillance systems | راهکارهای پیشرفته امنیتی و سیستم‌های نظارتی",
  },
  icons: {
    icon: '/logo.svg',
  },
}; 