import localFont from "next/font/local";

export const dmSansFont = localFont({
  src: [
    {
      path: "../public/fonts/DM_Sans/DMSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-dm-sans",
});

export const bricolageFont = localFont({
  src: "../public/fonts/Bricolage_Grotesque/BricolageGrotesque-96ptExtraBold.woff2",
  display: "swap",
  variable: "--font-bricolage",
});
