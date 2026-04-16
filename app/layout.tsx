import type { Metadata } from "next";
import "./globals.css";
import { dmSansFont, bricolageFont } from "./fonts";

export const metadata: Metadata = {
  title: "Weather Now",
  description:
    "weather app with search functionality, unit conversion, and detailed forecasts using the Open-Meteo API.",
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
      <body>{children}</body>
    </html>
  );
}
