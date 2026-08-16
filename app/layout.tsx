import type { Metadata, Viewport } from "next";
import "./globals.css";
import { dmSansFont, bricolageFont } from "./fonts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Weather Now — Live Weather, Hourly & 7-Day Forecast",
  description:
    "Search any city and get live conditions, hourly temperatures, and a 7-day forecast. Switch between metric and imperial units with the free Open-Meteo API.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Weather Now",
    title: "Weather Now — Live Weather, Hourly & 7-Day Forecast",
    description:
      "Search any city and get live conditions, hourly temperatures, and a 7-day forecast. Switch between metric and imperial units with the free Open-Meteo API.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Weather Now — live weather, hourly and 7-day forecast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Now — Live Weather, Hourly & 7-Day Forecast",
    description:
      "Search any city and get live conditions, hourly temperatures, and a 7-day forecast.",
    images: ["/images/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a2e",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Weather Now",
      url: siteUrl,
      description:
        "Real-time weather search with current conditions, hourly and 7-day forecasts.",
    },
    {
      "@type": "WebApplication",
      name: "Weather Now",
      url: siteUrl,
      applicationCategory: "WeatherApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSansFont.variable} ${bricolageFont.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
