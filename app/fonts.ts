import localFont from "next/font/local";

export const dmSansRegularFont = localFont({
  src: "../public/fonts/DM_Sans/DMSans-9ptRegular.woff2",
  display: "swap",
  variable: "--font-dm-sans-regular",
});

export const dmSansItalicFont = localFont({
  src: "../public/fonts/DM_Sans/DMSans-9ptItalic.woff2",
  display: "swap",
  variable: "--font-dm-sans-italic",
});

export const bricolageFont = localFont({
  src: "../public/fonts/Bricolage_Grotesque/BricolageGrotesque-96ptExtraBold.woff2",
  display: "swap",
  variable: "--font-bricolage",
});
